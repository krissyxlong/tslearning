/** 接口继承 */
/** 混合类 */
/** 继承接口：从一个接口里复制成员到另一个接口里 */
/** 类类型 */
/** 可索引类型 */
var mySearch;
mySearch = function (source, subString) {
    var result = source.search(subString);
    return result > -1;
};
var p1 = { x: 10, y: 20 };
console.log('p1:', p1);
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        // Error: Property 'clor' does not exist on type 'SquareConfig'
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
console.log('mySquare:', mySquare);
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
