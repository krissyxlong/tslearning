const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const parts = require("./webpack.parts");

const config = merge([
    // {
    //     plugins: [
    //         new HtmlWebpackPlugin({
    //             title: "Webpack demo1",
    //         }),
    //     ]
    // },
    {
        output: {
            // Needed for code splitting to work in nested paths
            publicPath: "/",
        },
    },
    parts.setFreeVariable("HELLO", "hello from config"),
    // parts.loadLess()
]);
module.exports = config;
