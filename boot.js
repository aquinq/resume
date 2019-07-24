// Express
const express = require("express");
const path = require("path");
const app = express();

// Webpack
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const compiler = webpack(webpackConfig);
const wdm = require("webpack-dev-middleware");
const whm = require("webpack-hot-middleware");

// Add Webpack Dev Middleware (for HMR).
// Enables webpack Hot Module Replacement.
app.use(
  wdm(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);
app.use(
  whm(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);

// Serve the static files from the React app using webpack config file.
app.use(webpackConfig.output.publicPath, express.static(webpackConfig.output.path));

// Serve the static font files.
app.use(webpackConfig.output.publicPath + "fonts/", express.static(path.join(__dirname + "/client/styles/fonts")));

console.log(webpackConfig.output.publicPath + "fonts");
console.log(path.join(__dirname + "/client/styles/fonts"));

const entryFile = path.join(__dirname + "/client/home.html");

// Handles any requests that don't match the ones above.
app.get("*", (req, res) => {
  res.sendFile(entryFile);
});

const port = process.env.PORT || 4949;

app.listen(port);

console.log("App is listening on port " + port);
