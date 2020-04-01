console.log('in promise');
/* 一、promise 简单示例 *******************/
/* 观察者模式：then 收集依赖、resolve 触发通知、依赖执行 */
/* const p1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('a');
    }, 1000);
}).then((res) => {
    console.log(res);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('b');
        }, 1000);
    });
}).then((res) => {
    console.log(res);
    return 'c'; // 需要把 then 方法的返回值包装成 promise
}).then(res => {
    console.log(res);
}); */

/* 二、自制简易版 promise ********************/
class MyPromise0 {
    constructor(executor) {
        this._resolveList = [];
        this._rejectList = [];

        const _resolve = (res) => {
            while(this._resolveList.length > 0) {
                const resolve = this._resolveList.shift();
                resolve(res);
            }
        };
        const _reject = (err) => {
            while(this._rejectList.length > 0) {
                const reject = this._rejectList.shift();
                reject(err);
            }
        };
        executor(_resolve, _reject);
    }

    then = (resolve, reject) => {
        this._resolveList.push(resolve);
        this._rejectList.push(reject);
    }
}

const p2 = new MyPromise0((resolve) => {
    setTimeout(() => {
        resolve(22);
    }, 1000);
}).then((res) => {
    console.log(res);
});

/* 三、加状态值与 then 方法
    promise 规则：
    1、三种状态：pending\fulfilled\rejected，pending -> fulfilled、pending -> rejected
    2、then 方法接收两个可选参数，分别对应状态改变时触发的回调；then 方法返回 promise 对象；then 可以被同一个 promise 调用多次
*/
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise1 {
    constructor(executor) { // 接收回调
        this._status = PENDING;
        this._resolveList = [];
        this._rejectList = [];

        const _resolve = (res) => {
            if (this._status !== PENDING) { // 状态只能从 pending -> fulfilled、pending -> rejected
                return;
            }
            this._status = FULFILLED;
            while(this._resolveList.length > 0) {
                const callback = this._resolveList.shift();
                callback(res);
            }
        };
        const _reject = (err) => {
            if (this._status !== PENDING) {
                return;
            }
            this._status = REJECTED;
            while(this._rejectList.length > 0) {
                const callback = this._rejectList.shift();
                callback(err);
            }
        };
        executor(_resolve, _reject);
    }

    then = (resolveFn, rejectFn) => {
        return new Promise((resolve, reject) => {
            const fulfilledFn = value => {
                try {
                    const result =  resolveFn(value);
                    result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                } catch(err) {
                    reject(err);
                }
            };
            this._resolveList.push(fulfilledFn);
            const rejectFn = value => {
                try {
                    const result =  rejectFn(value);
                    result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                } catch(err) {
                    reject(err);
                }
            };
            this._rejectList.push(rejectFn);
        });
    }
}

const p3 = new MyPromise1((resolve) => {
    setTimeout(() => {
        resolve('a');
    }, 1000);
}).then((res) => {
    console.log(res);
    return 'b';
}).then((res) => {
    console.log(res);
    return 'c'; // 需要把 then 方法的返回值包装成 promise
}).then(res => {
    console.log(res);
});

/* 四、值穿透 & 状态已变更的情况
    1、值穿透：如果 then 方法接收的不是 function，则忽略
    2、处理状态为 resolve\reject 的情况：有些时候 resolve、reject 方法在 then 之前就被执行，
        比如 Promise.resolve().then()
*/
class MyPromise2 {
    constructor(executor) { // 接收回调
        this._status = PENDING;
        this._resolveList = [];
        this._rejectList = [];

        const _resolve = (res) => {
            if (this._status !== PENDING) { // 状态只能从 pending -> fulfilled、pending -> rejected
                return;
            }
            this._status = FULFILLED;
            while(this._resolveList.length > 0) {
                const callback = this._resolveList.shift();
                callback(res);
            }
        };
        const _reject = (err) => {
            if (this._status !== PENDING) {
                return;
            }
            this._status = REJECTED;
            while(this._rejectList.length > 0) {
                const callback = this._rejectList.shift();
                callback(err);
            }
        };
        executor(_resolve, _reject);
    }

    then = (resolveFn, rejectFn) => {
        return new Promise((resolve, reject) => {
            const fulfilledFn = value => {
                try {
                    const result =  resolveFn(value);
                    result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                } catch(err) {
                    reject(err);
                }
            };
            this._resolveList.push(fulfilledFn);
            const rejectFn = value => {
                try {
                    const result =  rejectFn(value);
                    result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                } catch(err) {
                    reject(err);
                }
            };
            this._rejectList.push(rejectFn);
        });
    }
}

const p3 = new MyPromise1((resolve) => {
    setTimeout(() => {
        resolve('a');
    }, 1000);
}).then((res) => {
    console.log(res);
    return 'b';
}).then((res) => {
    console.log(res);
    return 'c'; // 需要把 then 方法的返回值包装成 promise
}).then(res => {
    console.log(res);
});

