const CracoAlias = require('craco-alias')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        /* tsConfigPath should point to the file where "paths" are specified */
        tsConfigPath: './tsconfig.json',
      },
    },
  ],
  webpack: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
  devServer: {
    proxy: {
      '/api/token': {
        target: 'http://localhost:9004',
        pathRewrite: { '^/api/token': '/token' },
      },
      '/api/refresh': {
        target: 'http://localhost:9005',
        pathRewrite: { '^/api/refresh': '/refresh' },
      },
      '/api/user': {
        target: 'http://localhost:9002',
        pathRewrite: { '^/api/user': '/user' },
      },
      '/api/create-exercise': {
        target: 'http://localhost:9000',
        pathRewrite: { '^/api/create-exercise': '/create-exercise' },
      },
      '/api/check-exercise': {
        target: 'http://localhost:9001',
        pathRewrite: { '^/api/check-exercise': '/check-exercise' },
      },
    },
  },
}
