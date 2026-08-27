module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
        },
      },
    ],
    '@babel/preset-react',
  ],
  // CRA 3/Webpack 4 cannot parse class fields in dependencies, even when the
  // consuming browser supports them. Keep the target modern while lowering
  // this syntax in the published library artifacts.
  plugins: ['@babel/plugin-transform-class-properties'],
};
