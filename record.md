1、

1、对象
1.1 属性类型
1.1.1 数据属性
1.1.2 访问器属性
1.2 定义多个属性
1.3 读取属性的特性
2、创建对象
2.1 工厂模式
2.2 构造函数模式
2.3 原型模式
2.3.1 原型对象
2.3.2 原型与 in 操作符
2.3.3 更简单的原型语法
2.3.4 原型的动态性
2.3.5 原生对象的原型
2.3.6 原型对象的问题
2.4 组合使用构造函数模式和原型模式
2.5 动态原型模式
2.6 寄生构造函数模式
2.7 稳妥构造函数模式
3 继承
3.1 原型链
3.1.1 默认原型
3.1.2 确认原型和实例的关系
3.1.3 谨慎地定义方法
3.1.4 原型链的问题
3.2 借用构造函数
3.3 组合继承
3.4 原型式继承
3.5 寄生式继承
3.6 寄生组合式继承
1、对象
无序属性的集合，属性可以包含基本值，对象，或者函数。是一组键值对，其值可以是数据或函数。
// 对象实例
var person = new Object();
person.name = 'a';
person.age = 10;

// 对象字面量
var person = {
    name: 'a',
    age: '10'
}


1.1 属性类型
内部值用两对方括号表示，如 [[Enumerable]]。
ECMAScript 有两种属性：
1.1.1 数据属性
数据属性有 4 个描述其行为的特性:
[[Configurable]]：表示能否通过 delete 删除属性，从而重新定义属性。
[[Enumerbale]]：表示能否通过 for-in 循环返回的属性。
[[Writable]]：表示能否修改属性的值。
[[Value]]：包含这个属性的数据值。
要修改属性默认的特性，必须使用 Object.defineProperty()
1.1.2 访问器属性
访问器属性不包含数据值；他们包含一对 getter 和 setter 函数。访问器属性包含如下 4 个属性：
[[Configurable]]：表示能否通过 delete 删除属性，从而重新定义属性。
[[Enumerbale]]：表示能否通过 for-in 循环返回的属性。
[[Get]]：在读取属性时调用的函数。默认返回 undefined。
[[Set]]：在写入属性时调用的函数。默认返回 undefined。
访问器属性不能直接定义，必须使用 Object.defineProperty() 来定义。
1.2 定义多个属性
1.3 读取属性的特性

2、创建对象
使用 Object 或对象字面量创建对象的方法创建很多对象时，会产生大量重复的代码。而使用工厂模式可以解决这个问题。
2.1 工厂模式
function createPerson (name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.sayName = function () {
        alter(this.name);
    }
    return o;
}
var p1 = createPerson('a', 10);
var p2 = createPerson('b', 20);

解决了创建相似对象的问题，但是没有解决对象识别的问题。
2.2 构造函数模式
// 与工厂模式的差别：没有显示地创建对象、直接将属性和方法赋值给了 this 对象、没有 return 语句
function Person (name, age, job) {
    this.name = name;
    this.age = age;
    this.sayName = function () {
        alter(this.name);
    }
}
 var p1 = new Person('a', 10);
var p2 = new Person('b', 20);
// 创建实例必须使用 new 操作符，实际会经历以下 4 步：
// (1)创建一个新对象；
// (2)将构造函数的作用域赋给新对象；
// (3)执行构造函数中的代码；
// (4)返回新对象
var o = new Object();
Person.call(o, 'c', 30, 'nurse');  // todo不完整，用代码实现 new 操作

构造函数的主要问题是，每个方法都要在每个实例上重新创建一遍。
2.3 原型模式
每个函数都有一个 prototype （原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。使用原型对象的好处是可以让多有对象实例共享它所包含的属性和方法。
function Person () {}
Person.prototype.name = 'a';
Person.prototype.age = 29;
Person.prototype.job = 'soft engineer';
Person.prototype.sayName = function () {
    alert(this.name);
}
var p1 = new Person();
var p2 = new Person();
p1.sayName == p2.sayName; // true,两个函数指向了同一个函数

2.3.1 原型对象
新函数 Person 会有一个原型对象属性 prototype，prototype 又会有一个 constuctor 属性，constuctor 又会有一个指回 Person 的指针。
Person.protoType.constructor 指向 Person 函数
实例 p1 内部将包含一个指针指向构造函数 Person.prototype，而 p1 与 Person 间没有直接的关系

getPrototypeOd() 可以获取一个对象的原型。
Object.getPrototypeOf(p1) == person.prototype

读取对象属性先从实例本身开始搜索，然后开始搜索 原型对象。这是多个对象实例共享原型所保存属性和方法的基本原理。
hasOwnProperty 可以检测一个属性是否存在于实例中。 
2.3.2 原型与 in 操作符
in 操作符会在通过对象能够访问给定属性时返回 true。Object.keys 取出对象上所有可枚举属性。
2.3.3 更简单的原型语法
function Person () {}
Person.prototype = {
    name: 'a',
    job: 'soft engineer',
    sayName: function () {
        alert(this.name);
    }
}
// 该方法虽然更简单，但是 Person.prototype.constructor 属性不再指向 Person 了,
// 因为上面完全重写了 prototype,切断了实例与原型对象之间的额关系，可以通过以下方法设置回适当值
Person.prototype = {
    constructor: Person,
    name: 'a',
    job: 'soft engineer',
    sayName: function () {
        alert(this.name);
    }
}

