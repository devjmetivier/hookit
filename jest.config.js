module.exports = {
  verbose: true,
  roots: ['<rootDir>/packages'],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(\\.(test|spec))\\.(ts|tsx)$',
  testPathIgnorePatterns: ['/node_modules/', '/cjs', '/esm', '/types'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  collectCoverageFrom: ['packages/*/src/**/*.{js,ts,tsx}', '!packages/*/src/**/index.{js,ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', '/utils', '/cjs', '/esm', '/types'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'Hooky Tests',
        outputDirectory: 'coverage',
        classNameTemplate: '{classname} - {title}',
        titleTemplate: '{classname} - {title}',
        ancestorSeparator: ' > ',
      },
    ],
  ],
};
