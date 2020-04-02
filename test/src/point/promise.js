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
/* class MyPromise0 {
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
}); */

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

/* const p3 = new MyPromise1((resolve) => {
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
}); */

/* 四、值穿透 & 状态已变更的情况
    1、值穿透：如果 then 方法接收的不是 function，则忽略
    2、处理状态为 resolve\reject 的情况：有些时候 resolve、reject 方法在 then 之前就被执行，
        比如 Promise.resolve().then(),此时执行 then 则不会执行回调函数
*/
class MyPromise2 {
    constructor(executor) { // 接收回调
        this._status = PENDING;
        this._value = undefined;
        this._resolveList = [];
        this._rejectList = [];

        const _resolve = (res) => {
            const run = () => {
                if (this._status !== PENDING) { // 状态只能从 pending -> fulfilled、pending -> rejected
                    return;
                }
                this._status = FULFILLED;
                this._value = res;
                while(this._resolveList.length > 0) {
                    const callback = this._resolveList.shift();
                    callback(res);
                }
            };
            setTimeout(run);
        };
        const _reject = (err) => {
            const run = () => {
                if (this._status !== PENDING) {
                    return;
                }
                this._status = REJECTED;
                this._value = err;
                while(this._rejectList.length > 0) {
                    const callback = this._rejectList.shift();
                    callback(err);
                }
            };
            setTimeout(run);
        };
        executor(_resolve, _reject);
    }

    then = (resolveFn, rejectFn) => {
        typeof resolveFn !== 'function' ? resolveFn = value => value : null;
        typeof rejectFn !== 'function' ? rejectFn = value => value : null;

        return new Promise((resolve, reject) => {
            const fulfilledFn = value => {
                try {
                    const result =  resolveFn(value);
                    result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                } catch(err) {
                    reject(err);
                }
            };
            const rejectedFn = value => {
                try {
                    const result =  rejectFn(value);
                    result instanceof Promise ? result.then(resolve, reject) : resolve(result);
                } catch(err) {
                    reject(err);
                }
            };
            switch(this._status) {
                case PENDING:
                    this._resolveList.push(fulfilledFn);
                    this._rejectList.push(rejectedFn);
                    break;
                // 当状态已经变成 resolve/reject 时，直接执行 then 回调
                case FULFILLED:
                    fulfilledFn(this._value);
                    break;
                case REJECTED:
                    rejectedFn(this._value);
                    break;
            }
            
        });
    }
    catch = () => {
        return this.then(undefined, rejectFn);
    }
    finally = (callback) => {
        return this.then(
            value => MyPromise2.resolve(callback()).then(() => value),
            err => MyPromise2.resolve(callback()).then(() => { throw err })
        )
    }

    static resolve(value) {
        if (value instanceof MyPromise2) return value;
        return new MyPromise2(resolve => resolve(value));
    }
    static all(promiseArr) {
        let index = 0, result = [];
        return new MyPromise2((resolve, reject) => {
            promiseArr.forEach((p, i) => {
                MyPromise2.resolve(p).then(value => {
                    index++;
                    result[i] = value;
                    if (index === promiseArr.length) {
                        resolve(result);
                    }
                }, err => {
                    reject(err);
                })
            })
        })
    }
    static race() {
        return new MyPromise2((resolve, reject) => {
            for(let p of promiseArr) {
                Promise.resolve(p).then(value => {
                    resolve(value);
                }, err => {
                    reject(err);
                })
            }
        })
    }
}
const p4 = new MyPromise2((resolve) => {
    resolve(1);
}).then((res) => {
    console.log(res);
    return 2;
}).then()
.then((res) => {
    console.log(res);
    return 3;
}).then((res) => {
    console.log(res);
    throw new Error('error message');
}).then(() => {}, err => {
    console.log(err);
})

