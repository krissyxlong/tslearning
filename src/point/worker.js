function createWorker(f) {
    let blob = new Blob(['(' + f.toString() +')()']);
    let url = window.URL.createObjectURL(blob);
    let worker = new Worker(url);
    return worker;
}

// worker
let pollingWorker = createWorker(function (e) {
    // 往主线程发消息
    setInterval(function () {
        self.postMessage('hello');
    }, 1000);

    // 接收主线程消息
    self.addEventListener('message', (e) => {
        self.postMessage('nonono');
    })

    // 内部关闭 woker
    setInterval(() => {
        self.close();
    }, 10000)
});

// 主线程接收消息
pollingWorker.onmessage = function (e) {
    console.log('data:', e.data);
    let $ele = document.getElementById('hi');
    let text = $ele.innerHTML;
    $ele.innerHTML = (text + e.data);
    // render data
}
// 主线程发送消息
pollingWorker.postMessage('init');

// 主线程终止 woker
setInterval(() => {
    pollingWorker.terminate();
}, 20000)
