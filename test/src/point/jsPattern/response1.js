const p1 = new Promise((resolve, reject) => {
  console.log('create a promise');
  resolve('成功了');
})
const p2 = p1.then(data => {
  console.log(data)
  throw new Error('失败了')
})
const p3 = p2.then(data => {
  console.log('success', data)
}, err => {
  console.log('faild', err)
})
/* promise 特征：
1、有三个状态：pending、fulfilled、rejected，默认为 pending。状态变化只能从 pending 到 rejected 或 pending 到 fulfilled
2、new promise 入参为 executor()
3、executor() 接收两个参数：resolve\reject
4、promise 有 value 保存成功状态值、reason 保存失败状态值
5、then 方法接收两个参数，onFulfilled(参数为 value)、onRejected(参数为 reason)
6、如果 then 抛出异常，则把异常作为参数传递给下一个 then 的 onRejected
 */
// 一、然后勾勒出如下雏形
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
class MyPomise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    // 调用此方法就是成功
    let resolve = (value) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if(this.status ===  PENDING) {
        this.status = FULFILLED;
        this.value = value;
      }
    }

    // 调用此方法就是失败
    let reject = (reason) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if(this.status ===  PENDING) {
        this.status = REJECTED;
        this.reason = reason;
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
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
}
/* 以上只能处理同步 promise，不能处理异步 Promise */

/* 二、支持异步执行 */
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
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
    if (this.status === PENDING) {
      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      });

      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onRejectedCallbacks.push(()=> {
        onRejected(this.reason);
      })
    }
  }
}

const p = new MyPomise((resolve, rejected) => {
  setTimeout(() => {
    resolve('成功');
  },1000);
}).then((res) => {
  console.log(res);
}, (err) => {
  console.log(err);
})

/* 链式调用和值的穿透 */