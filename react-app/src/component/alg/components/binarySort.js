/**
 * Created by longjing on 18/6/3.
 */

/** 堆排序
 * 叶子节点: 没有子节点的节点
 *
 * */

const adjustNode = (arr, pos, len) => {
    let leftNodeIndex = pos * 2 + 1;
    let rightNodeIndex = pos * 2 + 2;
    let temp;

    if (leftNodeIndex < len && arr[leftNodeIndex] > arr[pos]) {
        temp = arr[pos];
        arr[pos] = arr[leftNodeIndex];
        arr[leftNodeIndex] = temp;
    }
    if (rightNodeIndex < len && arr[rightNodeIndex] > arr[pos]) {
        temp = arr[pos];
        arr[pos] = arr[rightNodeIndex];
        arr[rightNodeIndex] = temp;
    }
}

const buildMaxHeap = (arr, len) => {
    /** 构建大堆顶*/
    let pos = Math.floor(len / 2) - 1;
    if (pos < 0) {
        return;
    }
    for (let i=pos; i>=0; i--) {
        adjustNode(arr, i, len)
    }
}

export default (arr) => {
    if (!Array.isArray(arr)) {
        return null;
    }
    var len = arr.length;
    buildMaxHeap(arr, len);

    for (let j=len-1; j>=1; j--) {
        let temp = arr[0];
        arr[0] = arr[j];
        arr[j] = temp;
        if (j > 1) {
            buildMaxHeap(arr, j)
        }
    }
    return arr;
}