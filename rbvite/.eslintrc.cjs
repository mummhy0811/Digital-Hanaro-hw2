module.exports = {
  env: { browser: true, es2021: true, node: true },
  extends: [
    'eslint:recommended', 'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parserOptions: {      
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest', sourceType: 'module',
  },
  plugins: ['react-refresh', 'jsx-a11y', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/no-array-index-key': 'error',
    'prettier/prettier': 'error',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],

  },
  settings: {
    react: { version: 'detect' },
  },
};
