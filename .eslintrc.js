module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react', '@react-native-community'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {extensions: ['.js', '.jsx', '.ts', '.tsx']},
    ],
    'react-native/no-inline-styles': 'off',
  },
  plugins: ['babel', 'react', 'import', 'prettier'],
};
