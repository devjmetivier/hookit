import fs from 'fs';
import { promisify } from 'util';

import chalk from 'chalk';

export const readDirAsync = promisify(fs.readdir);
export const writeFileAsync = promisify(fs.writeFile);

const header = (title: string) => {
  console.clear();

  console.log(`🪝 ${chalk.bold('hookit')} ${title ? `${chalk.dim('>')} ${title}` : ''}\n`);
};

interface CreateScript {
  name: string;
  task: any;
}

export const createScript = ({ name, task }: CreateScript) => ({
  name,
  run: async () => {
    header(name);

    await task();
  },
});
