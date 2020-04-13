import React, { useEffect } from 'react';
import Worker from './test.worker.js'; // eslint-disable-line
const videoUrl = '';

let data;

const initWorker = async () => {
    const worker = new Worker();
    const outputElement = {};

    worker.onmessage = function (event) {
        const message = event.data;
        console.log('主线程接收：', event);
        if (message.type === 'ready') {
            outputElement.textContent = 'Loaded';
            worker.postMessage({
                files: [{
                    name: 'video',
                    data
                }],
                type: 'command',
                arguments: ['-help']
            })
        } else if (message.type === 'stdout') {
            outputElement.textContent += message.data + '\n';
        } else if (message.type === 'start') {
            outputElement.textContent = 'Worker has received command\n';
        }
        console.log('result:', outputElement);
    };
    // worker.postMessage('aa');
    // console.log(222222, worker);
};

const Index = () => {
    useEffect(() => {
        const getData = async () => {
            const res = await fetch(videoUrl, {
                mode: 'no-cors',
                withCredentials: true
            });
            data = await res.arrayBuffer(res);
            console.log(1111111, data);
        };
        getData();
    }, []);
    const startPlay = () => {
        initWorker();
    };
    return <div>
        <div>hehehe</div>
        <button onClick={startPlay}>开始转换</button>
    </div>;
};

export default Index;
