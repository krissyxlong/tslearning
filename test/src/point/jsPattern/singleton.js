// const createLoginLayer = (() => {
//     let div;
//     return () => {
//         if (!div) {
//             div = document.createElement('div');
//             div.innerHTML = '我是登录浮窗';
//             div.style.display = 'none';
//             document.body.append(div);
//         }
//         return div;
//     };
// })();
// document.getElementById('loginBtn').onclick = () => {
//     const loginLayer = createLoginLayer();
//     loginLayer.style.display = 'block';
// };

/**
 * @description: 通用模块
 * @param {function} 
 * @return: function
 */
const getSingle = (fn) => {
    let result;
    return () => {
        return result || (result = fn.apply(this.arguments));
    };
};
const createLoginLayer = () => {
    const div = document.createElement('div');
    div.innerHTML = '我是登录浮窗';
    div.style.display = 'none';
    document.body.append(div);
    return div
};
const createSingleLoginLayer = getSingle(createLoginLayer);
document.getElementById('loginBtn').onclick = () => {
    const loginLayer = createLoginLayer();
    loginLayer.style.display = 'block';
};