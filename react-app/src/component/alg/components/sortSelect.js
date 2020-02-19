/**
 * Created by longjing on 18/3/23.
 */

/** 冒泡排序与选择排序的比较次数一样,均为 O(N^2). 但是交换系数减少成 O(N) */

const comp = (a, b) => {
    if (a < b) {
        return true;
    }
    return false;
};

// 冒泡排序
export const paoSort = (inputArr) => {
    let result;
    if (!Array.isArray(inputArr)) {
        result = 'error input type, need array';
    } else {
        const arrLength = inputArr.length;
        result = [ ...inputArr ];
        for (let i = 0; i < arrLength; i++) {
            for (let k = i+1; k < arrLength; k++) {
                if (!comp(result[i], result[k])) {
                    let temp = result[i];
                    result[i] = result[k];
                    result[k] = temp;
                }
            }
        }
    }
    return result;
}

// 选择排序
export const selectSort = (inputArr) => {
    let result;
    if (!Array.isArray(inputArr)) {
        result = 'error input type, need array';
    } else {
        const arrLength = inputArr.length;
        result = [ ...inputArr ];
        for (let i = 0; i < arrLength; i++) {
            let min = i;
            for (let k = i+1; k < arrLength; k++) {
                if (!comp(result[min], result[k])) {
                    min = k;
                }
            }
            let temp = result[i];
            result[i] = result[min];
            result[min] = temp;
        }
    }
    return result;
};
