module.exports = {
  testMatch: [
      "**/__tests__/**/*.test.ts?(x)",
  ],
  transform: {
      'ts(x)?$': 'ts-jest',
  },
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  globals: {
      'ts-jest': {
          tsConfig: './tsconfig.json'
      }
  }
};