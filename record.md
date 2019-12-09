mode：https://webpack.js.org/configuration/mode/
    开启 webpack 内建的环境优化
    production：
        Sets process.env.NODE_ENV on DefinePlugin to value production . 
        Enables FlagDependencyUsagePlugin , FlagIncludedChunksPlugin , ModuleConcatenationPlugin , 
            NoEmitOnErrorsPlugin , OccurrenceOrderPlugin , SideEffectsFlagPlugin and TerserPlugin 
    development：
        Sets process.env.NODE_ENV on DefinePlugin to value development . 
        Enables NamedChunksPlugin and NamedModulesPlugin 
    null：
        Opts out of any default optimization options
        
    1、DefinePlugin：设置环境变量；
    2、cache：Cache the generated webpack modules and chunks to improve build speed；https://webpack.js.org/configuration/other-options/#cache
    3、performance：control how webpack notifies you of assets and entry points that exceed a specific file limit；https://webpack.js.org/configuration/performance/#root
    4、output.pathInfo：打包文件是否包含评论
    5、TerserPlugin：use terser to minify your js. 压缩 js 文件
    - optimization: {
    -   namedModules: false, // 告知 webpack 使用可读取模块标识符(readable module identifiers)，来帮助更好地调试
    -   namedChunks: false,
    -   nodeEnv: 'production', // 告知 webpack 将 process.env.NODE_ENV 设置为一个给定字符串。
    -   flagIncludedChunks: true, // 告知 webpack 确定和标记出作为其他 chunk 子集的那些 chunk，其方式是在已经加载过较大的 chunk 之后，就不再去加载这些 chunk 子集。 提高记载速度
    -   occurrenceOrder: true, // 告诉 webpack 计算出最佳的加载顺序，让初始化 bundle size 最小。
    -   sideEffects: true,
    -   usedExports: true,
    -   concatenateModules: true,
    -   splitChunks: { // 分块策略
    -     hidePathInfo: true,
    -     minSize: 30000, // Minimum size, in bytes, for a chunk to be generated.
    -     maxAsyncRequests: 5, // Maximum number of parallel requests when on-demand loading.
    -     maxInitialRequests: 3, // Maximum number of parallel requests at an entry point.
    -   },
    -   noEmitOnErrors: true, // 在编译出错时，使用 optimization.noEmitOnErrors 来跳过生成阶段(emitting phase)。这可以确保没有生成出错误资源。
    -   checkWasmTypes: true,
    -   minimize: true, // 告诉 webpack 用 TerserPlugin 插件或 optimization.minimizer 指明的插件压缩代码
    - }
    
    涉及调试开发提示、环境标识、代码压缩加载优化等

source-map: http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
    是一个存储位置信息的文件。转化后代码的每一个位置，所对应的转换前的位置。

optimization.minimizer: 
    TerserPlugin
    OptimizeCSSAssetsPlugin
optimization.splitChunks: chunks 通过 webpack graph 的父子关系相关联。CommonsPlugin 用来处理重复依赖，但是不能进一步优化。（https://webpack.js.org/plugins/split-chunks-plugin/#root）
        splitChunks 只会影响按需 chunks,因为改变初始 chunks 会影响 HTML 的脚本 tag。webpack 会根据以下规则来分割 chunks：。。。
    splitChunks.chunks：用来优化的 chunks，一般用 ‘all’
Resolve：change how modules are resolved. 改变模块解析的方式
    alias: create aliases to import or require certain modules more easily. 
        例如：
        module.exports = {
          //...
          resolve: {
            alias: {
              Utilities: path.resolve(__dirname, 'src/utilities/'),
              Templates: path.resolve(__dirname, 'src/templates/')
            }
          }
        };
        然后 import Utility from '../../utilities/utility'; 可以改写成 import Utility from 'Utilities/utility';
    .modules：tell webpack what directories should be searched when resolving modules。
    .plugins：a list of additional resolve plugins which should be applied.
    .extensions：Attempt to resolve these extensions in order
resolveLoader：类似 resolve,但是只用来解析 loader packages。
performance：
    these options allows you to control how webpack notifies you of assets and entry points that exceed a specific file limit.
module:
    strictExportPresence:  makes missing exports an error instead of warning
    rules: a rule can be separated into three parts - conditions, results and nested rules.
        rule.parser: 
        rule.oneOf:
        rule.enforce: 指明 loader 类型
            'pre':
            'post':
            
plugin: 
    1、定义全局环境变量：new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") })
    2、简化引用路径书写：resolve.alias: {
                             Utilities: path.resolve(__dirname, 'src/utilities/'),
                             Templates: path.resolve(__dirname, 'src/templates/')
                           };
    3、压缩文件：
    
    
