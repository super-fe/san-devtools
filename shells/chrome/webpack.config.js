var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: '#inline-source-map',
  entry: {
    hook: './src/hook.js',
    devtools: './src/devtools.js',
    background: './src/background.js',
    'devtools-background': './src/devtools-background.js',
    backend: './src/backend.js',
    proxy: './src/proxy.js',
    detector: './src/detector.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.san', '.js', '.css', '.scss', '*'],
    alias: {
      src: path.resolve(__dirname, '../../src'),
      components: path.resolve(__dirname, '../../src/devtools/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          "presets": ['stage-2', 'es2015'],
          "plugins": ['transform-runtime', 'transform-class-properties']
        }
      },
      {
        test: /\.san$/,
        loader: 'san-loader',
        options: {
          loaders: {
            css: 'style-loader!css-loader',
            scss: 'style-loader!css-loader!sass-loader',
            sass: 'style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      },
      {
        test: /\.(png|woff2|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new ExtractTextPlugin({
      filename: 'build.css',
      allChunks: true
    })
  ]
};
