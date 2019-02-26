'use strict';

function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo.bind(obj); // 函数别名！
var a = "oops, glo" +
    "bal"; // a 是全局对象的属性
bar(); // "oops, g

/** this 版本 */
// function identify() {
//     return this.name.toUpperCase();
// }
//
// function speak() {
//     const greeting = "Hello, I'm " + identify.call( this );
//     console.log( greeting );
// }
//
// const me = {
//     name: "Kyle"
// };
//
// const you = {
//     name: "Reader"
// };
//
// identify.call( me ); // KYLE
// identify.call( you ); // READER
//
// speak.call( me ); // Hello, I'm KYLE
// speak.call( you ); // Hello, I'm READER


/** 简化版 */
// function identify(context: { name: string }): string {
//     return context.name.toUpperCase();
// }
// const speak = (context: { name: string }) => {
//     const greeting = "Hello, I'm " + identify( context );
//     console.log( greeting );
// };
// const me = {
//     name: "Kyle"
// };
// const you = {
//     name: "Reader"
// };
// console.log(identify( you )); // READER
// speak( me ); // Hello, I'm KYLE

/** this 传递对象更优雅，api 更简洁*/
