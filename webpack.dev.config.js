const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  resolve: {
    modules: [
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, './node_modules/graphen'),
      path.resolve(__dirname, '.'),
    ],
  },
  context: `${__dirname}/client`,
  output: {
    path: `${__dirname}/public`,
    filename: '[name].js',
  },
  entry: {
    scripts: ['regenerator-runtime/runtime', './app.tsx'],
    css: './app.scss',
  },
  module: {
    rules: [{
      test: /\.(j|t)sx?$/,
      resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      use: 'url-loader',
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }, { allChunks: true }),
  ],
};
