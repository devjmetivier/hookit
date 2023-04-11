/* eslint-disable no-useless-escape */
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
    "prepublishOnly": "pnpm build",
    "clean": "rm -rf node_modules && rm -rf .turbo && rm -rf dist/",
    "lint": "eslint . --ext .js,.ts,.jsx,.tsx",
    "lint:fix": "eslint . --ext .js,.ts,.jsx,.tsx --fix",,
    "prebuild": "pnpm clean",
    "echo:package": "echo \"Building @hookit/${packageDir}...\"",
    "build": "tsup src/index.ts --format esm,cjs --dts --minify",
    "dev": "tsup src/index.ts --format esm,cjs --sourcemap --minify --watch",
    
    "build:cjs": "ncc build src/index.ts -o cjs -m -e react",
    "build:esm": "tsc --target ESNext --module ES6 --outDir esm",
    "build:types": "tsc --d --declarationMap --declarationDir types"
  },
  "peerDependencies": {
    "react": ">=16.8"
  }
}
`;
