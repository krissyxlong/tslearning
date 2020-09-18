// learning enums
// ts 支持基于数字和基于字符串的枚举
/** 1、数字枚举 */
enum Direction {
    Up = 1, // 其余成员从 1 开始自动增长
    Down,
    Left,
    Right
}
console.log('Direction:', Direction);

/** 2、字符串枚举：每个成员都必须用字符串字面量，或另一个字符串枚举成员进行初始化。
 * 字符串枚举可以很好的序列化。
 */
enum Direction1 {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
console.log('Direction1:', Direction1);

/** 异构枚举: 混合数字和字符串枚举，正常不建议这么做 */
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
console.log('BooleanLikeHeterogeneousEnum:', BooleanLikeHeterogeneousEnum);

/** 枚举值为计算型的或常量成员*/
enum FileAccess { // 计算枚举
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
}
console.log('FileAccess:', FileAccess);

/** 联合枚举与枚举成员的类型：字面量枚举成员 */
enum ShapeKind {
    Circle,
    Square,
}

interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}

interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
}

/** 运行时的枚举【todo: 未理解应用场景】 */
/** 反向映射: 数字枚举成员具有反向映射 */
/** const 枚举 */
/** 外部枚举 */
