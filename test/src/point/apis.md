安全：helmet、xss
监控：日志、服务内存性能，请求性能，异常报警
用户侧：post 请求、跨域

## helmet
Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!

## koa-bodyparser
解析请求 body

## koa2-cors
设置 Access-Control-Allow-Origin 头，

## 初始化 ctx 全局挂载函数
xss 过滤用户输入
日志：log4js
融合请求数据：
挂载 fetch 函数
挂载监控统计 monitor：根据请求api，统计api请求次数，请求请求时长，异常。prom-client，生成 node 服务的统计矩阵，有默认

