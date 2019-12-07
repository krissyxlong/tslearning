const merge = require("webpack-merge");
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
    parts.loadImages()
]);

const productionConfig = merge([
    parts.extractCSS({
        use: ["css-loader", parts.autoprefix()],
    }),
    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
    }),
    parts.loadImages({
        options: {
            limit: 20000,
            name: "[name].[ext]",
        },
    }),
]);

module.exports = mode => {
    // mode = 'production';
    // return merge(commonConfig, productionConfig, { mode });
    // mode = 'production';
    console.log('mode:', mode);
    if (mode === 'production') {
        return merge(commonConfig, productionConfig, { mode });
    }
    return merge(commonConfig, developmentConfig, { mode });
};
