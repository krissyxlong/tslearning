import React, { useEffect } from 'react';
import Worker from './test.worker.js';

const worker = new Worker();
worker.onmessage = function (event) {
    console.log(55555555555);
};
worker.postMessage('aa')
console.log(222222, worker);


const Index = () => {
    useEffect(() => {

    });
    return <div>hehehe</div>;
};

export default Index;
