const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const parts = require("./webpack.parts");

const config = merge([
    {
        plugins: [
            new HtmlWebpackPlugin({
                title: "Webpack demo1",
            }),
        ]
    },
    // parts.loadLess()
]);
module.exports = config;
