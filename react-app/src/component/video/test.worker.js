// import('./videoconverter.worker.js/build/ffmpeg.js');
// importScripts('videoconverter');
import './1.worker.js';

console.log('in worker');
// 接收主线程消息

function print(text) {
    postMessage({
        'type' : 'stdout',
        'data' : text
    });
}

self.onmessage = function(event) {
    const module = {
        files: event.data.files || [],
        arguments: event.data.arguments || [],
        print: print,
        printErr: print
    };
    postMessage({
        'type' : 'start',
        'data' : module.arguments
    });
    const startTime = new Date();
    // const result = ffmpeg_run(module);
    const costTime = new Date() - startTime;
    postMessage({
        'type' : 'done',
        // 'data' : result,
        time: costTime
    });
};

postMessage({
    'type' : 'ready'
});

onmessage = (event) => {
    console.log('子线程接收：', event);
};

self.postMessage('test');
