const { readDirAsync, writeFileAsync } = require('./utils');

const cwd = process.cwd();

const template = `<h1 align="center">🪝 Hooky 🪝</h1>

<p align="center">
  <a aria-label="License" href="https://github.com/devjmetivier/hooky/issues?q=is%3Aissue+is%3Aopen+">
    <img src="https://img.shields.io/github/issues-raw/devjmetivier/hooky" />
  </a>
  <a aria-label="License" href="https://github.com/devjmetivier/hooky/pulls?q=is%3Apr+is%3Aopen+">
    <img src="https://img.shields.io/github/issues-pr-raw/devjmetivier/hooky" />
  </a>
  <a aria-label="License" href="https://github.com/devjmetivier/hooky/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/devjmetivier/hooky" />
  </a>
<p>

A collection of react hooks.

It features:

- TypeScript support
- Testing
- Server rendering compatibility

...and hooks 😎

## Packages

See [packages](packages) for individual package details.

| Package | Version | Description |
| ------- | ------- | ----------- |`;

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

  await writeFileAsync('README.md', `${template}\n${packages}\n`);
}

run();
