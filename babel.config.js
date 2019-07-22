/*module.exports = api => {
  const env = api.env();

  api.cache.using(() => env === 'development');

  if (env === 'development') {
    plugins.push('react-hot-loader/babel');
  }

  return {
    presets: ['@babel/preset-env'],
    plugins: [
      ['@babel/proposal-decorators', { legacy: true }],
      ['@babel/proposal-class-properties', { loose: true }],
      ['@babel/syntax-dynamic-import'],
      ['@babel/plugin-transform-react-jsx']
    ]
  };
};*/

module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    ['@babel/proposal-decorators', { legacy: true }],
    ['@babel/proposal-class-properties', { loose: true }],
    ['@babel/syntax-dynamic-import'],
    ['@babel/plugin-transform-react-jsx']
  ]
};
