const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");

exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
      rules: [
        {
          test: /\.(png|jpg)$/,
          include,
          exclude,
          use: {
            loader: "url-loader",
            options,
          },
        },
      ],
    },
  });

exports.autoprefix = () => ({
    loader: "postcss-loader",
    options: {
      plugins: () => [require("autoprefixer")()],
    },
  });

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })],
});

exports.extractCSS = ({ include, exclude, use = [] }) => {
    // Output extracted CSS to a file
    const plugin = new MiniCssExtractPlugin({
        filename: "[name].css",
    });

    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,
                    use: [
                        MiniCssExtractPlugin.loader
                    ].concat(use),
                },
            ],
        },
        plugins: [plugin],
    };
};

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                use: ["style-loader", "css-loader"],
            }
        ],
    },
});

exports.loadLess = () => ({
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            }
        ],
    },
});

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        stats: "errors-only",
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        open: true,
        overlay: true,
    },
});
