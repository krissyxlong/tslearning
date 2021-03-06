// 本文件为泛型学习
// 1、泛型之 hello world
// 使一个函数的输入与输出类型一致
function identity0(arg: any): any {
    return arg;
}
// 除了用 any 外还可以是用如下方法：使用类型变量，它是一种特殊的变量，只用于表示类型而不是值，可以跟踪函数里使用的类型信息。
function identity1<T>(arg: T): T { // 定义 T，
    return arg;
}
let output0 = identity1<string>("myString"); // 第一种直接指明参数类型
let output = identity1("myString"); // 第二种，更普遍，使用类型推论，即编译器会根据传入的参数自动地帮助我们确定 T 的类型
let myIdentity: <U>(arg: U) => U = identity1; // 不同的泛型参数名

/** 使用泛型变量 */
function loggingIdentity<T>(arg: T[]): T[] {
    // 泛型函数loggingIdentity，接收类型参数T和参数arg，它是个元素类型是T的数组，并返回元素类型是T的数组
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
// 这等价于
function loggingIdentity2<T>(arg: Array<T>): Array<T> {
    // 泛型函数loggingIdentity，接收类型参数T和参数arg，它是个元素类型是T的数组，并返回元素类型是T的数组
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}

/** 泛型类型 */
interface GenericIdentityFn { // 泛型接口
    <T>(arg: T): T;
}

/** 泛型类 */
class GenericNumber<T> { // 泛型类
    zeroValue: T;
    add: (x: T, y: T) => T;
}

/** 泛型约束 */
interface Lengthwise {
    length: number;
}

function loggingIdentity1<T extends Lengthwise>(arg: T): T { // 定义了约束条件就只能传满足约束条件的入参了：入参必须包含 length 属性
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

/** 在泛型约束中使用类型参数, 入参 key 只能是 obj 的键值 */
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

/** 在泛型里使用类类型：todo */
