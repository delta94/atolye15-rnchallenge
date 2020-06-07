module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    'babel-plugin-styled-components',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
  ],
};
