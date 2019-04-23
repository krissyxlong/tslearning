/******************** 基础类型 *******************/
// 类型断言

// Object

// void\null\undefined\never

// any：
let notSure: any = 4;
let list: any[] = [1, true, "free"];

// 枚举 enum：对 js 数据类型的一个补充，可以为一组数值赋予友好的名字
// (暂时理解成可以 key、value 颠倒的对象)
enum Color {Red, Green, Blue}
// enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
console.log('Color:', Color);

// 元组 Tuple: 表示一个已知元素数量和类型的数组，各元素的类型不必相同
let x: [string, number];
x = ['hello', 10]; 