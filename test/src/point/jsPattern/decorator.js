/* 一、传统面向对象语言的装饰者模式 */
// var Plane = function () { }
// Plane.prototype.fire = function () {
//   console.log('发射普通子弹');
// }
// // 接下来增加两个装饰类，分别是导弹和原子弹:
// var MissileDecorator = function (plane) {
//   this.plane = plane;
// }
// MissileDecorator.prototype.fire = function () {
//   this.plane.fire();
//   console.log('发射导弹');
// }
// var AtomDecorator = function (plane) {
//   this.plane = plane;
// }
// AtomDecorator.prototype.fire = function () {
//   this.plane.fire();
//   console.log('发射原子弹');
// }

// var plane = new Plane();
// plane = new MissileDecorator(plane);
// plane = new AtomDecorator(plane);
// plane.fire(); // 输出: 发射普通子弹、发射导弹、发射原子弹
/* 请求随着链条依次传递到所有的对象，每个对象都有处理这条请求的机会 */

/* js 装饰者模式：js 可以直接改写对象或对象的方法，并不需要使用“类”来实现装饰者模式 */
// var plane = {
//   fire: function () {
//     console.log('发射普通子弹');
//   }
// }
// var missileDecorator = function () {
//   console.log('发射导弹');
// }
// var atomDecorator = function () {
//   console.log('发射原子弹');
// }
// var fire1 = plane.fire;
// plane.fire = function () {
//   fire1();
//   missileDecorator();
// }
// var fire2 = plane.fire;
// plane.fire = function () {
//   fire2();
//   atomDecorator();
// }
// plane.fire();

/* 三、装饰函数
在不改动某个函数源代码的情况下，给该函数添加一些额外的功能
*/
// 初始版本
// var a = function () {
//   console.log(1);
// };
// // 改成
// var a = function () {
//   console.log(1);
//   console.log(2);
// }
// // 装饰者模式
// var a = function () {
//   console.log(1);
// };
// var _a = a;
// a = function () {
//   _a();
//   console.log(2);
// };
// a();

/* 装饰者模式 */
Function.prototype.before = function (beforefn) {
  var __self = this; // 保存原函数的引用
  return function () { // 返回包含了原函数和新函数的"代理"函数
    beforefn.apply(this, arguments); // 执行新函数，且保证 this 不被劫持，新函数接受的参数 // 也会被原封不动地传入原函数，新函数在原函数之前执行
    return __self.apply(this, arguments); // 执行原函数并返回原函数的执行结果， 2 // 并且保证 this 不被劫持
  }
}
Function.prototype.after = function (afterfn) {
  var __self = this;
  return function () {
    var ret = __self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  }
};
function mission() {
  console.log('业务逻辑');
}
var m1 = mission.before(function () {
  console.log('权限校验');
});
var m2 = mission.after(function () {
  console.log('日志上报');
});
// mission();
m2();

/* 以上方式污染了原型链，也可以使用如下方法实现 */
var before = function (fn, beforefn) {
  return function () {
    beforefn.apply(this, arguments);
    return fn.apply(this, arguments);
  };
};
var  a = before(
  function () {console.log(3) },
  function () { console.log(2)}
);
a = a();
/* 组装函数 */