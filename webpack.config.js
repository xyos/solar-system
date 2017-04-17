const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    "./app/app" // Your appʼs entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || "source-map",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".js"]
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ["babel?presets[]=es2015"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.less$/, loader: "style-loader!css-loader!less-loader"}
    ]
  },
  devServer: {
      contentBase: "./public",
      noInfo: false, //  --no-info option
      hot: true,
      inline: true
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './app/template.html'
    })
  ]
};
