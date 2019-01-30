
/** 接口继承 */
/** 混合类 */
/** 继承接口：从一个接口里复制成员到另一个接口里 */
/** 类类型 */
/** 可索引类型 */

/** 函数类型 */
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}

/** 只读属性，确保属性创建后不能被修改 */
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
console.log('p1:', p1);

/** 可选属性:属性名后加一个 ？ */
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any; // 任意数量的其他属性
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        // Error: Property 'clor' does not exist on type 'SquareConfig'
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});
console.log('mySquare:', mySquare);

/** 接口 */
interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
