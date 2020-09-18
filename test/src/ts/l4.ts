// ----- 类型推论：类型是在哪里如何被推断的
window.onmousedown = function (mouseEvent) {
  console.log(mouseEvent.button);  //<- Error
};

// ----- 类型兼容性：暂时理解为不同类型变量之间可不可以相互赋值
// 1、对象类型：
interface Named {
  name: string
}
let x1: Named;
let y1 = { name: "Alice", location: "Seattle" };
x1 = y1; // 编译器会先检查 x1 中的每个属性，看能否在 y1 中也能找到对应属性。所以此处是赋值正确

// 2、比较两个函数: 主要看入参函数和函数返回值类型的从属关系
// 示例1
let x2 = (a: number) => 0;
let y2 = (b: number, s: string) => 0;
y2 = x2; // ok，因为 x2 的参数 y2 中都有
x2 = y2; // error
// 示例2
let x3 = () => ({ name: 'Alice' });
let y3 = () => ({ name: 'Alice', location: 'Seattle' });
x3 = y3; // OK
y3 = x3; // Error, because x3() lacks a location property
// 可选参数和剩余参数、函数重载

// 3、枚举：枚举类型与数字类型兼容，并且数字类型与枚举类型兼容。不同枚举类型之间是不兼容的。比如：
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };
let status1 = Status.Ready;
status1 = Color.Green // 不同枚举类型之间是不兼容的
let status2 = 3;
status2 = Status.Ready; // 数字类型与枚举类型是兼容的

// 4、类：类有静态部分和实例部分的类型，比较两个类类型时，只有实例的成员会被比较。静态成员和构造函数不在比较的范围内，而私有成员和受保护成员需要比较
class Animal4 {
  feet: number;
  constructor(name: string, numFeet: number) { }
}
class Size {
  feet: number;
  constructor(numFeet: number) { }
}
let a2: Animal4;
let s2: Size;
a2 = s2;  // OK
s2 = a2;  // OK

// 5、泛型
// 行得通版本
interface Empty<T> {
}
let x4: Empty<number>;
let y4: Empty<string>;
x4 = y4;  // OK, because y4 matches structure of x4

// 行不通版本：
interface NotEmpty<T> {
  data: T;
}
let x5: NotEmpty<number>;
let y5: NotEmpty<string>;
x5 = y5;  // Error, because x5 and y5 are not compatible

// ----- symbols

// ----- 迭代器和生成器