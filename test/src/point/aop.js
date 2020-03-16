/*
 * @Author: 切面编程：把一个函数动态切入到另一个函数中
 * @Date: 2020-03-16 17:05:05
 * @LastEditTime: 2020-03-16 17:25:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tslearning/test/src/point/aop.js
 */
Function.prototype.before = function(beforeFn) {
    var _self = this;
    return function() {
        console.log('执行 before')
        beforeFn.apply(this, arguments); // 执行新函数
        return _self.apply(this, arguments); // 执行原函数
    };
}

Function.prototype.after = function(afterFn) {
    var _self = this;
    return function() {
        var ret = _self.apply(this, arguments); // 执行原函数
        afterFn.apply(this, arguments); // 执行新函数
        return ret;
    };
}

var func = function() {
    console.log(2);
};
var final = func.before(function() {
    console.log(1);
}).after(function() {
    console.log(3);
})
final();