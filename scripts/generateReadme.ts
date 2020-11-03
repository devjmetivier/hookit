import { readDirAsync, writeFileAsync } from './utils';

const cwd = process.cwd();

const globalTemplate = `<h1 align="center">🪝 hookit 🪝</h1>

<p align="center">
  <a aria-label="License" href="https://github.com/devjmetivier/hookit/issues?q=is%3Aissue+is%3Aopen+">
    <img src="https://img.shields.io/github/issues-raw/devjmetivier/hookit" />
  </a>

  <a aria-label="License" href="https://github.com/devjmetivier/hookit/pulls?q=is%3Apr+is%3Aopen+">
    <img src="https://img.shields.io/github/issues-pr-raw/devjmetivier/hookit" />
  </a>
  
  <a aria-label="License" href="https://github.com/devjmetivier/hookit/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/devjmetivier/hookit" />
  </a>
<p>

A collection of useful react hooks.

Features:

- TypeScript support
- Fully tested
- Server render compatibility

## Packages

See [packages](packages) for individual package details.

| Package | Version | Description |
| ------- | ------- | ----------- |`;

const packageTemplate = `
### Documentation

Please have a look at the documentation on [Storybook](https://hookit-storybook.vercel.app/)
`;

async function run() {
  const packageNames = await readDirAsync('./packages', {
    withFileTypes: true,
  });

  const packages = packageNames
    .filter((item: any) => item.isDirectory())
    .map((item: any) => {
      const pkg = require(`${cwd}/packages/${item.name}/package.json`);
      const npmBadge = `![${pkg.name} npm badge](https://img.shields.io/npm/v/${pkg.name})`;

      return `| [${pkg.name}](packages/${item.name}) | ${npmBadge} | ${pkg.description} |`;
    })
    .join('\n');

  await writeFileAsync('README.md', `${globalTemplate}\n${packages}\n`);

  packageNames.forEach(async (item) => {
    const pkg = require(`${cwd}/packages/${item.name}/package.json`);

    await writeFileAsync(`packages/${item.name}/README.md`, `# ${pkg.name}\n${packageTemplate}`);
  });
}

run();
