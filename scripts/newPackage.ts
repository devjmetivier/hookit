import fs from 'fs';

import { prompt } from 'inquirer';
import Listr from 'listr';

import { createScript, readDirAsync, writeFileAsync } from './utils';

export interface ICliArgs {
  packageDir: string;
  hookName: string;
  keywords: string[];
  description: string;
}

const script = createScript({
  name: 'Create new package',
  task: async () => {
    const packagesDir = './packages';
    const storiesDir = './stories';
    const validatePackageName = /^[a-z-?]+$/g;
    const validateHookName = /^[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?/g;

    const existingPackages = await readDirAsync(packagesDir, {
      withFileTypes: true,
    });
    const existingPackageNames = existingPackages.filter((item) => item.isDirectory()).map(({ name }) => name);

    const { packageDir, description, keywords, hookName } = await prompt<ICliArgs>([
      {
        name: 'packageDir',
        message: 'What should the package directory be called?',
        validate: (value) => {
          if (existingPackageNames.includes(value)) {
            return `Package '${value}' already exists, try another name.`;
          }

          if (!validatePackageName.test(value)) {
            return 'Should not contain spaces or special characters';
          }

          return true;
        },
      },
      {
        name: 'hookName',
        message: 'What should the hook be called?',
        validate: (value) => {
          if (!validateHookName.test(value)) {
            return 'Hook name should be camelcase.';
          }

          return true;
        },
      },
      {
        name: 'description',
        message: 'Describe the package',
        validate: (value) => !!value,
      },
      {
        name: 'keywords',
        message: 'Provide a comma separated list of keywords',
        validate: (value) => !!value,
        filter: (value) =>
          value
            .split(',')
            .map((item: string) => item.trim())
            .filter((item: string) => !!item),
      },
    ]);

    const packagePath = `${packagesDir}/${packageDir}`;
    const storyPath = `${storiesDir}/${hookName}`;
    const packageSrcPath = `${packagesDir}/${packageDir}/src`;
    const nonSrc = ['package', 'tsconfig', 'README'];

    const tasks = new Listr([
      {
        title: 'Creating directories',
        task: () => {
          fs.mkdirSync(packageSrcPath, { recursive: true });
          fs.mkdirSync(storyPath, { recursive: true });
        },
      },
      {
        title: 'Creating files',
        task: async () => {
          const templateDir = await readDirAsync(`${__dirname}/templates`, {
            withFileTypes: true,
          });

          const templateTasks = await Promise.all(
            templateDir
              .filter((item) => item.isFile())
              .map(async ({ name }) => {
                const isSrcFile = !nonSrc.some((x) => name.includes(x));

                const fileName = name.replace(/.ts$/, '');
                const filePath = isSrcFile ? `src/${fileName}` : fileName;

                const content = await import(`${__dirname}/templates/${name}`)
                  .then((fn: { default: (args: ICliArgs) => void }) =>
                    fn.default({
                      packageDir,
                      description,
                      keywords,
                      hookName,
                    }),
                  )
                  .then((content) => ({
                    title: filePath,
                    task: () => {
                      if (fileName.includes('stories') && fileName.includes('mdx')) {
                        return writeFileAsync(`${storyPath}/${hookName}.stories.mdx`, content);
                      }
                      if (fileName.includes('stories')) {
                        return writeFileAsync(`${storyPath}/${hookName}.stories.tsx`, content);
                      }
                      if (fileName.includes('use')) {
                        return writeFileAsync(`${packagePath}/src/${hookName}.ts`, content);
                      }
                      return writeFileAsync(`${packagePath}/${filePath}`, content);
                    },
                  }));

                return content;
              }),
          );

          return new Listr(templateTasks);
        },
      },
    ]);

    return await tasks.run();
  },
});

export default script.run();
