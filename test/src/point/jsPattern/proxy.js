var mult = function() {
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
    }
    return a;
};

var plus = function() {
    var a = 0;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a + arguments[i];
    }
    return a;
};

var createProxyFactory = function(fn) {
    var cache = {};
    return function() {
        var args = Array.prototype.join.call(arguments);
        if (cache[args]) {
            return cache[args];
        }
        return cache[args] = fn.apply(this, arguments);
    };
};
var proxyMult = createProxyFactory(mult);
var proxyPlus = createProxyFactory(plus);

console.log(proxyMult(1, 2, 3, 4));
console.log(proxyMult(1, 2, 3, 4));
console.log(proxyPlus(1, 2, 3, 4));
console.log(proxyPlus(1, 2, 3, 4));





// // 测试“虚拟代理合并 http 请求”， P96
// var synchonizeFile = (id) => {
//     console.log('发送请求, id:', id);
// };
// var proxySynchronousFile = (function() {
//     var cache = [], timer;
//     return function(id) {
//         cache.push(id);
//         if (timer) {
//             return;
//         }
//         timer = setTimeout(function() {
//             synchonizeFile(cache.join(','));
//             clearTimeout(timer);
//             cache.length = 0;
//             timer = null;
//         }, 2000);
//     };
// })();

// // 代码执行
// var checkbox = document.getElementsByTagName('input');
// for(var i = 0; i < checkbox.length; i++ ) {
//     var c = checkbox[i];
//     c.onclick = function() {
//         if (this.checked === true) {
//             proxySynchronousFile(this.id);
//         }
//     };
// }