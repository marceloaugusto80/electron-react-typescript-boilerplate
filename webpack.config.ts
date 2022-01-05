import path from "path";
import HtmlPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { DefinePlugin, Configuration, WebpackPluginInstance, HotModuleReplacementPlugin } from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";
const ReactRefreshWebapackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");


class Flag {
    readonly development: boolean;
    readonly hotReload: boolean;
    readonly target: "render" | "main";

    constructor(env: any) {
        // env variable is passed by webpack through the cli. see package.json scripts.
        this.development = !env["production"];
        this.hotReload = !!env["hot-reload"] && this.development;
        this.target = env["target"];
    }

    print() {
        console.log("## Compilation flags:")
        Object.keys(this).forEach(k => {
            console.log(`## ${k}: ${this[k as keyof Flag]}`);
        });
        console.log("##");
    }
}

function createRenderConfig(flag: Flag) : Configuration {

    const babelConfig = {
        presets: [
            "@babel/preset-react",
            "@babel/preset-typescript",
        ],
        plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime",
            flag.hotReload && require.resolve("react-refresh/babel")
        ].filter(Boolean)
    };

    return {

        context: path.join(__dirname, "src/render"),

        target: "electron-renderer",

        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".scss"]
        },

        node: {
            global: true
        },

        mode: flag.development ? "development" : "production",

        devtool: flag.development ? "source-map" : undefined,

        entry: {
            "render-process": "./render-process.tsx"
        },

        output: {
            filename: "[name].js",
            path: path.join(__dirname, "dist", "render")
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
                cleanOnceBeforeBuildPatterns: ["render/**/*.*"] // config for electron-main deletes this file
            }),

            new HtmlPlugin({
                template: "index.html",
            }),
            
            (flag.hotReload && new ReactRefreshWebapackPlugin()) as WebpackPluginInstance,
        
        ].filter(Boolean),

        devServer: {
            compress: true,
            hot: flag.hotReload,
            port: 9000,
            historyApiFallback: true,
            devMiddleware: {
                writeToDisk: true
            }

        }
    };
}

function createMainConfig(flag: Flag): Configuration {
    return {

        context: path.join(__dirname, "src/main"),

        target: "electron-main",

        mode: flag.development ? "development" : "production",

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
                cleanOnceBeforeBuildPatterns: ["main-process.js"]
            }),

            // inject this becaus the main process uses different logic for prod and dev.
            new DefinePlugin({
                "ENVIRONMENT": JSON.stringify(flag.development ? "development" : "production") // this variable name must match the one declared in the main process file.
            }),

        ]
    };
}



export default function(env: any) {
    const flag = new Flag(env);
    flag.print();
    return flag.target == "main" ? createMainConfig(flag) : createRenderConfig(flag);
};
