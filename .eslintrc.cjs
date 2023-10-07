module.exports = {
    root: true,
    env: {
      browser: true,
      es2020: true,
      "jest/globals": true
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: 
        { ecmaVersion: 'latest', 
        sourceType: 'module',
        parser: "@babel/eslint-parser",
        requireConfigFile: false   },
    plugins: ['react-refresh', 'jest'],
    rules: {
      "indent": [
          "error",
          2  
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "never"
      ],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": [
          "error", "always"
      ],
      "no-console": 0,
      "react/prop-types": 0,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": 0,
      "no-unused-vars": 0,
      "linebreak-style": 0,
    
    },
  }