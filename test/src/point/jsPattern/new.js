/*
 * @Author: your name
 * @Date: 2020-03-07 17:51:08
 * @LastEditTime: 2020-03-16 11:28:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tslearning/react-app/src/component/alg/jsAlgorithms/index.js
 */
/**
 * @description: new 运算符操作原理
 * @param {object} 
 * @return: object
 */
var newFunc = () => {
    var obj = function () {};
    var Constructor = [].shift.call(arguments); // 取得外部传如的构造器
    obj.__prototype__ = Constructor.prototype;
    var ret = Constructor.appy(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
};

function Person(name) {
    this.name = name;
}

Person.prototype.getName = function() {
    return this.name;
}

var a = new Person('seven');
var b = newFunc(Person, 'seven');
console.log(1, a.getName());
console.log(2, b.getName());
