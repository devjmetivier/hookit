export default () => `{
  "compilerOptions": {
    "outDir": "./dist"
  },
  "extends": "tsconfig/base.json",
  "include": ["src/**/*.ts"],
"exclude": ["node_modules", "**/*.test.ts", "**/*.test.tsx"]
}
`;