1、what's webpack
    webpack relies on modules
        a dependency graph is a directed graph that describes how nodes related to each other.
    webpack's execution process
        从 entry 开始。
        （1）resolution process
            entry 文件也是一个 module。除了 node_modules 外，可以告诉 webpack 怎么查找路径。可以调整 webpack 匹配文件后缀的方式，也可以给路径定义特殊的规则。
            当 webpack 正确地解析到文件路径，webpack 会根据 loader 定义来处理文件。each loader applies a specific transformation against the module contents.
            loader 匹配文件可以通过多种方式：文件类型、文件地址等。webpack 的灵活性允许根据文件被引入文件的位置来做 loader 转换。
        （2）webpack resolves against any file types
        （3）evaluation process
            webpack evaluates the matched loaders 从下到上，从右到左。
            当 valuation 过程没有报错时，webpack 会把 source 打进 bundles。而 Plugins 允许在打包的不同阶段中断 runtime 事件。
            比如 MiniCssExtractPlugin 可以把 css 文件打包进一个独立的文件，而不是 inlined js。
        （4）finishing
            所有 bundle 都被 evaluated 后，webpack writes output。the output includes a bootstrap script with a manifest that describes how to begin executing the result in the browsers.
    webpack is configuration driven
    asset hashing
    hot module replacement
    code splitting
        
2、developing
    getting started
        installing
        executing
        setting up assets
        configuring html-webpack-plugin
        examining the output
        add a build shortcut
    webpack-dev-server
        webpack watch mode 
            detects changes made to files and recompiles automatically.
        WDS:
            a development server running in-memory, meaning the bundle contents aren't written out to files but stored in memory.
            HMR：allows patching the browser state without a full refresh making it handy with libraries like react where an update blows away the application state.
        emitting files from WDS
            默认文件在内存中生成，但有时需要在文件系统中生成（暂未感受到）
        attaching WDS to the project
            configuring WDS through webpack configuration
                devServer.historyApiFallback
        enabling error overlay
            更优体验：error-overlay-webpack-plugin
        enable HMR
        accessing the development server from network
            customize host and port setting through the env in the setup（暂时感受不到）
        making it faster to develop configuration
            当改变 webpack 配置时，一般需要重启服务才会生效。这可以通过 nodemon 来监控 webpack 配置变化来自动重启。将来 WDS 可能自己会实现该功能。
        polling insteadof watch
            有时 WDS 的 watch 模式并不是那么敏感，特别时在一些老系统上，这时可配置 polling 属性，这会更敏感。
            devServer.watchOptions.poll：1000
        alternative ways to use WDS
        other features of WDS
        development plugins
            case-sensitive-paths-webpack-plugin
        output plugins
    composing configuration
        possible ways to manage configuration
        composing configuration by merging: webpack-merge\webpack-chain
        setting up webpack-merge
        understanding --env
            scripts:{ "start": "webpack-dev-server --env development" }
        benefits of composing configuration
            扩展设置、提取不同场景的公共部分、可以声明小配置然后组装
3、styling
    loading styles
        loading style、refreshing styles during development、separating css、eliminating unused css、and autoprefixing
        loading css
            主要依赖 css-loader style-loader
            MiniCssExtractPlugin：generate a separate css file
        understanding lookups
            css-loader 不能处理绝对路径引用 (url("/static/img/demo.png"))
        processing css-loader imports
            设置 importLoaders 属性
        loading from node_modules directory
            如：@import "~bootstrap/less/bootstrap"，添加 “~”，详情见文档
        enable source maps
        converting css to strings
        using bootstrap
        conclusion:
            默认地，样式文件被打包进 js bundles
            使用 less-loader 时需同时安装 less-loader 和 less。
    separating css
        用 js 加载 css，会出现 Flash of Unstyled Content (FOUC)。把 css 文件分开来就可以避免这个问题。
        mini-css-extract-plugin
        settingup
            MiniCssExtractPlugin
        managing styles outside of javascript
            todo...
    eliminating unused
    
    css
    autoprefixing
4、loading assets
    loading definitions
    loading images
    loading fonts
    loading js
5、building
    source maps
        开发环境用来调试
    bundle splitting
        每次发布更新后，不需要重新加载整个 bundle，后只需下载变化的部分，通过设置 optimization.splitChunks.cacheGroups 实现，webpack4 在生产环境会默认部署。
        (1) the idea of bundle splitting
        (2) adding sth to split
        (3) setting up a vendor bundle
            optimization.splitChunks.chunks = 'initial';
        (4) controlling bundle splitting
            另一种方案：
            optimization.splitChunks.cacheGroups.commons = {}; // 更多可控性
        (5) splitting and merging chunks
            AggressiveSplittingPlugin 、 AggressiveMergingPlugin
        (6) chunk types in webpack
            entry chunks
            normal chunks
            initial chunks
        (7) conclusion
    code splitting
        相比于 spit bundles, code splitting 可以实现按需加载
        (1) code splitting formats
            主要两种方式实现：（1.1）a dynamic import; （1.2）require.ensure. 初始化 payload 会更小。
            dynamic imports 还没进入官方声明。dynamic imports are defined as Promises.
        (2) setting up code splitting
            configuring babel
            defining a slit point using a dynamic import
        (3) code splitting in react
            服务端渲染时，不需要开启 code splitting。
        (4) disable code splitting
            use webpack.optimize.LimitChunkCountPlugin with maxChunks set to one.
        (5) conclusion
            可以提高首屏加载速度，提高用户体验；
            使用动态 import 语法，babel 和 eslint 都需要配置
            can be disabled
    tidying up
        cleaning the build Directory
            通过脚本实现：rm -rf ./build && webpack or rimraf ./build && webpack
            setting up CleanWebpackPlugin（https://www.npmjs.com/package/copy-webpack-plugin）
        attaching a revision to the build
            setting up BannerPlugin and GitRevisionPlugin
            BannerPlugin: attaching information related to the current build revision to the build files for debugging.
            GitRevisionPlugin: generate a small comment at the beginning of the generated files.
        coping files
            copy individual files or entire directories, which already exist, to the build directory.
    conclusion
        提高构建体验和效率：
            开发阶段：添加 source-map 方便调试
            上线阶段：使用 splitting chunks 和 code splitting，提高首屏加载时间，提高用户体验
            构建完成后：cleanWebpackPlugin 清空之前构建文件
