module.exports = {
  extends: ['airbnb-base', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
      legacyDecorators: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['react', 'babel', 'react-hooks'],
  settings: {
    react: {
      version: '16.8.6'
    }
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true
      }
    }
  ],
  rules: {
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-deprecated': 2,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
