module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'cobertura'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  reporters: [
    'default',
    [
      'jest-sonar',
      {
        outputDirectory: 'coverage', // Directory where the report will be saved
        outputName: 'test-report.xml', // Name of the report file
        reportedFilePath: 'absolute', // Use absolute file paths in the report
      },
    ],
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
