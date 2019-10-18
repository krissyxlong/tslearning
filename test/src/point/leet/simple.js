const findmaxstr = (strArr) => {
    const lenArr = strArr.map(str => str.length); // 所有字符长度
    const minPos = lenArr.indexOf(Math.min(...lenArr)); // 最短字符位置
    const minStr = strArr[minPos]; // 最短字符
    let flag = true;
    let index = 0;
    for (let i = 0; i < minStr.length; i++) {
        const ai =  minStr[i];
        for (let j = 0; j < strArr.length; j++) {
            if (strArr[j][i] !== ai) {
                flag = false;
                index = i;
                break;
            }
        }
        if (!flag) {
            break;
        }
    }
    return minStr.slice(0, index);
};

console.log(findmaxstr(['flower', 'flow', 'wfloight']));


// 找出字符串中不含有重复字符的最长子串的长度
/*const repeated = (arr) => {
    return arr.length > [...new Set(arr)].length;
}
const getMaxNum = (str) => {
    if (!str) {
        return 0;
    }
    let max = 1;
    let arr = str.split('');
    let tempA = arr.shift();
    while (max < arr.length && arr.length > 0) {
        let tempArr = [tempA];
        let tempMax = 1;
        for (let j = 0; j < tempArr.length; j++) {
            tempArr.push(arr[j]);
            if (repeated(tempArr)) {
                tempMax = tempArr.length - 1;
                break;
            } else {
                tempMax = tempArr.length;
            }
        }


        if (tempMax > max) {
            max = tempMax;
        }
        tempA = arr.shift();
    }
    return max;
};
console.log('abcabcbb:', getMaxNum('123423456'));*/

// 找出字符串中最长的回文字符串
/*const isHuiwenStr = (str) => {
    const reverseStr = str.split('').reverse().join('');
    return str === reverseStr;
};
const findHuiwenMaxLength = (s) => {
    if (!s) {
        return 0;
    }
    let flag = false;
    let maxStr = '';
    let processLength = s.length;
    const arr = s.split('');
    while (processLength > 0) {
        const tempArr = [...arr];
        while (tempArr.length >= processLength) {
            const a = tempArr.slice(0, processLength);
            if (isHuiwenStr(a.join(''))) {
                flag = true;
                maxStr = a.join('');
                break;
            }
            tempArr.shift();
        }
        if (flag) {
            break;
        }
        processLength--;
    }
    return maxStr;
}
console.log(222222222, findHuiwenMaxLength('sdsgfds'));*/

// 求最大盛水桶
// const maxArea = (arr) => {
//     let maxV = 0;
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = i + 1; j < arr.length; j++) {
//             let area = Math.min(arr[i], arr[j]) * (j - i);
//             maxV = Math.max(area, maxV);
//         }
//     }
//     return maxV;
// };
// console.log('area', maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));

// const toArab = (number) => {
//     if (number > 3999 || number < 1) {
//         return 'exceed scope';
//     }
//     const generateStr = ([s1, s2, s3]) => {
//         if (s3)
//         return ['', s1, `${s1}${s1}`, `${s1}${s1}${s1}`, `${s1}${s2}`, s2, `${s2}${s1}`, `${s2}${s1}${s1}`, `${s2}${s1}${s1}${s1}`, `${s1}${s3}`];
//         return ['', s1, `${s1}${s1}`, `${s1}${s1}${s1}`];
//     };
//     const A1 = generateStr(['I', 'V', 'X']);
//     const A2 = generateStr(['X', 'L', 'C']);
//     const A3 = generateStr(['C', 'D', 'M']);
//     const A4 = generateStr(['M']);
//     const SCOPE = [A1, A2, A3, A4];
//     const parseNumber = String(number).split('').reverse();
//     return parseNumber.reduce((result, item, index) => {
//         return `${SCOPE[index][Number(item)]}${result}`;
//     }, '');
// };
// console.log('toArab', toArab(3999));

// const parseArab = (str) => {
//     if (!str) {
//         return 'error';
//     }
//     const generateStr = ([s1, s2, s3]) => {
//         if (s3)
//             return ['', s1, `${s1}${s1}`, `${s1}${s1}${s1}`, `${s1}${s2}`, s2, `${s2}${s1}`, `${s2}${s1}${s1}`, `${s2}${s1}${s1}${s1}`, `${s1}${s3}`];
//         return ['', s1, `${s1}${s1}`, `${s1}${s1}${s1}`];
//     };
//     const A1 = generateStr(['I', 'V', 'X']);
//     const A2 = generateStr(['X', 'L', 'C']);
//     const A3 = generateStr(['C', 'D', 'M']);
//     const A4 = generateStr(['M']);
//     const SCOPE = [A1, A2, A3, A4];
//     const result = [];
//     for (let i = 0; i < SCOPE.length; i++) {
//         if (str) {
//             const A = SCOPE[i];
//             let indexF;
//             let currentIndex;
//             for (let j = A.length - 1; j >= 0; j--) {
//                 indexF = str.lastIndexOf(A[j]);
//                 if (indexF > -1) {
//                     currentIndex = j;
//                     str = str.slice(0, indexF);
//                     break;
//                 }
//             }
//             result[i] = currentIndex || 0;
//         } else {
//             break;
//         }
//     }
//     return result.reverse().join('');
// };
// console.log('toArab', parseArab('MMXCIX'));

