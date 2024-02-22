const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const {NativeFederationTypeScriptRemote} = require('@module-federation/native-federation-typescript/webpack')
const Dotenv = require("dotenv-webpack");
const deps = require("./package.json").dependencies;

const moduleFederationConfig = {
  name: 'ui',
  filename: 'remoteEntry.js',
  exposes: {
    "./atoms": "./src/components/atoms",
    "./molecules": "./src/components/molecules",
    "./organisms": "./src/components/organisms"
  },
  shared: {
    ...deps,
    react: { singleton: true, eager: true, requiredVersion: deps.react },
    "react-dom": { singleton: true, eager: true, requiredVersion: deps["react-dom"] }
  },
}

module.exports = (_, argv) => ({
  cache: false,
  devtool: 'source-map',
  mode: 'development',
  output: {
    publicPath: "http://localhost:9000/",
    clean: true
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 9000,
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
    NativeFederationTypeScriptRemote({moduleFederationConfig, compiledTypesFolder: ""}),
    new Dotenv(),
  ],
});
