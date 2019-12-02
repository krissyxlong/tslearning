module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config.module.rules.push({
        test: /\.worker\.js$/,
        use: {
            loader: 'worker-loader',
            options: {
                inline: true
            }
        }
    });
    config.output.globalObject = 'this';
    return config;
}
