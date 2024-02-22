const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { NativeFederationTypeScriptHost } = require('@module-federation/native-federation-typescript/webpack')
const {NativeFederationTypeScriptRemote} = require('@module-federation/native-federation-typescript/webpack')

const Dotenv = require('dotenv-webpack');
const deps = require("./package.json").dependencies;


const moduleFederationConfig = {
  name: "dashboard",
  filename: "remoteEntry.js",
  remotes: {
    "mfe-ui": "ui@http://localhost:9000/remoteEntry.js",
  },
  exposes: {
    "./app": "./src/App"
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
    publicPath: "http://localhost:8001/",
    clean: true
  },
  cache: false,
  mode: 'development',
  devtool: 'source-map',

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8001,
    static: {
      directory: path.join(__dirname, 'dist')
    },
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
    NativeFederationTypeScriptRemote({moduleFederationConfig, compiledTypesFolder: ""}),
    new Dotenv()
  ],
});
