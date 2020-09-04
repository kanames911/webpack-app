const DEV = "development";
const PROD = "production";
const MODE = DEV;
const path = require("path");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HTML_WEBPACK_PLUGIN = (name) => {
  const path = "./src/pug/";
  const INDEX_HTML = "index.html";
  const INDEX_PUG = "index.pug";
  let opts = {};
  name === "index"
    ? (opts = {
        template: `${path}${INDEX_PUG}`,
        filename: INDEX_HTML,
        inject: false,
      })
    : (opts = {
        template: `${path}${name}/${INDEX_PUG}`,
        filename: `${name}/${INDEX_HTML}`,
        inject: false,
      });
  return new HtmlWebpackPlugin(opts);
};

const entry = {
  ts: {
    "assets/js/main": "./src/ts/index.ts",
  },
  scss: {
    "assets/css/main": "./src/scss/main.scss",
    "assets/css/top/style": "./src/scss/top/style.scss",
    "assets/css/about/style": "./src/scss/about/style.scss",
  },
  pug: {
    top: "index",
    about: "about",
  },
};

module.exports = {
  mode: MODE,
  entry: { ...entry.ts, ...entry.scss },
  output: {
    filename: "[name].js",
    publicPath: "/",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader' ,
          }
        ]
      },
      {
        test: /\.css/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: {
          pretty: MODE === DEV ? true : false
        }
      },
    ],
  },
  resolve: {
    extensions: [
      '.ts', '.js',
    ],
  },
  plugins: [
    HTML_WEBPACK_PLUGIN('index'),
    HTML_WEBPACK_PLUGIN('about'),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: './src/assets/images',
          to: 'assets/images/',
        } 
      ]
    })
  ],
};
