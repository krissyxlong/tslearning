// /* 1、开关 */
// var Light = function () {
//   this.state = 'off';
//   this.button = null;
// };
// Light.prototype.init = function () {
//   var button = document.createElement('button');
//   var self = this;

//   button.innerHTML = '开关';
//   this.button = document.body.appendChild(button);
//   this.button.onclick = function () {
//     self.buttonWasPressed();
//   }
// };
// Light.prototype.buttonWasPressed = function () {
//   if (this.state === 'off') {
//     console.log('开灯');
//     this.state = 'on';
//   } else if (this.state === 'on') {
//     console.log('关灯');
//     this.state = 'off';
//   }
// }
// var light = new Light();
// light.init();
// /* 简单的强壮的状态机 */

// /* 当增加强光、弱光后，上述逻辑需要改动，且每次新增状态都需改变，如下： */
// Light.prototype.buttonWasPressed = function () {
//   if (this.state === 'off') {
//     console.log('弱光');
//     this.state = 'weakLight';
//   } else if (this.state === 'weakLight') {
//     console.log('强光');
//     this.state = 'strongLight';
//   } else if (this.state === 'strongLight') {
//     console.log('关灯');
//     this.state = 'off';
//   }
// };
// /* 违反“开放-封闭”原则，状态切换不明显，增加状态通过堆砌 if\else 语句 */

// /* 2、使用状态模式优化 */
// OffLightState:
// var OffLightState = function (light) {
//   this.light = light;
// };
// OffLightState.prototype.buttonWasPressed = function () {
//   console.log('弱光'); // offLightState 对应的行为 
//   this.light.setState( this.light.weakLightState );
// };
// // WeakLightState:
// var WeakLightState = function (light) {
//   this.light = light;
// };
// WeakLightState.prototype.buttonWasPressed = function () {
//   console.log('强光'); // weakLightState 对应的行为 
//   this.light.setState( this.light.strongLightState );
// };
// // StrongLightState:
// var StrongLightState = function (light) {
//   this.light = light;
// };
// StrongLightState.prototype.buttonWasPressed = function () {
//   console.log('关灯'); // strongLightState 对应的行为
//   this.light.setState(this.light.offLightState); // 切换状态到 offLightState
// };

// var Light = function () {
//   this.offLightState = new OffLightState(this);
//   this.weakLightState = new WeakLightState(this);
//   this.strongLightState = new StrongLightState(this);
//   this.button = null;
// };

// Light.prototype.init = function () {
//   var button = document.createElement('button'),
//     self = this;
//   this.button = document.body.appendChild(button);
//   this.button.innerHTML = '开关';
//   this.currState = this.offLightState;
//   this.button.onclick = function () {
//     self.currState.buttonWasPressed();
//   }
// };
// Light.prototype.setState = function( newState ){
//   this.currState = newState;
// }
// var light = new Light();
// light.init();
/* 状态模式使每个状态和它对应的行为之间的关系局部化，
这些行为被分散和封装在各自对应的状态类之中，便于阅读和管理
当需要新增状态时，只需增加一个状态类
 */

/* 3、js 版本的状态机 */
