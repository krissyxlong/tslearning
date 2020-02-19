/**
 * Created by longjing on 18/5/31.
 */

export default function (arr) {
    if (!Array.isArray(arr)) {
        return null;
    }
    for (let i=1; i<arr.length; i++) {
        let temp = arr[i]; // 挪出当前位置
        let j = i-1;
        while(arr[j] > temp && j >= 0) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = temp; // 定位当前元素
    }
    return arr;
}