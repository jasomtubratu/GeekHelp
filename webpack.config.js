const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
   mode: "production",
   entry: {
      background: path.resolve("src", "background.ts"),
      utils: path.resolve("src", "utils.ts"),
      script: path.resolve("src/popup", "script.ts"), 
   },
   output: {
      path: path.join(__dirname, "/dist"),
      filename: (pathData) => {
         return pathData.chunk.name === 'script' ? 'popup/[name].js' : '[name].js';
      },
   },
   resolve: {
      extensions: [".ts", ".js"],
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
         },
      ],
   },
   plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
         patterns: [
            { from: ".", to: ".", context: "public" },
            { from: "src/popup", to: "popup", globOptions: { ignore: ["**/*.ts"] } } // Ignore TypeScript files
         ]
      }),
   ],
};