

/** 公共、私有与受保护的修饰符：
 * 默认为 public,标记为 private 时，不能在声明它的类的外部访问。
 * 类型兼容：属性类型需一致
 * protected:可以在派生类中访问。构造函数也可以被标记成 protected，此时，该类可以被实例化，但是能被继承 */


/** 继承 */
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); } // 调用 super()，它会执行基类的构造函数。
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
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

/** 存储器：通过 getter/setter 来截取对对象成员的访问 */
/** 静态属性 */
/** 抽象类：abstract */
/** 高级技巧 */
