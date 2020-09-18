// 本文件为 接口
// ts 的核心原则之一就是对值所具有的解构进行类型检查。接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function printLabel(labelledObj) {
    console.log(labelledObj.label, labelledObj.size); // 读取非目标类型属性会报错
}
var myObj = { size: 10, label: "Size 10 Object" }; // 可以多传入
printLabel(myObj);
var a3 = [1, 2, 3, 4];
var ro = a3;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a3 = ro; // error! 将 ro 重新赋值也不行，但是可以用类型断言重写
a3 = ro;
function createSquare(config) {
    // ...
}
var mySquare = createSquare({ colour: "red", width: 100 }); // 目标类型不存在，报错
var mySquare1 = createSquare({ width: 100, opacity: 0.5 }); // 绕开这些检查：使用类型断言
function createSquare1(config) {
    // ...
}
var mySquare2 = createSquare1({ colour: "red", width: 100 }); // 正确
var mySearch = function (arc, sub) {
    return 1 > 0;
};
var myArray = ["Bob", "Fred"];
var myStr = myArray[0];
// ts 支持两种索引签名：数字和字符串，但是数字索引的返回值必须是字符串索引返回值的子类型。因为 number 会先转换为 string 再去索引。
var Animal1 = /** @class */ (function () {
    function Animal1() {
    }
    return Animal1;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dog;
}(Animal1));
var square = {};
square.color = "blue";
square.sideLength = 10;
var square1 = {};
square1.color = "blue";
square1.sideLength = 10;
square1.penWidth = 5.0;
function getCounter() {
    var counter = function (start) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
var c2 = getCounter();
c2(10);
c2.reset();
c2.interval = 5.0;
// 10、接口继承类【todo】
