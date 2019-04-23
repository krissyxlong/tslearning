/** 类型推论：类型在哪里如何被推断的 */

/** 在有些没有明确指出类型的地方，类型推论会帮助提供类型  */
/** 最佳通用类型 */
/** 上下文类型：发生在表达式的类型与所处的位置相关时 */

/** 高级类型*/
/* 一、交叉类型：将多个类型合并为一个类型。大多数是在混入或其他不适合典型面向对象的地方看到交叉类型的使用 */
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
        // ...
    }
}
const jim = extend(new Person("Jim"), new ConsoleLogger());
const n = jim.name;
jim.log();

/* 联合类型：一个值可以是几种类型之一，用 | 分隔 */
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // returns "    Hello world"


// 类型保护与区分类型
// 用户自定义的类型保护
// typeof 类型保护
// instanceof 类型保护
// 可以为 null 的类型
// 可选参数和可选属性
// 类型保护与类型断言
