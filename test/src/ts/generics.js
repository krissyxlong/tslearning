/** 输出于输入类型一致 */
function identity(arg) {
    return arg;
}
var output = identity("myString");
var myIdentity = identity; // 不同的泛型参数名
/** 使用泛型变量 */
function loggingIdentity(arg) {
    // 泛型函数loggingIdentity，接收类型参数T和参数arg，它是个元素类型是T的数组，并返回元素类型是T的数组
    console.log(arg.length); // Array has a .length, so no more error
    return arg;
}
/** 泛型类 */
var GenericNumber = /** @class */ (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
function loggingIdentity1(arg) {
    console.log(arg.length); // Now we know it has a .length property, so no more error
    return arg;
}
/** 在泛型约束中使用类型参数 */
/** 在泛型里使用类类型 */
