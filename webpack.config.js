require('dotenv').config();
const isProd = process.env.NODE_ENV === 'production';

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devtool = !isProd ? 'source-map' : '';

const buildModule = {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: 'babel-loader',
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader?sourceMap']
      }),
    },
  ],
};

const plugins = [
  new ExtractTextPlugin({
    filename: 'public/main.css',
    allChunks: true,
  }),
  new webpack.DefinePlugin({
    'KEEN': {
      READ_KEY: JSON.stringify(process.env.KEEN_READ_KEY),
      PROJECT_ID: JSON.stringify(process.env.KEEN_PROJECT_ID),
    },
  }),
];

if (isProd) {
  plugins.push(new UglifyJSPlugin());
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }));
}


module.exports = {
  entry: ['babel-polyfill', './app/index.js'],
  output: {
    filename: './public/main.min.js',
  },
  devtool,
  module: buildModule,
  plugins
}
