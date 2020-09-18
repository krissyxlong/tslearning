// 本文件为 变量声明
// 4、解构
function f1(_a) {
    var first = _a[0], second = _a[1];
    console.log(first);
    console.log(second);
}
var o = { a1: 'q', b1: 1 };
var a1 = o.a1, b1 = o.b1; // 对象解构时的类型声明
// type C = { a: string, b?: number }
function f2(_a) {
    var _b = _a === void 0 ? { a: "" } : _a, a = _b.a, _c = _b.b, b = _c === void 0 ? 0 : _c;
    console.log(a, b);
}
f2({ a: 'a' }); // ok, default b = 0;
f2(); // ok:  default to {a: ""}，which when defaults b = 0
f2({}); // error：a is required if you supply an argument
