module.exports = api => {
  const env = api.env();
  api.cache.using(() => env === 'development');

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          shippedProposals: true,
          spec: true,
          loose: false,
          debug: false,
          targets: {
            node: 'current'
          }
        }
      ]
    ]
  };
};
