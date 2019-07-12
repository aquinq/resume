const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: ["client/index.tsx", "webpack-hot-middleware/client"],
  output: {
    chunkFilename: "main.vendor.js",
    filename: "main.js",
    path: path.join(__dirname, "/wwwroot/dist"),
    // Specify the base path for all the assets within the application (scripts, images etc...).
    publicPath: "/static/"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  mode: "development",

  module: {
    // Define loader depending on file's extension.
    rules: [
      {
        test: /\.tsx?$/,
        exclude: path.resolve(__dirname, "node_modules"),
        loader: "awesome-typescript-loader"
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },

  // Vendor scripts will be bundled in a separate file from core app scripts.
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },

  // Enable Hot Module Replacement
  plugins: [new webpack.HotModuleReplacementPlugin()],

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      client: path.resolve(__dirname, "client/"),
      wwwroot: path.resolve(__dirname, "wwwroot/")
    }
  }
};
