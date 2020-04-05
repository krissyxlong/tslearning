const effectiveTypes = [];
const isType = (type) => {
    return (input) => {
        return Object.prototype.toString.apply(input) === `[object ${type}]`
    };
};
const isTypes = {
    isObject: isType('Object'),
    isArray: isType('Array'),
    isString: isType('String'),
    isBoolean: isType('Boolean'),
    isNumber: isType('Number')
};
const stringifyArr = (arr) => {
    const s = arr.reduce((result, item, index) => {
        result += toS(item);
        if (index < arr.length - 1) {
            result += ',';
        }
        return result;
    }, '');
    return `[${s}]`;
};
const stringifyObj = (input) => {
    let s = '';
    const keys = Object.keys(input);
    keys.map((key, index) => {
        s += `"${key}":${toS(input[key])}`;
        if(index < keys.length - 1) {
            s += ',';
        }
    });
    return `{${s}}`;
};

const toS = (x) => {
    let result = '';
    if (x === undefined || x === null) {
        result = null;
    } else if (isTypes.isNumber(x) || isTypes.isBoolean(x)) {
        result = x;
    } else if (isTypes.isString(x)) {
        result = `"${x}"`;
    } else if (isTypes.isArray(x)) {
        result = stringifyArr(x);
    } else if (isTypes.isObject(x)) {
        result = stringifyObj(x);
    }
    return result;
};
const getR = (x) => {
    return `"${toS(x)}"`
};

const x = {
    a: 1,
    2: 'ccc',
    b: [1, 3, {s: {q: 1, w: 2}}]
};
console.log(getR(x));