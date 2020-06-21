module.exports = {
    preset: 'ts-jest',
<<<<<<< HEAD
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/src/$1',
=======
    testEnvironment: 'node',
    moduleNameMapper: {
        '~/(.*)': '<rootDir>/src/$1',
        'tests/(.*)': '<rootDir>/__tests__/s$1',
>>>>>>> 2a1097775112a8a1bb49da5f7253c39113e94db3
    },
};
