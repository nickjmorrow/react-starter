module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '~/(.*)': '<rootDir>/src/$1',
        'tests/(.*)': '<rootDir>/__tests__/s$1',
    },
};
