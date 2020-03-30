/*
 * @Author: your name
 * @Date: 2020-03-16 15:02:04
 * @LastEditTime: 2020-03-16 15:05:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tslearning/test/src/point/闭包.js
 */
var list = [1, 2, 3, 4, 5];
for (var i = 0; i < list.length; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000)
}

for (var i = 0; i < list.length; i++) {
    ((m) => {
        setTimeout(() => {
            console.log(m);
        }, 1000)
    })(i)
}