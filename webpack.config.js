module.exports = {
  entry: "./src/app.js",
  output: {
    path: __dirname,
    filename: "./public/js/bundle.js"
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: "babel-loader?stage=0"
    }]
  },
  devtool: "inline-source-map"
}
