const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  mode: 'production',
  //entry points for webpack: 1. polyfills, 2. your main js file
  //note: 'app' keyname makes [name] equal 'app'
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash].min.js"
  },
  devtool: "source-map",
  optimization: {
    minimizer: [
      //minimizes css; cssProcessorOptions creates css sourceMap
      new OptimizeCSSAssetsPlugin({ cssProcessorOptions: { map: { inline: false, annotation: true, } } })
    ]
  },
  module: {
    rules: [
      {//minimizes html
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {minimize: true}
        }
      },
      {//extracts css files
        test: /\.css$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          "css-loader"
        ]
      },
      {//extracts any other file, such as images;
        test: /\.(png|jpg|gif|ico|svg|woff|woff2|pdf)$/,
        use: [
          {
            loader: 'file-loader',
            //ensures file retains original name
            options: {name: '[name].[ext]'}
          },
          //optimizes and minifies all images
          'image-webpack-loader',
        ]
      }
    ]
  },
  plugins: [
    //deletes the dist folder at the start of each build, thereby cleaning it of unused files
    new CleanWebpackPlugin(['dist']),
    //extracts html
    new HtmlWebpackPlugin({template: './src/index.html'}),
    //extracts css
    new MiniCssExtractPlugin({filename: "[name].[contenthash].min.css"})
  ]
};
