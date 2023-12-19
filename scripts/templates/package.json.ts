import { CliArgs } from '../newPackage';

export default ({ packageDir, keywords, description }: CliArgs) => `{
  "name": "@hookit/${packageDir}",
  "description": "${description}",
  "version": "0.0.0",
  "license": "MIT",
  "author": "Devin Metivier @devjmetivier",
  "homepage": "https://github.com/devjmetivier/hookit/tree/master/packages/${packageDir}#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/devjmetivier/hookit.git"
  },
  "bugs": {
    "url": "https://github.com/devjmetivier/hookit/issues"
  },
  "keywords": [
${keywords.map((keyword) => `    "${keyword}"`).join(',\n')}
  ],
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "scripts": {
    "build:cjs": "ncc build src/index.ts -o cjs -m -e react",
    "build:esm": "tsc --target ESNext --module ES6 --outDir esm",
    "build:types": "tsc --d --declarationMap --declarationDir types",
    "build": "tsup src/index.ts --format esm,cjs --dts --minify",
    "clean": "rm -rf node_modules && rm -rf .turbo && rm -rf dist/",
    "dev": "tsup src/index.ts --format esm,cjs --sourcemap --minify --watch",
    "echo:package": "echo \"Building @hookit/${packageDir}...\"",
    "prebuild": "pnpm clean",
    "prepublishOnly": "pnpm build"
  },
  "peerDependencies": {
    "react": ">=16.8"
  }
}
`;
