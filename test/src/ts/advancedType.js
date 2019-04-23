/** 类型推论：类型在哪里如何被推断的 */
/** 在有些没有明确指出类型的地方，类型推论会帮助提供类型  */
/** 最佳通用类型 */
/** 上下文类型：发生在表达式的类型与所处的位置相关时 */
/** 高级类型*/
/* 一、交叉类型：将多个类型合并为一个类型。大多数是在混入或其他不适合典型面向对象的地方看到交叉类型的使用 */
function extend(first, second) {
    var result = {};
    for (var id in first) {
        result[id] = first[id];
    }
    for (var id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id];
        }
    }
    return result;
}
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function () {
        // ...
    };
    return ConsoleLogger;
}());
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
/* 联合类型：一个值可以是几种类型之一，用 | 分隔 */
function padLeft(value, padding) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error("Expected string or number, got '" + padding + "'.");
}
padLeft("Hello world", 4); // returns "    Hello world"
function getSmallPet() {
    console.log(111);
}
var pet = getSmallPet();
pet.layEggs(); // okay
// pet.swim();    // errors
