/** 输出于输入类型一致 */
function identity<T>(arg: T): T { // 定义 T，
    return arg;
}
let output = identity("myString");
let myIdentity: <U>(arg: U) => U = identity; // 不同的泛型参数名

/** 使用泛型变量 */
function loggingIdentity<T>(arg: T[]): T[] {
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

function loggingIdentity1<T extends Lengthwise>(arg: T): T { // 定义了约束条件就只能传满足约束条件的入参了
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

/** 在泛型约束中使用类型参数 */
/** 在泛型里使用类类型 */
