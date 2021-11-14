const path = require('path');

module.exports = {
  verbose: true,
  preset: 'ts-jest',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupTestFrameworkScriptFile: './setupTest.js',
  roots: [path.resolve(__dirname, '../client')],
  modulePaths: [path.resolve(__dirname, '..')],
  transform: {
    "\\.[jt]sx?$": "ts-jest"
  },
  transformIgnorePatterns: ["/node_modules/(?!(graphen)/)"],
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/../node_modules/graphen/src/$1"
  }
};
