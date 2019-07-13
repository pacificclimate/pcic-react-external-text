module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ExternalText',
      externals: {
        react: 'React'
      }
    }
  }
}
