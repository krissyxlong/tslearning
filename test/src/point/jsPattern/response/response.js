// /* 
// 场景：
// 假设我们负责一个售卖手机的电商网站，经过分别交纳 500 元定金和 200 元定金的两轮预定后(订单已在此时生成)，现在已经到了正式购买的阶段。
// 公司针对支付过定金的用户有一定的优惠政策。在正式购买后，已经支付过 500 元定金的用 户会收到 100 元的商城优惠券，
// 200 元定金的用户可以收到 50 元的优惠券，而之前没有支付定金 的用户只能进入普通购买模式，也就是没有优惠券，且在库存有限的情况下不一定保证能买到。 
// */

// /* 新手模式 */
// /**
//  * @description: 计算订单状态
//  * @param {number} orderType 定金模式 1: 500 定金；2 200 定金；3 代表没有缴纳定金
//  * @param {boolean} pay 是否已缴费 true: 是，false: 否
//  * @param {number} stock 当前库存量
//  * @return {*} 订单状态
//  */
// var order = function (orderType, pay, stock) {
//   if (orderType === 1) { // 500 元定金购买模式
//     if (pay === true) { // 已支付定金
//       console.log('500 元定金预购, 得到 100 优惠券');
//     } else { // 未支付定金，降级到普通购买模式
//       if (stock > 0) { // 用于普通购买的手机还有库存
//         console.log('普通购买, 无优惠券');
//       } else {
//         console.log('手机库存不足');
//       }
//     }
//   }
//   else if (orderType === 2) {
//     if (pay === true) { // 200 元定金购买模式
//       console.log('200 元定金预购, 得到 50 优惠券');
//     } else {
//       if (stock > 0) {
//         console.log('普通购买, 无优惠券');
//       } else {
//         console.log('手机库存不足');
//       }
//     }
//   }
//   else if (orderType === 3) {
//     if (stock > 0) {
//       console.log('普通购买, 无优惠券');
//     } else {
//       console.log('手机库存不足');
//     }
//   }
// };
// order(1, true, 500);
// /* 可以工作，难以阅读和维护 */


// /* 用职责链模式重构版本 */
// // 根据定金种类定义函数
// var order500 = function (orderType, pay, stock) {
//   if (orderType === 1 && pay === true) {
//     console.log('500 元定金预购, 得到 100 优惠券');
//   } else {
//     order200(orderType, pay, stock); // 将请求传递给 200 元订单 
//   }
// };
// // 200 元订单
// var order200 = function (orderType, pay, stock) {
//   if (orderType === 2 && pay === true) {
//     console.log('200 元定金预购, 得到 50 优惠券');
//   } else {
//     orderNormal(orderType, pay, stock); // 将请求传递给普通订单
//   };
// };
// // 普通购买订单
// var orderNormal = function (orderType, pay, stock) {
//   if (stock > 0) {
//     console.log('普通购买, 无优惠券');
//   } else {
//     console.log('手机库存不足');
//   }
// };
// // 测试结果:
// order500(1, true, 500);  // 输出: 500 元定金预购, 得到 100 优惠券 
// order500(1, false, 500); // 输出: 普通购买, 无优惠券
// order500(2, true, 500);  // 输出: 200 元定金预购, 得到 500 优惠券 
// order500(3, false, 500); // 输出: 普通购买, 无优惠券
// order500(3, false, 0);   // 输出: 手机库存不足
// /* 已拆成三个小函数，但是联调的传递非常僵硬，相互耦合 */
// /* 实现任意增加、拆除、或者移动一个节点 */

// /* 重构版本3：：让链中的各个节点可以灵活拆分和重组 */
// var order500 = function (orderType, pay, stock) {
//   if (orderType === 1 && pay === true) {
//     console.log('500 元定金预购，得到 100 优惠券');
//   } else {
//     return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递 
//   }
// };
// var order200 = function (orderType, pay, stock) {
//   if (orderType === 2 && pay === true) {
//     console.log('200 元定金预购，得到 50 优惠券');
//   } else {
//     return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
//   };
// }
// var orderNormal = function (orderType, pay, stock) {
//   if (stock > 0) {
//     console.log('普通购买，无优惠券');
//   } else {
//     console.log('手机库存不足');
//   }
// };

// // // 责任链节点
// var Chain = function (fn) {
//   this.fn = fn;
//   this.successor = null;
// };
// Chain.prototype.setNextSuccessor = function (successor) {
//   return this.successor = successor;
// };
// // Chain.prototype.next = function () {
// //   return this.successor && this.successor.passRequest.apply(this.successor, arguments);
// // }
// Chain.prototype.passRequest = function () {
//   var ret = this.fn.apply(this, arguments);
//   if (ret === 'nextSuccessor') {
//     return this.successor && this.successor.passRequest.apply(this.successor, arguments);
//   }
//   return ret;
// };
// // 三个订单函数分别包装成职责链的节点
// var chainOrder500 = new Chain(order500);
// var chainOrder200 = new Chain(order200);
// var chainOrderNormal = new Chain(orderNormal);
// // 指定节点顺序
// chainOrder500.setNextSuccessor(chainOrder200);
// chainOrder200.setNextSuccessor(chainOrderNormal);
// // 把请求传递给第一个请求点
// chainOrder500.passRequest(1, true, 500); // 输出:500 元定金预购，得到 100 优惠券 
// // chainOrder500.passRequest(2, true, 500); // 输出:200 元定金预购，得到 50 优惠券 
// // chainOrder500.passRequest(3, true, 500); // 输出:普通购买，无优惠券
// // chainOrder500.passRequest(1, false, 0); // 输出:手机库存不足

// // 当需要支持 300 的情况时，只需增加一个节点，并插入某个节点
// // var order300 = function () {
// //   // 具体实现略
// // };
// // chainOrder300 = new Chain(order300);
// // chainOrder500.setNextSuccessor(chainOrder300);
// // chainOrder300.setNextSuccessor(chainOrder200);


// // /* 异步版本： */
// var fn1 = new Chain(function () {
//   console.log(1);
//   return 'nextSuccessor';
// });
// var fn2 = new Chain(function () {
//   console.log(2);
//   var self = this;
//   setTimeout(function () {
//     self.next();
//   }, 1000);
// });
// var fn3 = new Chain(function () {
//   console.log(3);
// });
// fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
// fn1.passRequest();

// // AOP 实现职责链模式
// Function.prototype.after = function (fn) {
//   var self = this;
//   return function () {
//     var ret = self.apply(this, arguments);
//     if (ret === 'nextSuccessor') {
//       return fn.apply(this, arguments);
//     }
//     return ret;
//   }
// };
// var order = order500yuan.after(order200yuan).after(orderNormal);
// order(1, true, 500); // 输出:500 元定金预购，得到 100 优惠券
// order(2, true, 500); // 输出:200 元定金预购，得到 50 优惠券
// order(1, false, 500); // 输出:普通购买，无优惠券
