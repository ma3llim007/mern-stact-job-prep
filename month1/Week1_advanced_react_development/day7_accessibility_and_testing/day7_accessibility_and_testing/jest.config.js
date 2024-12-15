export default {
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.[jt]sx?$": "babel-jest",
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    testMatch: ["**/__tests__/**/*.test.[jt]s?(x)", "**/src/**/*.[jt]s?(x)", "**/tests/**/*.[jt]s?(x)"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
};
