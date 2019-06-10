module.exports = {
  collectCoverage: true,
  coverageDirectory: './output/coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '__helpers__/'],
  coverageReporters: ['text'],
  preset: 'ts-jest',
  roots: ['<rootDir>/test/'],
  setupFiles: ['reflect-metadata'],
  testEnvironment: 'node',
};
