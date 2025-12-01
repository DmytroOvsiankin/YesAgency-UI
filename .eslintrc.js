module.exports = {
  env: {
    browser: false,
    es2021: true,
  },
  extends: ['universe/native', 'plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'off',
    'react/prop-types': 'off',
  },
};
