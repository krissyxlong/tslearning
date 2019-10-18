function f() {
    // console.log(a); // 暂时性死区，报错：Uncaught ReferenceError
    let a = 'a';
    console.log(a);
    // let a = 'b'; // 块级作用域中，不可重复声明，报错：Uncaught SyntaxError
}

f();
