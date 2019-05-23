const path = require("path");

module.exports = {

    context: path.join(__dirname, "src"),

    target: "electron-main",

    mode: "development",

    entry: {
        "main-process": "./main-process.ts"
    },

    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist")
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-typescript",
                            "@babel/preset-env",
                        ],
                    }
                }
            }
        ]
    },

}