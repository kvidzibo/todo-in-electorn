module.exports = {
    "extends": "standard",
    "parser": "babel-eslint",
    globals: {
      beforeEach: true,
      test: true,
      expect: true,
      jest: true,
      beforeAll: true
    },
    "plugins": [
      "react"
    ],
    "rules": {
      "react/jsx-uses-vars": 1,
      "react/jsx-uses-react": 1
    }
};
