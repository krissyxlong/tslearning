/** 数字枚举 */
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
console.log('Direction:', Direction);

/** 字符串枚举 */
enum Direction1 {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
console.log('Direction1:', Direction1);

/** 异构枚举: 混合数字和字符串枚举 */
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
console.log('BooleanLikeHeterogeneousEnum:', BooleanLikeHeterogeneousEnum);

/** 计算的和常亮成员：用常量枚举表达式初始化*/
enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
}
console.log('FileAccess:', FileAccess);

/** 联合枚举与枚举成员的类型 */
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

let c1: Circle = {
    kind: ShapeKind.Circle,
    //    ~~~~~~~~~~~~~~~~ Error!
    radius: 100,
};
console.log('c1:', c1);


/** 运行时的枚举 */
/** 反向映射: 数字枚举成员具有反向映射 */
/** const 枚举 */
/** 外部枚举 */
