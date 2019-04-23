// let x = 1;
//
// function *foo() {
//     x++;
//     yield; // 暂停！
//     console.log( "x:", x );
// }
//
// function bar() {
//     x++;
// }
//
// let it = foo(); // 只是创建了迭代器对象，为什么需要这个间接的迭代器对象来控制 generator？？todo (1)
//
// // 在这里开始`foo()`！
// it.next();  // 启动了 *foo()generator
// console.log( "xx:", x );						// 2
// bar();
// console.log( "xxx:", x );					// 3
// it.next(); // 从暂停的地方继续执行

// 迭代通信
function *foo(x) {
    let y = x * (yield);
    return y;
}

let it = foo( 6 );
console.log('111:', it);
// 开始`foo(..)`
// it.next();
console.log('222:', it.next());


let res = it.next( 7 );

res.value;
