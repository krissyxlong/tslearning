/** 公共、私有与受保护的修饰符：
 * 默认为 public,标记为 private 时，不能在声明它的类的外部访问。
 * 类型兼容：属性类型需一致
 * protected:可以在派生类中访问。构造函数也可以被标记成 protected，此时，该类可以被实例化，但是能被继承 */
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
// 1、类
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter1 = new Greeter("world");
// 2、继承
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log("Animal moved " + distanceInMeters + "m.");
    };
    return Animal;
}());
var Dog2 = /** @class */ (function (_super) {
    __extends(Dog2, _super);
    function Dog2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog2.prototype.bark = function () {
        console.log('Woof! Woof!');
    };
    return Dog2;
}(Animal));
var dog = new Dog2();
dog.bark();
dog.move(10);
dog.bark();
// 复杂版本: Snake 和 Horse 都继承了 Animal2，两个方法都重写了 Animal2 的 move 方法。
var Animal2 = /** @class */ (function () {
    function Animal2(theName) {
        this.name = theName;
    }
    Animal2.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this.name + " moved " + distanceInMeters + "m.");
    };
    return Animal2;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    } // 在构造函数里访问 this 前需先执行 super 函数
    Snake.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        console.log("Slithering...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Snake;
}(Animal2));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 45; }
        console.log("Galloping...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Horse;
}(Animal2));
var sam = new Snake("Sammy the Python");
var tom = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);
// 3、公共、私有和受保护的修饰符
// 3.1 默认为 public，以上示例中均为 public 属性
// 3.2 理解 private：不能在声明它的类的外部访问
var Animal3 = /** @class */ (function () {
    function Animal3(theName) {
        this.name = theName;
    }
    return Animal3;
}());
new Animal3("Cat").name; // 错误: 'name' 是私有的.
// 类型兼容：不同类型实例是否可以相互赋值，见文档
// 4、protected：与 private 类似，但是 protected 在派生类中仍然可以访问，见文档示例
// 构造函数也可以被标记成 protected，这意味着这个类不能在包含它的类外被实例化，但是能被继承。
// 5、只读属性
// 6、存取器: 截取对对象成员的访问,只有 get 不带有 set 的存取器自动被推断为 readonly。
// 7、静态属性: 存在于类本身上，而不是类的实例上。
// 8、抽象类[未接触过，todo]
// 9、高级技巧
// 构造函数
var Greeter1 = /** @class */ (function () {
    function Greeter1(message) { // 重写了 Greeter 函数
        this.greeting = message;
    }
    Greeter1.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter1;
}());
var greeter2;
greeter2 = new Greeter1("world");
console.log(greeter2.greet());
// 把类当做接口使用
