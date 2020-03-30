module.exports = {
    root: true,
    // 告诉 eslint 使用我们安装的解析包 @typescript-eslint/parser。这让 eslint 理解 ts 语法
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
};
