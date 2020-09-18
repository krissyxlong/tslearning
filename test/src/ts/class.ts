

/** 公共、私有与受保护的修饰符：
 * 默认为 public,标记为 private 时，不能在声明它的类的外部访问。
 * 类型兼容：属性类型需一致
 * protected:可以在派生类中访问。构造函数也可以被标记成 protected，此时，该类可以被实例化，但是能被继承 */

// 1、类
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter1 = new Greeter("world");

// 2、继承
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}
class Dog2 extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}
const dog = new Dog2();
dog.bark();
dog.move(10);
dog.bark();

// 复杂版本: Snake 和 Horse 都继承了 Animal2，两个方法都重写了 Animal2 的 move 方法。
class Animal2 {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
class Snake extends Animal2 {
    constructor(name: string) { super(name); } // 在构造函数里访问 this 前需先执行 super 函数
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}
class Horse extends Animal2 {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}
let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

// 3、公共、私有和受保护的修饰符
// 3.1 默认为 public，以上示例中均为 public 属性
// 3.2 理解 private：不能在声明它的类的外部访问
class Animal3 {
    private name: string; // 定义私有属性
    constructor(theName: string) { this.name = theName; }
}
new Animal3("Cat").name; // 错误: 'name' 是私有的.
// 类型兼容：不同类型实例是否可以相互赋值，见文档

// 4、protected：与 private 类似，但是 protected 在派生类中仍然可以访问，见文档示例
// 构造函数也可以被标记成 protected，这意味着这个类不能在包含它的类外被实例化，但是能被继承。

// 5、只读属性
// 6、存取器: 截取对对象成员的访问,只有 get 不带有 set 的存取器自动被推断为 readonly。
// 7、静态属性: 存在于类本身上，而不是类的实例上。
// 8、抽象类[未接触过，todo]
// 9、高级技巧
class Greeter1 {
    greeting: string;
    constructor(message: string) { // 注意编译后构造函数的转变，
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter2: Greeter1;
greeter2 = new Greeter1("world");
console.log(greeter2.greet());

// 把类当做接口使用
class Point1 {
    x1: number;
    y1: number;
}

interface Point3d extends Point1 {
    z: number;
}

let point3d: Point3d = { x1: 1, y1: 2, z: 3 };

// 接口继承类、把类当做接口使用 ==> 两者可以相互使用