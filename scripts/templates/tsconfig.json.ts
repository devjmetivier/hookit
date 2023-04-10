export default () => `{
  "compilerOptions": {
    "outDir": "./dist",
    "moduleResolution": "node"
  },
  "extends": "@hookit/tsconfig/base.json",
  "include": ["src/**/*.ts", "src/**/*.tsx"],
"exclude": ["node_modules", "**/*.test.ts", "**/*.test.tsx"]
}
`;
