/** bind: 创建一个新函数，指定 this 环境，并给函数传入参数序列：
 * function.bind(thisArg[, arg1[, arg2[, ...]]])
 * */

// 一、Creating a bound function
this.x = 9;    // this refers to global "window" object here in the browser
var module = {
    x: 81,
    getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX(); // 9
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81

// 二、Partially applied functions：预先指定初始入参(partial function)
function addArguments(arg1, arg2) {
    return arg1 + arg2
}
var result1 = addArguments(1, 2); console.log(result1); // 3
// Create a function with a preset first argument.
var addThirtySeven = addArguments.bind(null, 37);
var result2 = addThirtySeven(5); console.log(result2) // 37 + 5 = 42

/** apply：指定 this 值来调用函数，同时通过一个数组指定入参序列
 * function.apply(thisArg, [argsArray]) */
// 一、Using apply to append an array to another
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements); // push 不接受数组，该方法可一次 push 进一个数组
console.info(array); // ["a", "b", 0, 1, 2]

// 二、 Using apply and built-in functions
var numbers = [5, 6, 2, 3, 7];
var max = Math.max.apply(null, numbers);
console.info('max:', max); // Math.max 也不接受数组入参

/** call： */
// Using call to invoke an anonymous function
var animals = [
    { species: 'Lion', name: 'King' },
    { species: 'Whale', name: 'Fail' }
];

for (var i = 0; i < animals.length; i++) {
    (function(i) {
        this.print = function() {
            console.log('#' + i + ' ' + this.species
                + ': ' + this.name);
        }
        this.print();
    }).call(animals[i], i);
}
// Using call to invoke a function and specifying the context for 'this'
function greet() {
    var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
    console.log(reply);
}

var obj = {
    animal: 'cats', sleepDuration: '12 and 16 hours'
};

greet.call(obj);  // cats typically sleep between 12 and 16 hours

/** 三者差异：
 * 相同：三者都可以改变函数上下文环境
 * apply 与 call 相似，是立即执行
 * bind 是先创建，后执行 */
