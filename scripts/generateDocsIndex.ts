/* eslint-disable @typescript-eslint/no-var-requires */
import { readDirAsync, writeFileAsync } from './utils';

const cwd = process.cwd();

const globalTemplate = `<h1 align="center">🪝 hookit 🪝</h1>

<p align="center">
  <a aria-label="License" href="https://github.com/devjmetivier/hookit/issues?q=is%3Aissue+is%3Aopen+">
    <img style={{display: 'inline'}} src="https://img.shields.io/github/issues-raw/devjmetivier/hookit" />
  </a>

  <a aria-label="License" href="https://github.com/devjmetivier/hookit/pulls?q=is%3Apr+is%3Aopen+">
    <img style={{display: 'inline'}} src="https://img.shields.io/github/issues-pr-raw/devjmetivier/hookit" />
  </a>
  
  <a aria-label="License" href="https://github.com/devjmetivier/hookit/blob/master/LICENSE">
    <img style={{display: 'inline'}} src="https://img.shields.io/github/license/devjmetivier/hookit" />
  </a>
</p>

A collection of useful react hooks.

Features:

- TypeScript support
- Fully tested
- SSR compatibility

<br />

| Package | Version | Description |
| ------- | ------- | ----------- |`;

async function run() {
  const packageNames = await readDirAsync('./packages', {
    withFileTypes: true,
  });

  const packages = packageNames
    .filter((item) => item.isDirectory())
    .map((item) => {
      const pkg = require(`${cwd}/packages/${item.name}/package.json`);
      const npmBadge = `![${pkg.name} npm badge](https://img.shields.io/npm/v/${pkg.name})`;

      return `| [${pkg.name}](packages/${item.name}) | ${npmBadge} | ${pkg.description} |`;
    })
    .join('\n');

  await writeFileAsync('apps/docs/pages/index.mdx', `${globalTemplate}\n${packages}\n`);
}

run();
