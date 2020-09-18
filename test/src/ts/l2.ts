// 本文件为基础类型定义

// 1、布尔值
let isDone: boolean = false;

// 2、数字
let d: number = 6;

// 3、字符串
let s: string = 'dawei';

// 4、数组
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// 5、元组 Tuple：允许一个已知元素数量和类型的数组，各类型不必相同。相关：联合类型【TODO】
let t1: [string, number] = ['heelo', 10];

// 6、枚举
enum E { red, green, blue }
console.log(E[1], E.green);

// 7、any: 当只知道一部分或者不知道数据类型的时候使用
let notSure: any = 4;

// 8、void：某种程度与 any 相反，它表示没有任何类型，如函数没有返回值时：
function fn1(): void {
  console.log('test');
}

// 9、null 与 undefined：本身意义不大，默认情况下是所有类型的子类型，但是当指定 ———strictNullChecks 时，它们只能赋值给自己或者 void
let u1: null = null;
let u2: undefined = undefined;

// 10、never：表示那些永不存在的值的类型。如：总是会抛出异常活根本不会有返回值的函数表达式活箭头函数表达式的返回值类型。
function e1(message: string): never {
  throw new Error(message);
}
function e2(): never {
  while (true) {
    // ...
  }
}

// 11、Object：使用 object 类型，可以更好的表示像 Object.create 这样的 api【todo: 未理解这句话】
declare function c1(o: object | null): void;
c1({ a: 1 }); // ok
c1(2); // Error

// 12、类型断言：有时你会比 ts 更了解某个值的详细信息。通过类型断言可以告诉编辑器，“相信我，我知道我在干什么”。主要有两种方式
let s1: any = 'hello world';
let sl1: number = (<string>s1).length; // 尖括号法
let sl2: number = (s1 as string).length; // as 语法
// jxs 语法中，只有 as 语法是被允许的