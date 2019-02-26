/** 数字枚举 */
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
console.log('Direction:', Direction);
/** 字符串枚举 */
var Direction1;
(function (Direction1) {
    Direction1["Up"] = "UP";
    Direction1["Down"] = "DOWN";
    Direction1["Left"] = "LEFT";
    Direction1["Right"] = "RIGHT";
})(Direction1 || (Direction1 = {}));
console.log('Direction1:', Direction1);
/** 异构枚举: 混合数字和字符串枚举 */
var BooleanLikeHeterogeneousEnum;
(function (BooleanLikeHeterogeneousEnum) {
    BooleanLikeHeterogeneousEnum[BooleanLikeHeterogeneousEnum["No"] = 0] = "No";
    BooleanLikeHeterogeneousEnum["Yes"] = "YES";
})(BooleanLikeHeterogeneousEnum || (BooleanLikeHeterogeneousEnum = {}));
console.log('BooleanLikeHeterogeneousEnum:', BooleanLikeHeterogeneousEnum);
/** 计算的和常亮成员：用常量枚举表达式初始化*/
var FileAccess;
(function (FileAccess) {
    // constant members
    FileAccess[FileAccess["None"] = 0] = "None";
    FileAccess[FileAccess["Read"] = 2] = "Read";
    FileAccess[FileAccess["Write"] = 4] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
    // computed member
    FileAccess[FileAccess["G"] = "123".length] = "G";
})(FileAccess || (FileAccess = {}));
console.log('FileAccess:', FileAccess);
/** 联合枚举与枚举成员的类型 */
var ShapeKind;
(function (ShapeKind) {
    ShapeKind[ShapeKind["Circle"] = 0] = "Circle";
    ShapeKind[ShapeKind["Square"] = 1] = "Square";
})(ShapeKind || (ShapeKind = {}));
var c1 = {
    kind: ShapeKind.Circle,
    //    ~~~~~~~~~~~~~~~~ Error!
    radius: 100,
};
console.log('c1:', c1);
/** 运行时的枚举 */
/** 反向映射: 数字枚举成员具有反向映射 */
/** const 枚举 */
/** 外部枚举 */
