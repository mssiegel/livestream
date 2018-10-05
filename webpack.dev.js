const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js"
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {contentBase: './dist'},
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ],
  module: {
    rules: [
      {//extracts html
        test: /\.html$/,
        use: {loader: 'html-loader'}
      },
      {//extracts css files
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {//extracts all other files such as images
        //dev build does NOT properly copy pdf files to correct 'pdfs' folder location, thus it relies on pdf files from dist folder
        test: /\.(png|jpg|gif|ico|svg|woff|woff2|pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {name: '[name].[ext]'}
          }
        ]
      },
    ]
  }
};
