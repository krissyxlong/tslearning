/**
 * Created by longjing on 18/5/31.
 */

// 递归法
const recusiveFind = (arr, key, low,  high) => {
    if (high < low) {
        return null;
    }
    let mid = Math.floor((high + low) / 2);
    if (arr[mid] === key) {
        return mid;
    } else if(arr[mid] > key) {
        return recusiveFind(arr, key, low, mid-1);
    } else {
        return recusiveFind(arr, key, mid+1, high);
    }
}

// 循环法
const loopFind = (arr, key) => {
    let low = 0, high = arr.length;
    let mid, result;
    while (low <= high) {
        mid = Math.floor((high + low) / 2);
        if (arr[mid] === key) {
            result = mid;
            break;
        } else if(arr[mid] > key) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return result;
}

export default function (arr, keyword) {
    if (!Array.isArray(arr) || !keyword) {
        return null;
    }
    // return recusiveFind(arr, keyword, 0, arr.length - 1);
    return loopFind(arr, keyword);
}