2.3.4 原型的动态性
对原型对象所做的任何修改都能立即从实例上反映出来。
重写原型对象切断了现有原型与任何之前已经存在的对象实例之间的关系。
2.3.5 原生对象的原型
 String.prototype.startWith = function (text) {
     return this.indexOf(text);
 };

2.3.6 原型对象的问题
如果包含引用类型的属性，因为原型对象属性的共享属性，会导致不同实例共享同一个原型对象，如数组。
2.4 组合使用构造函数模式和原型模式
构造函数模式用于定义实例属性，原型模式定义方法和共享的属性。这样，每个实例都有会有自己的一份实例属性的副本，同时又共享着对方法的引用，最大限度地节省了内存。
function Person (name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ['m', 'n'];
}
Person.prototype = {
    constructor: Person,
    sayName: function () {
        alter(this.name);
    }
}
var p1 = new Person('a', 10, 'soft engineer');
var p2 = new Person('b', 20, 'doctor');

p1.firends.push('l');
alert(p1.friends); // m,n,l
alert(p2.friends); // m,n


2.5 动态原型模式
2.6 寄生构造函数模式
2.7 稳妥构造函数模式
没有公共属性，其方法不使用 this 对象。在安全环境中使用。
3 继承
主要依靠原型链来实现
3.1 原型链
构造函数、原型、实例之间的关系：每个构造函数都有一个原型对象，原型对象都有一个指向构造函数的指针。而实例都包含一个指向原型对象的内部指针。
原型链的基本概念：让原型对象等于另一个类型的实例，此时原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也包含一个指向另一个构造函数的指针。
function SuperType () {
    this.property = true;
}
SuperType.prototype.getSuperValue = function () {
    return this.property;
};

function SubType () {
    this.subProperty = false;
}
// 重写 prototype，SuperType 实例中所有属性和方法现在也存在于 SubTye 中
SubType.prototype = new SuperType(); 
SubType.prototype.getSubValue = function () {
    return this.subProperty;
};

var instance = new SubType();
alert(instance.getSuperValue); // true;


3.1.1 默认原型
所有函数的默认原型都是 Object 的实例，因此默认原型都会包含一个内部指针，指向 Object.prototype。素有自定义类型都会继承 toString()、valueOf() 等默认方法。
3.1.2 确认原型和实例的关系
第一种：通过 instanceof 
instance instanceOf Object; // true
instance instanceOf SuperType; // true

第二种：isPrototypeOf
Object.prototype.isPrototypeOf(instance); // true
SuperType.prototype.isPrototypeOf(instance); // true

3.1.3 谨慎地定义方法
给原型添加方法的代码一定要放在替换原型的语句之后。
3.1.4 原型链的问题
来自包含引用类型值的原型；
在创建子类型的实例时，不能向超类型的构造函数中传递参数。
3.2 借用构造函数
解决上述问题。思想：在子类型构造函数内部调用超类型构造函数。
function SuperType() {
    this.colors = ['red', 'blue', 'green'];
}
function SubType () {
    SuperType.call(this); // 继承了 SuperType
}

var instance1 = new SubType();
instance1.colors.push('black');
alert(instance1.colors); // red, blue, green, black

var insatance2 = new SubType();
alert(instance2.colors); // red, blue, green
// SubType 的每个实例都会有自己的 color 属性副本了

借用构造函数还可以传递参数
function SuperType(name) {
    this.name = name;
}
function SubType () {
    SuperType.call(this, 'nicholes'); // 继承了 SuperType,同时还传递了参数
    this.age = 10;
}

var instance1 = new SubType();
alert(instance1.name); // 'nicholes'
alert(instance1.age); // 'age'


3.3 组合继承
思路：使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。
避免了原型链和借用构造函数的缺陷，融合了它们的有点。
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function () {
    alert(this.name);
}

function SubType (name, age) {
    SuperType.call(this, name); // 继承属性
    this.age = age;
}

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
    alert(this.age);
}

var instance1 = new SubType('nicholes', 10);
instance1.colors.push('black');
alert(instance1.colors); // red, blue, green, black
instance1.sayName();
instance1.sayAge();

var instance2 = new SubType('greg', 20);
alert(instance2.colors); // red, blue, green
instance2.sayName();
instance2.sayAge();


3.4 原型式继承
Object.create()：第一个参数为用作新对象原型的对象；第二个参数为 新对象定义额外属性的对象。
包含引用类型的属性始终都会共享相应的值，就像原型模式
3.5 寄生式继承
创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真的是它做了所有工作一样返回对象。
function createAnother (original) {
    var clone = Object.create(original);
    clone.sayHi = function () {
        alert('hi');
    };
    return clone;
}
// 新对象拥有初始对象的属性和方法，还拥有自己的方法

3.6 寄生组合式继承
思想：通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。
