
一、类的简介
1、类的由来
2. 定义类
3、constructor
4、类的实例
5、存值函数与取值函数
6、注意点
二、静态方法
三、实例属性的新写法
四、静态属性
五、私有属性和私有方法
六、new.target 属性
七、类的继承
1、简介
2、Object.getPrototypeOf
3、super 关键字
4、类的 prototype 属性和 __proto__ 属性
5、原生构造函数的继承
6、Mixin 的实现
一、类的简介
1、类的由来
es5 通过构造函数生成实例对象：
function Point(x, y) { // es5 构造函数 Point 对应 es6 的 Point 类的构造方法
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function () {
    return this.x + this.y;
}
var p = new Point()


es6 类：（构造函数的另一种写法，类的数据类型就是函数，类本身就指向构造函数？使用方法和构造函数一样，用 new）。
class Point {
    constructor(x, y) { // 实例属性
        this.x = x;
        this.y = y;
    };
    toString () { // 原型属性。类的方法相当于定义在类的 prototype 属性上
        return this.x + this.y;
    }
}

typeof Point // function
Point = Point.prototype.constructor;
var p = new Point(); // 实例化

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false，原型属性

Object.keys(Point) // []; 因为类内部定义的方法都是不可枚举的


2. 定义类
2.1 类声明
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

2.2 类表达式
可以通过 name 属性读取类名称
与 function 的区别是，class 不存在变量提升，而函数声明存在变量提升。
// unnamed
let Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle"

// named
let Rectangle = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle2"


严格模式
定义原型方法

3、constructor
用 class 创建和初始化的对象都会有一个默认的 constructor 方法。
默认返回实例对象，即 this。

4、类的实例
同 ES5，使用 new 命令。
const p = new Point();


hasOwnProperty：返回实例属性，不返回原型属性for...in：Object.keys：返回可枚举属性

5、存值函数与取值函数
class myClass {
    constructo();
    
    get prop () {
        return getter;
    }
    
    set prop (value) {
        console.log('setter ' + value);
    }
}

const c = new myClass();
c.prop = '123'; // 'getter'
c.prop; // setter 123


6、注意点
（1）类和模块内部默认都是 ‘use strict’ 模式；
（2）不存在变量提升
（3）name 属性返回跟在 class 后面的名字
（4）this 指向：使用 bind、使用 箭头函数、使用 proxy

二、静态方法
静态方法访问不需要实例化 class，在实例化对象上访问不到 static 方法。可以从 super 对象上调用。
static method used to create utility functions for an application.
class Foo {
    static method() {
        return 'hello';
    }
}

class Bar extends Foo {
    static method(){
        return super.method() + 'too';
    }
}

const f1 = new Foo();
f1.method; // undefined
Bar.method(); // hello too


三、实例属性的新写法
// 1、定义在 constructor 方法的 this 上
class Foo {
    constructor() {
        this._count = 0;
    }
    increment () {
        this._count++;
    }
}

// 2、直接定义在类的最顶层
class Foo {
    constructor()
    _count = 0;
    increment () {
        this._count++;
    }
}


四、静态属性
// 老方法
class Foo {
}

Foo.prop = 1;

// 新方法
class Foo {
    static prop = 0;
}


五、私有属性和私有方法

六、new.target 属性
该属性一般作用于构造函数内，返回作用于的构造函数。如果构造函数不是通过 new 命令创建的，new.target 则返回 undefined。因此该属性可以判断构造函数是怎样被调用的。
function Person (name) {
    if (new.target !== undefined) {
        this.name = name;
    } else {
        throw new Error('构造函数必须由 new 命令创建')；
    }
}


七、类的继承
1、简介
class Point {
    consctructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class ColorPoint {
    constructor(x, y, color) {
        super(); // 子类在 constructor 方法中必须调用 super 方法，否则新建实例会报错。
        // 因为子类的 this 对象，必须通过父类的构造函数完成塑造，得到父类同样的属性和方法
        this.color = color;
    }
}


es5 的继承，实质是先创建子类的实例对象 this，然后将父类的属性和方法复制到 this 上（Parent.apply(this)）。
es6 的继承完全不同，它是先将父类实例对象的属性和方法加到 this 上（super 实现，所以必须先调用 super 方法），然后再用子类的构造函数修改 this 对象。
只有 super 方法才可以调用父类实例。

2、Object.getPrototypeOf
用来获取子类的父类对象

3、super 关键字
to access and call functions on an object's parent.
可以当做函数使用，也可以当做对象使用。
class A {}

// 当做函数调用时，代表父类的构造函数
class B {
    constructor() {
        super(); // 调用 A 的构造函数，但返回的是 B 的实例。相当于 A.prototype.contructor.call(this)
    }
}
// 当做对象使用时，指向父类的原型对象，所以可通过 super 获取父类原型对象上的属性和方法，但获取不到父类实例上的属性和方法。



4、类的 prototype 属性和 __proto__ 属性
class A {
}
class B extends A {
}

B.__proto__ === A;
B.prototype.__proto__ === A.prototype;


5、原生构造函数的继承
原生对象：Array、Object、Error、Boolean、Number、String、Date、Function、RegExp
以前这些构造函数是无法继承的。因为原生对象使用 apply，call 方法会直接生成一个新对象。
使用 es6 实现：
class MyArray extends Array {
    constructor(...args) {
        super(...args);
    }
}
const arr = new MyArray();
arr[0] = 1;
arr.length // 1


6、Mixin 的实现
Mixin 指的是多个对象合成一个对象，新对象具有各个组成成员的接口。一个简单实现：
const a = { ... };
const b = { ... };
const c = { ...a, ...b };

通用实现：
function mix(...mixins) {
  class Mix {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin()); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

function copyProperties (target, resource) {
    for (let key of Reflect.ownKeys(resource)) {
        if (
            key !== 'construcor' &&
            key !== 'prototype' &&
            key !== 'name'
        ) {
            let desc = Object.getOwnPropertyDescriptor(resource, key);
            Object.defineProperty(target, key, desc);
        }
    }
}


promise：异步执行结果
语法：new Promise(executor);
回到函数 executor 有两个入参：resolve、reject









