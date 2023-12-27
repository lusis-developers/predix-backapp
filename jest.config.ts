export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  setupFiles: ['./.jest/setEnvVars.js'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!**/node_modules/**',
    '!**/dist/**'
  ]
};
