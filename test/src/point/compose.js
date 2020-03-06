/*
 * @Author: your name
 * @Date: 2020-03-06 17:16:36
 * @LastEditTime: 2020-03-06 18:02:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tslearning/test/src/point/compose.js
 */
/**
 * @description: 中间件测试：涉及洋葱模型
 * @param {array} arr: 中间件数组 
 * @return: 
 */

 // 中间件列表
const m1 = (next) => {
    console.log("in1");
    next();
    console.log("out1");
};
const m2 = (next) => {
    console.log("in2");
    next();
    console.log("out2");
};
const m3 = () => {
    console.log("in3");
    console.log("out3");
};

// 组合函数
const compose = (arr) => {
    return () => {
        const dispatch = (index) => {
            if (index === arr.length) {
                return;
            }
            const fn = arr[index];
            const next = () => dispatch(index + 1);
            return fn(next);
        };
        dispatch(0);
    };
};

// 支持异步版本，摘自 koa-compose
// const compose = (middleware) => {
//     return function (next) {
//         // last called middleware #
//         let index = -1
//         return dispatch(0)
//         function dispatch (i) {
//           if (i <= index) return Promise.reject(new Error('next() called multiple times'))
//           index = i
//           let fn = middleware[i]
//           if (i === middleware.length) fn = next
//           if (!fn) return Promise.resolve()
//           try {
//             return Promise.resolve(fn(dispatch.bind(null, i + 1)));
//           } catch (err) {
//             return Promise.reject(err)
//           }
//         }
//       }
// };

const composeFn = compose([m1, m2, m3]);
composeFn();