// 往主线程发消息
setInterval(function () {
    self.postMessage('hello');
}, 1000);
console.log('in worker');
// 接收主线程消息
self.addEventListener('message', (e) => {
    console.log(1, e);
})

// 内部关闭 woker
setInterval(() => {
    self.close();
}, 10000)
