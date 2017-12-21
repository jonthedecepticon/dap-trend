module.exports = {
  entry: "./scripts.js",
  output: {
    path: __dirname,
    filename: "public/bundle.js"
},
module: {
  loaders: [
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
};
