const path = require('path');

const config = {
  node: {
    fs: 'empty'
  },
  entry: {
    main: path.resolve(__dirname, './src/frontend', 'index.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
};

module.exports = config;
