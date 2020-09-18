
// 本文件为 接口
// ts 的核心原则之一就是对值所具有的解构进行类型检查。接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

// 1、接口初探
// function printLabel(labelledObj: { label: string }) {
//     console.log(labelledObj.label);
// }
// 或者直接定义成接口
interface LabelledValue { // LabelledValue 接口描述了入参的要求
    label: string;
}
function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label, labelledObj.size); // 读取非目标类型属性会报错
}

let myObj = { size: 10, label: "Size 10 Object" }; // 可以多传入
printLabel(myObj);

// 2、可选属性
interface SquareConfig {
    color?: string;
    width?: number;
}

// 3、只读属性：定义前加 readonly
interface Point { // 示例
    readonly x: number;
    readonly y: number;
}

let a3: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a3;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a3 = ro; // error! 将 ro 重新赋值也不行，但是可以用类型断言重写
a3 = ro as Array<number>

// 4、额外的属性检查
interface SquareConfig {
    color?: string;
    width?: number;
}
function createSquare(config: SquareConfig): void {
    // ...
}
let mySquare = createSquare({ colour: "red", width: 100 }); // 目标类型不存在，报错
let mySquare1 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig); // 绕开这些检查：使用类型断言

// 最佳方案是添加字符串索引签名，如下：
interface SquareConfig1 {
    color?: string;
    width?: number;
    [propName: string]: any
}
function createSquare1(config: SquareConfig1): void {
    // ...
}
let mySquare2 = createSquare1({ colour: "red", width: 100 }); // 正确

// 5、函数类型
// 接口能够描述 js 中对象拥有的各种各样的外形。除了描述带有属性的普通对象外，接口也可以描述函数类型
interface SearchFunc { // 使用接口表示函数类型，定义一个调用签名
    (source: string, subString: string): boolean
}
let mySearch: SearchFunc = function (arc: string, sub: string): boolean { // 函数会逐个进行检查
    return 1 > 0;
}

// 6、可索引的类型
// 可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型
interface StringArray {
    [index: number]: string;
}
let myArray: StringArray = ["Bob", "Fred"];
let myStr: string = myArray[0];

// ts 支持两种索引签名：数字和字符串，但是数字索引的返回值必须是字符串索引返回值的子类型。因为 number 会先转换为 string 再去索引。
class Animal1 {
    name: string;
}
class Dog extends Animal1 {
    breed: string;
}
// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
    [x: number]: Animal1; // 数字类型必须是字符串类型的子集，交换过来就 ok 了
    [x: string]: Dog;
}
interface Okay {
    [x: number]: Dog;
    [x: string]: Animal1;
}

// 7、类类型【TODO】
// 8、继承接口
interface Shape {
    color: string
}
interface Square extends Shape {
    sideLength: number
}
let square = <Square>{}
square.color = "blue"
square.sideLength = 10;

// 一个接口还可以同时继承多个接口
interface PenStroke {
    penWidth: number
}
interface Square1 extends Shape, PenStroke {
    sideLength: number
}
let square1 = <Square1>{};
square1.color = "blue";
square1.sideLength = 10;
square1.penWidth = 5.0;

// 9、混合类型
// 有时希望一个对象可以同时具有多种类型，如一个对象可以同时作为函数和对象使用，并带有额外的属性
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { }; // 定义一个函数
    counter.interval = 123; // 给函数添加属性，可看编译之后的结果
    counter.reset = function () { };
    return counter;
}

let c2 = getCounter();
c2(10);
c2.reset();
c2.interval = 5.0;

// 10、接口继承类【todo】
