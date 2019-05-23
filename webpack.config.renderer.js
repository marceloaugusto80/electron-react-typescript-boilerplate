const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const HtmlExternalsPlugin = require("html-webpack-externals-plugin");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {

    context: path.join(__dirname, "src"),

    //target: "web",

    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
    },

    mode: "development",

    devtool: "inline-source-map",

    entry: {
        "render-process": "./render-process.tsx"
    },

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
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-typescript",
                            "@babel/preset-react",
                            "@babel/preset-env",
                        ],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            "react-hot-loader/babel"
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },

    plugins: [
        new CleanPlugin({
            cleanOnceBeforeBuildPatterns: ["!main-process.js"]
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