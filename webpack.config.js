
module.exports = {
  mode: "development",
  //devtool: "inline-source-map",
  entry: "./Src/index.ts",
  output: {
    path:__dirname+"/dist",
    filename: "index.js",
    library: {
      type:"module"
    }
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" }
    ]
  },
  experiments: {
    outputModule: true
  },
};