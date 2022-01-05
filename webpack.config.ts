import path from "path";
import HtmlPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { DefinePlugin, Configuration, WebpackPluginInstance, HotModuleReplacementPlugin } from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";
const ReactRefreshWebapackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

// const to avoid typos 
const DEVELOPMENT = "development";
const PRODUCTION = "production";

function createRenderConfig(isDev: boolean) : Configuration {

    const babelConfig = {
        presets: [
            "@babel/preset-react",
            "@babel/preset-typescript",
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

        node: {
            global: true
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
                    use: [{ loader: 'url-loader?limit=100000' }]
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
                cleanOnceBeforeBuildPatterns: ["**/*", "!main-process.*.js"] // config for electron-main deletes this file
            }),

            new HtmlPlugin({
                filename: "index.html",
                template: "index.html",
                cache: true,
            }),
            
            (isDev && new ReactRefreshWebapackPlugin()) as WebpackPluginInstance,
        
        ].filter(Boolean),

        devServer: {
            compress: true,
            hot: true,
            port: 9000,
            historyApiFallback: true,
            devMiddleware: {
                writeToDisk: true
            }

        }
    };
}


function createMainConfig(isDev: boolean) {
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
                    { from: "package.json", to: "./", context: "../" }
                ]
            })
        ]
    };
}



module.exports = function (env: any) {

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
