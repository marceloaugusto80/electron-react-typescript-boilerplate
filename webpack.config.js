const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DefinePlugin = require("webpack").DefinePlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');



// const to avoid typos 
const DEVELOPMENT = "development";
const PRODUCTION = "production";


function createRenderConfig(isDev) {

    const babelConfig = {
        presets: [
            "@babel/preset-typescript",
            "@babel/preset-react",
        ],
        plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime",
            isDev && require.resolve("react-refresh/babel")
        ].filter(Boolean)
    };

    return {

        context: path.join(__dirname, "src"),

        target: "electron-renderer",

        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".scss"]
        },

        mode: isDev ? DEVELOPMENT : PRODUCTION,

        devtool: isDev ? "source-map" : undefined,

        entry: {
            "render-process": "./render-process.tsx"
        },

        output: {
            filename: "[name].js",
            path: path.join(__dirname, "dist")
        },

        module: {
            rules: [

                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        "css-loader"
                    ]
                },

                {
                    // transforms font files in base64 data. That's the only way I could import fonts in .scss files.
                    test: /\.(jpg|jpeg|png|gif|woff|woff2|eot|ttf|svg)$/,
                    use: [{ loader: 'url-loader?limit=100000'}]
                },
                
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: babelConfig
                    }
                },

            ]
        },

        plugins: [

            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [ "**/*", "!main-process.*.js"] // config for electron-main deletes this file
            }),

            new HtmlPlugin({
                filename: "index.html",
                template: "index.html",
                cache: true,
            }),

            isDev && new webpack.HotModuleReplacementPlugin(),
            isDev && new ReactRefreshWebpackPlugin(),
        ].filter(Boolean),

        devServer: isDev ? {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            hot: true,
            port: 9000
        } : undefined
    };
}


function createMainConfig(isDev) {
    return {

        context: path.join(__dirname, "src"),

        target: "electron-main",

        mode: isDev ? DEVELOPMENT : PRODUCTION,

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
                            ],
                        }
                    }
                }
            ]
        },

        plugins: [

            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ["main-process.*.js"]
            }),

            // inject this becaus the main process uses different logic for prod and dev.
            new DefinePlugin({
                "ENVIRONMENT": JSON.stringify(isDev ? DEVELOPMENT : PRODUCTION) // this variable name must match the one declared in the main process file.
            }),

            // electron-packager needs the package.json file. the "../" is because context is set to the ./src folder
            new CopyWebpackPlugin({
                patterns: [
                    {from: "package.json", to: "./", context:"../"}
                ]
            })
        ]
    };
}



module.exports = function (env) {

    // env variable is passed by webpack through the cli. see package.json scripts.
    const isDev = !!env.development;
    const target = env.target;

    const configFactory = target == "main" ? createMainConfig : createRenderConfig;
    const config = configFactory(isDev);

    console.log(
        "\n##\n## BUILDING BUNDLE FOR: " + (target == "main" ? "main process" : "render process") +
        "\n## CONFIGURATION: " + (isDev ? DEVELOPMENT : PRODUCTION) +
        "\n##\n"
    );

    return config;

};
