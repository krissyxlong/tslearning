/**
 * Created by longjing on 18/6/2.
 */

/** 归并排序
 *
 * 性能不受输入数据的影响，但表现比选择排序好的多，因为始终都是O(n log n）的时间复杂度。代价是需要额外的内存空间。
 *
 * */

const merge = (leftArr, rightArr) => {
    let result = [];
    while(leftArr.length && rightArr.length){
        if (leftArr[0] < rightArr[0]) {
            result.push(leftArr.shift());
        } else {
            result.push(rightArr.shift());
        }
    }
    return result.concat(leftArr, rightArr);
};

/** 递归方法,在输入数组长度很大时容易造成栈溢出的情况, 此时可以用循环方法 */
const mergeSort = (arr) => {
    let len = arr.length;
    if (len < 2) {
        return arr;
    }
    let middle = Math.floor( len / 2);
    let leftArr = arr.slice(0, middle);
    let rightArr = arr.slice(middle);

    return merge(mergeSort(leftArr), mergeSort(rightArr));
}

export default (arr) => {
    // let arr = [49, 38, 65, 97, 76, 13, 27, 49, 55, 4];

    if (!Array.isArray(arr)) {
        return null;
    }
    return mergeSort(arr);
}

/** 循环法 */
const forMergeSort = (arr) => {
    let len = arr.length;
}

