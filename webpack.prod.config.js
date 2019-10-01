const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  resolve: {
    modules: [
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, '.'),
    ],
  },
  context: `${__dirname}/client`,
  output: {
    path: `${__dirname}/public`,
    filename: '[name].js',
  },
  entry: {
    scripts: ['regenerator-runtime/runtime', './app.jsx'],
    css: './app.scss',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      resolve: {
        extensions: ['.js', '.jsx'],
      },
      use: {
        loader: 'babel-loader',
      },
    }, {
      test: /\.scss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        'css-loader',
        'sass-loader',
      ],
    }, {
      test: /\.jpg|.png|.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      }],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }, { allChunks: true }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
};
