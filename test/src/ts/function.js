/** 一、函数类型 */
/** 为函数定义类型：给每个参数添加类型之后再为函数本身添加返回值类型 */
// 命名函数
function add(x, y) {
    return x + y;
}
// 匿名函数
// let myAdd = function(x: number, y: number): number { return x + y; };
/** 书写完整函数类型: 函数类型包含两部分：参数类型和返回值类型 */
/** 推断类型 */
var myAdd = function (x, y) { return x + y; };
console.log(myAdd(1, 2));
console.log(add(1, 2));
/** 二、可选参数和默认参数:
 * 传递给一个函数的参数个数必须与函数期望的参数个数一致;
 * 可选参数必须跟在必须参数后面
 * 默认参数无值时必须填 undefined */
function buildName(firstName, lastName) {
    if (firstName === void 0) { firstName = "Will"; }
    return firstName + " " + lastName;
}
function buildName1(firstName, lastName) {
    // ...
}
console.log(buildName(undefined, 'world'));
/** 三、剩余参数 */
function buildName2(firstName) {
    var restOfName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restOfName[_i - 1] = arguments[_i];
    }
    return firstName + " " + restOfName.join(" ");
}
var buildNameFun = buildName2;
console.log('剩余参数', buildNameFun('1', '2', 'a'));
/** this 和箭头函数 todo */
/** 四、重载：
 * 场景：根据入参格式的不同，返回不同的类型。
 * 方法：为同一个函数提供多个函数类型定义来进行函数重载，重载函数会在调用的时候进行正确的类型检查 */
var suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x) {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        var pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        var pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
var myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
var pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);
var pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
