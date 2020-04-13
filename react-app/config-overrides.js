module.exports = function override(config, env) {
    // 添加 worker-loader
    config.module.rules.push({
        test: /\.worker\.js$/,
        use: {
            loader: 'worker-loader',
            options: {
                inline: true
            }
        }
    });
    // 配置环境
    config.output.globalObject = 'this';
    return config;
};


