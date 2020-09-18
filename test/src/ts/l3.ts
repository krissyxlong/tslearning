// 本文件为 变量声明

// 1、var 声明和作用域：同一作用域中可以重复定义

// 2、let 声明：有块级作用域，声明之前是暂时性死区不可访问，ts 会报错提示

// 3、const 声明：同 let，但是不可修改，但是内部变量是可以修改的。ts 允许将对象的成员设置成只读的，如下：
interface Point {
  readonly x: number;
  readonly y: number;
}

// 4、解构
function f1([first, second]: [number, number]) { // 入参解构时的类型声明
  console.log(first);
  console.log(second);
}

const o = { a1: 'q', b1: 1 };
let { a1, b1 }: { a1: string, b1: number } = o; // 对象解构时的类型声明

// type C = { a: string, b?: number }
function f2({ a, b = 0 } = { a: "" }): void { // 解构默认值，稍复杂。。。
  console.log(a, b);
}
f2({ a: 'a' }) // ok, default b = 0;
f2() // ok:  default to {a: ""}，which when defaults b = 0
f2({}) // error：a is required if you supply an argument

// 5、展开: 与解构相反
// 展开限制：仅包含对象自身的可枚举属性，这样会丢失对象本身的方法。
class C {
  p = 12;
  m() {
  }
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error! 方法丢失