
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

/* 二、联合类型：一个值可以是几种类型之一，用 | 分隔 */
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

// 3、类型保护与区分类型：如果一个值是联合类型，我们只能访问此联合类型的所有类型里的共有成员
interface Bird {
    fly();
    layEggs();
}
interface Fish {
    swim();
    layEggs();
}
function getSmallPet(): Fish | Bird {
    let res: Bird = {
        fly() { },
        layEggs() { }
    };
    return res;
    // ...
}
let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors

// 类型保护与区分类型: 联合类型适合于那些可以为不同类型的情况。但想确切地了解是否为 Fish 时怎么办？用 if 判断
let pet1 = getSmallPet();
if ((<Fish>pet1).swim) {
    (<Fish>pet1).swim();
} else {
    (<Bird>pet).fly();
}
// 用户自定义的类型保护
function isFish(pet: Fish | Bird): pet is Fish {  // 返回一个类型谓词
    return (<Fish>pet).swim !== undefined;
}
if (isFish(pet)) { // 调用 isFish 时，ts 会将变量缩减为那个具体的类型
    pet.swim();
}
else {
    pet.fly();
}

// typeof 类型保护
// instanceof 类型保护
// 4、可以为 null 的类型
// 可选参数和可选属性
// 类型保护与类型断言
// 5、类型别名
6、字符字面量类型
7、数字字面量类型
8、枚举成员类型
9、可辨识联合
