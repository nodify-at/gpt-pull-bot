export default {
    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,
    testEnvironment: 'node',
    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^@gpt/(.*).js$': '<rootDir>/src/$1.ts',
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    moduleFileExtensions: [
        'ts',
        'js',
    ],
    transformIgnorePatterns: [],
    transform: {
        "^.+\\.(t|j)s?$": "@swc/jest",
    },
    setupFiles: ['<rootDir>/src/setup-tests.ts'],
    errorOnDeprecated: true,
    fakeTimers: {
        enableGlobally: true,
    },
    maxWorkers: '50%',
    // An array of directory names to be searched recursively up from the requiring module's location
    moduleDirectories: ['node_modules'],
    notify: true,
    notifyMode: 'failure-change',
    rootDir: '.',

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/?(*.)+(spec|test).ts'],
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['/node_modules/'],
}