6、optimizing
    实现更优的生产构建
    minifying
        webpack 生产模式已经实现内部压缩，通过 terser(A JavaScript parser and mangler/compressor toolkit for ES6+) 组件，uglify 已不再维护。
        (1) minifying js
            安全压缩转换就是通过重写变量，或者取出不会被执行的代码。
            modifying js minification process
                webpack4 中通过 optimization.minimize 和 optimization.minimizer 来配置压缩.
        other ways to minify js
            其他方式压缩 js 代码
        speed up js execution
            preprocess code so that it will run faster
            (a) scope hoisting
                hoist all modules to a single scope instead of writing a separate closure for each.
                这降低了构建速度，但是会执行更快
            (b) pre-evaluation
                it rewrites computation that can be done compile-time and therefore speeds up code execution.
            (c) improving parsing
                enhances the way js code gets parsed initially.    
        (2) minifying html
            html-loader \ posthtml-loader \ posthtml-minifier
        (3) minifying CSS
            setting up css minification: OptimizeCSSAssetsPlugin
        (4) minifying Images
            reduce image size: img-loader, imagemin-webpack, imagemin-webpack-plugin.
            cache: cache-loader \ thread-loader
        (5) conclusion
            可压缩：js\html\css\image (主要通过 terser 插件实现)
    tree shaking
        es2015 中定义，the idea is that given it's possible to analyze the module definition statically without running it.
        (1) tree shaking on package level
            to get most out of tree shaking with external packages, we have to use babel-plugin-transform-imports to rewrite imports so that
            they work with webpack's tree shaking logic.
        (2) conclusion
            to benefit from tree shaking, npm packages have to be implemented using ES2015 module syntax.
    environment variables
        DefinePlugin enables replacing free variables so that you can convert if(process.env.NODE_ENV) kind of code to if(true) depending on environment.
        (1) The Basic Idea of DefinePlugin
            elimination is the core idea of DefinePlugin and it allows toggling
        (2) Setting process.env.NODE_ENV
            需使用 JSON.stringify 封装。
        (3) Choosing Which Module to Use
        (4) conclusion
            控制构建的时候应该加载哪部分资源
    adding hashes to fileNames
        cache invalidation can be achieved by including a hash to the filenames
        (1) placeholder
            webpack provides placeholders for this purpose
            [id]\[path]\[name]\[ext]\[hash]\[chunkhash]\[contenthash]
            attaching the hash to the filename is the most performance option
        (2) setting up hashing
        (3) conclusion
            主要给 css 和 js 文件加上 hash 值，常用：[name]\[ext]\[hash]\[chunkhash]
            如果使用了 MiniCssExtractPlugin，需要使用[contenthash]
            有一个问题就是：if you change the application code, it invalidates the vendor files as well! 提取 manifest 文件可以解决这个问题。
    separating a manifest
        webpack 打包会生成一个 manifest 文件。该文件描述了 webpack 该加载什么文件. it's possible to extract it and start loading the files of project faster instead
        of having to wait for vendor bundle to be loaded.
        如果 webpack 生成的 hash 发生变化，manifest 文件也会发生变化，然后，the contents of the vendor bundle change, and become invalidated. The problem can be eliminated
        by extracting the manifest to a file of its own or by writing it inline to the index.html of the project. 
        (1) extracting a manifest
            define optimization.runtimeChunk: {name: "manifest"}
        (2) using records
            进一步缓存策略
        (3) conclusion
    build analysis
        a good step to understanding webpack better
        configuring webpack
        Node api
            StatsWebpackPlugin and WebpackStatsPlugin
        enabling a performance budget
        available analysis tools
        Duplication analysis
        conclusion
    performance
7、output
    build targets
    multiple pages
    server side rendering
8、extending
    dynamic loading
    web workers
    internationaliztion
    testing
    deploying application
    consuming packages
9、extending
    extending with loaders
    extending with plugins
    
        
