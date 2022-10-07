const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./components/index.js",
  output: {
    filename: "public/js/index.[hash:6].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.pug$/,
        include: path.join(__dirname, "views"),
        use: {
          loader: "pug-loader",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(woff2?|ttf|otf|eot|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "public/fonts/[hash][ext]",
        },
      },
      {
        test: /\.(png|jpg)$/,
        type: "asset/resource",
        generator: {
          filename: "public/images/[hash][ext]",
        },
      },
    ],
  },
  plugins: [],
  externals: {},
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" },
        logLevel: "debug" /*optional*/,
      },
    },
  },
};
