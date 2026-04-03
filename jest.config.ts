module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterFramework: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "\\.css$": "<rootDir>/test/__mocks__/styleMock.js",
  },
};
