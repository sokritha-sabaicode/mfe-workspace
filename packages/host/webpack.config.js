const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { NativeFederationTypeScriptHost } = require('@module-federation/native-federation-typescript/webpack')
const Dotenv = require("dotenv-webpack");
const deps = require("./package.json").dependencies;

const moduleFederationConfig = {
  name: "host",
  filename: "remoteEntry.js",
  remotes: {
    "mfe-ui": "ui@http://localhost:9000/remoteEntry.js",
  },
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps.react,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
  },
}

module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:8000/",
    clean: true
  },
  cache: false,
  mode: 'development',

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8000,
    historyApiFallback: true,
    liveReload: true
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin(moduleFederationConfig),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    NativeFederationTypeScriptHost({moduleFederationConfig}),
    new Dotenv(),
  ],
});
