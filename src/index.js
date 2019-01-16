// 枚举 enum：对 js 数据类型的一个补充，可以为一组数值赋予友好的名字
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
// enum Color {Red = 1, Green = 2, Blue = 4}
var c = Color.Green;
console.log('Color:', Color);
// 元组 Tuple: 表示一个已知元素数量和类型的数组，各元素的类型不必相同
var x;
x = ['hello', 10];
