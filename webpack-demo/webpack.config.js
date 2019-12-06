const merge = require("webpack-merge");
const parts = require("./webpack.parts");
const commonConfig = require('./webpack.common');

const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadCSS()
]);

const productionConfig = merge([
    parts.extractCSS({
        use: "css-loader",
    }),
]);

module.exports = mode => {
    console.log(111111111, mode);
    // return merge(commonConfig, productionConfig, { mode });
    if (mode === 'production') {
        return merge(commonConfig, productionConfig, { mode });
    }
    return merge(commonConfig, developmentConfig, { mode });
};
