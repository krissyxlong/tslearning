const merge = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");
const glob = require("glob");

const parts = require("./webpack.parts");
const commonConfig = require('./webpack.common');

const PATHS = {
    app: path.join(__dirname, "src"),
  };

const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadCSS(),
    parts.loadImages(),
    {
        plugins: [new webpack.HotModuleReplacementPlugin()]
    }
]);

const productionConfig = merge([
    {
        output: {
            chunkFilename: "[name].[chunkhash:4].js",
            filename: "[name].[chunkhash:4].js",
        },
    },
    parts.extractCSS({
        use: ["css-loader", parts.autoprefix()],
    }),
    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
    }),
    parts.loadImages({
        options: {
            limit: 20000,
            name: "[name].[hash:4].[ext]"
        },
    }),
    {
        optimization: {
            splitChunks: {
                chunks: "initial",
            },
            runtimeChunk: {
                name: "manifest", // 生成 manifest 文件
            }
        },
    },
    parts.attachRevision(),
    parts.minifyJavaScript(),
]);

module.exports = mode => {
    // mode = 'production';
    // return merge(commonConfig, productionConfig, { mode });
    // mode = 'production';
    console.log('mode:', mode);
    const pages = [
        parts.page({
            title: "Webpack demo",
            entry: {
                app: PATHS.app,
            },
            chunks: ["app", "manifest", "vendors~app"],
        }),
        parts.page({
            title: "Another demo",
            path: "another",
            entry: {
                another: path.join(PATHS.app, "another.js"),
            },
            chunks: ["another", "manifest", "vendors~app"],
        }),
    ];
    const config =
        mode === "production" ? productionConfig : developmentConfig;

    console.log('heheda1:', JSON.stringify(merge([commonConfig, config, { mode }].concat(pages))));
    return merge([commonConfig, config, { mode }].concat(pages));
    // if (mode === 'production') {
    //     return merge(commonConfig, productionConfig, { mode });
    // }
    // return merge(commonConfig, developmentConfig, { mode });
};
