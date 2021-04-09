const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
class MyPomise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    // 存放成功的回调
    this.onResolvedCallbacks = [];
    // 存放失败的回调
    this.onRejectedCallbacks= [];

    // 调用此方法就是成功
    let resolve = (value) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if(this.status ===  PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 依次将对应的函数执行
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    }

    // 调用此方法就是失败
    let reject = (reason) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if(this.status ===  PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    }

    try {
      // 立即执行，将 resolve 和 reject 函数传给使用者
      console.log('开始执行 executor');
      executor(resolve,reject)
    } catch (error) {
      // 发生异常时执行失败逻辑
      reject(error)
    }
  }
  
  then(onFulfilled, onRejected) {
    console.log('in then:', this.status, this.reason);
    const self = this;
    return new MyPomise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // onFulfilled(this.value);
        setTimeout(() => {
          try {
              //PromiseA+ 2.2.7.1
              let x = onFulfilled(sefl.value);
              resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
              //PromiseA+ 2.2.7.2
              reject(e);
          }
        });
      }
      if (this.status === REJECTED) {
        // onRejected(this.reason);
        setTimeout(() => {
          try {
              let x = onRejected(self.reason);
              resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
              reject(e);
          }
        });
      }
      if (this.status === PENDING) {
        // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
        this.onResolvedCallbacks.push(() => {
          // onFulfilled(this.value)
          setTimeout(() => {
            try {
                let x = onFulfilled(self.value);
                resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
                reject(e);
            }
          });
        });
  
        // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
        this.onRejectedCallbacks.push(()=> {
          // onRejected(this.reason);
          setTimeout(() => {
            try {
                let x = onRejected(self.reason);
                resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
                reject(e);
            }
          });
        })
      }
    })
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  let self = this;
  //PromiseA+ 2.3.1
  if (promise2 === x) {
      reject(new TypeError('Chaining cycle'));
  }
  if (x && typeof x === 'object' || typeof x === 'function') {
      let used; //PromiseA+2.3.3.3.3 只能调用一次
      try {
          let then = x.then;
          if (typeof then === 'function') {
              //PromiseA+2.3.3
              then.call(x, (y) => {
                  //PromiseA+2.3.3.1
                  if (used) return;
                  used = true;
                  resolvePromise(promise2, y, resolve, reject);
              }, (r) => {
                  //PromiseA+2.3.3.2
                  if (used) return;
                  used = true;
                  reject(r);
              });

          }else{
              //PromiseA+2.3.3.4
              if (used) return;
              used = true;
              resolve(x);
          }
      } catch (e) {
          //PromiseA+ 2.3.3.2
          if (used) return;
          used = true;
          reject(e);
      }
  } else {
      //PromiseA+ 2.3.3.4
      resolve(x);
  }
}

const p = new MyPomise((resolve, rejected) => {
  // resolve(123);
  setTimeout(() => {
    resolve('成功');
  },1000);
}).then((res) => {
  console.log(res);
}, (err) => {
  console.log(err);
})