const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  clearMocks: true,
  coverageReporters: [
    "json",
    "lcov",
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/src/" }),
  preset: '@shelf/jest-mongodb',
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/**/*.spec.ts",
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};
