const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const HtmlExternalsPlugin = require("html-webpack-externals-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

    context: path.join(__dirname, "src"),

    target: "electron-renderer",

    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
    },

    mode: "development",

    devtool: "inline-source-map",

    entry: ["./render-process.tsx"],

    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist")
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-router-dom": "ReactRouterDOM"
    },

    module: {
        rules: [

            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true
                        }
                    },
                    "css-loader",
                    "sass-loader"
                ]
            },

            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },

        ]
    },

    plugins: [
        new CleanPlugin({
            cleanOnceBeforeBuildPatterns: ["!main-process.js"]
        }),

        new MiniCssExtractPlugin({
            filename: "main.css"
        }),

        new HtmlPlugin({
            filename: "index.html",
            template: "index.html",
            cache: true,
        }),

        new HtmlExternalsPlugin({
            cwpOptions: { context: path.join(__dirname, "node_modules") },
            externals: [
                { module: "react", global: "React", entry: "umd/react.development.js" },
                { module: "react-dom", global: "ReactDOM", entry: "umd/react-dom.development.js" },
                { module: "react-router-dom", global: "ReactRouterDOM", entry: "umd/react-router-dom.js" },
            ]
        }),

    ],

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
}