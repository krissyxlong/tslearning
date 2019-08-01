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
