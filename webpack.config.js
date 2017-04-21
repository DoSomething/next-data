require('dotenv').config();
const isProd = process.env.NODE_ENV === 'production';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
        use: ['css-loader', 'sass-loader']
      }),
    },
  ],
};

const credentials = {
  process: {
    env: {
      KEEN_READ_KEY: JSON.stringify(process.env.KEEN_READ_KEY) || null,
      KEEN_PROJECT_ID: JSON.stringify(process.env.KEEN_PROJECT_ID) || null,
    }
  }
};

const plugins = [
  new ExtractTextPlugin({
    filename: 'public/main.css',
    allChunks: true,
  }),
  new webpack.DefinePlugin(credentials)
];

if (isProd) plugins.push(new UglifyJSPlugin());

module.exports = {
  entry: {
    main: './app/index.js',
  },
  output: {
    filename: './public/main.min.js',
  },
  devtool,
  module: buildModule,
  plugins
};
