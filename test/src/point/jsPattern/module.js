// /* 泡一杯咖啡 */
// var Coffee = function() {};
// Coffee.prototype.boilWater = function() {
//   console.log('把水煮沸');
// };
// Coffee.prototype.brewCoffeeGriends = function() {
//   console.log('用沸水冲泡咖啡');
// };
// Coffee.prototype.pourInCup = function() {
//   console.log('把咖啡倒进杯子');
// };
// Coffee.prototype.addSugarAndMilk = function() {
//   console.log('加糖和牛奶');
// };
// Coffee.prototype.init = function () {
//   this.boilWater();
//   this.brewCoffeeGriends();
//   this.pourInCup();
//   this.addSugarAndMilk();
// }
// var coffee = new Coffee();
// coffee.init();

// /* 泡一杯茶 */
// var Tea = function() {};
// Tea.prototype.boilWater = function() {
//   console.log('把水煮沸');
// };
// Tea.prototype.steepTeaBag = function() {
//   console.log('用沸水浸泡茶叶');
// };
// Tea.prototype.pourInCup = function() {
//   console.log('把茶叶倒进杯子');
// };
// Tea.prototype.addLemon = function() {
//   console.log('加柠檬');
// };
// Tea.prototype.init = function () {
//   this.boilWater();
//   this.steepTeaBag();
//   this.pourInCup();
//   this.addLemon();
// }
// var tea = new Tea();
// tea.init();

// 父类
var Beverage = function () {};
Beverage.prototype.boilWater = function () {
  console.log('把水煮沸');
}
Beverage.prototype.brew = function () {};
Beverage.prototype.pourInCup = function () {};
Beverage.prototype.addCondiments = function () {};
Beverage.prototype.customWantsCondiments = function () {
  return true; // 默认需要调料
};
Beverage.prototype.init = function () {
  this.boilWater();
  this.brew();
  this.pourInCup();
  this.addCondiments();
}

// 初始化 Coffee 类
var Coffee = function () {};
Coffee.prototype = new Beverage();
Coffee.prototype.brew = function() {
  console.log('用沸水冲泡咖啡');
};
Coffee.prototype.pourInCup = function() {
  console.log('把咖啡倒进杯子');
};
Coffee.prototype.addCondiments = function() {
  console.log('加糖和牛奶');
};
Coffee.prototype.customWantsCondiments = function () {
  return window.alert('请问需要调料吗？');
}
var coffee = new Coffee();
coffee.init();

// 初始化 Tea 类
var Tea = function() {};
Tea.prototype = new Beverage();
Tea.prototype.brew = function() {
  console.log('用沸水浸泡茶叶');
};
Tea.prototype.pourInCup = function() {
  console.log('把茶叶倒进杯子');
};
Tea.prototype.addCondiments = function() {
  console.log('加柠檬');
};
var tea = new Tea();
tea.init();