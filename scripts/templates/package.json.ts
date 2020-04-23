import { ICliArgs } from '../newPackage';

export default ({ packageDir, keywords, description }: ICliArgs) => `{
  "name": "@hooky/${packageDir}",
  "description": "${description}",
  "version": "0.0.1",
  "license": "MIT",
  "author": "Devin Metivier @devjmetivier",
  "homepage": "https://github.com/devjmetivier/hooky/tree/master/packages/${packageDir}#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/devjmetivier/hooky.git"
  },
  "bugs": {
    "url": "https://github.com/devjmetivier/hooky/issues"
  },
  "keywords": [
${keywords.map((keyword) => `    "${keyword}"`).join(',\n')}
  ],
  "main": "cjs/index.js",
  "module": "esm/index.js",
  "types": "types/index.d.ts",
  "files": [
    "cjs",
    "esm",
    "typings"
  ],
  "scripts": {
    "prepublishOnly": "yarn build",
    "prebuild": "rm -rf esm/ && rm -rf cjs/ && rm -rf types/ && rm -rf dist/",
    "build": "yarn build:esm && yarn build:cjs && yarn build:types",
    "build:cjs": "ncc build src/index.ts -o cjs -m -e react",
    "build:esm": "tsc --target ESNext --module ES6 --outDir esm",
    "build:types": "tsc --d --declarationMap --declarationDir types"
  },
  "peerDependencies": {
    "react": ">=16.8"
  }
}
`;
