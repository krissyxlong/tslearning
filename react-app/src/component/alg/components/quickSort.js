/**
 * Created by longjing on 18/6/2.
 */

/** 快速排序, 非稳定排序
 * 选取第一个为基准值 K , 右边比 K 小的与 K 交换位置; 然后左边比 K 小的也交换位置, 然后将左右两边分别递归执行上述操作.
 * */

const sort = (arr, startIndex, endIndex) => {

    let i = startIndex;
    let j = endIndex;
    let keyValue = arr[startIndex];

    if (j - i <= 1) {
        return;
    }
    while(i < j) {
        for (; j>i; j--) {
            if (arr[j] < keyValue) {
                let temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
                break;
            }
        }
        for(; i<j; i++) {
            if (arr[i] > keyValue) {
                let temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
                break;
            }
        }
        arr[i] = keyValue;
        sort(arr, startIndex, i-1);
        sort(arr, i+1, endIndex);
    }
    console.log(arr, i, j);
    // return arr;
}

export default (arr) => {
    if (!Array.isArray(arr)) {
        return null;
    }

    sort(arr, 0, arr.length-1);

    return arr;
}


// export default (array) =>{
//     function sort(prev, numsize){
//         var nonius = prev;
//         var j = numsize -1;
//         var flag = array[prev];
//         if ((numsize - prev) > 1) {
//             while(nonius < j){
//                 for(; nonius < j; j--){
//                     if (array[j] < flag) {
//                         array[nonius++] = array[j];　//a[i] = a[j]; i += 1;
//                         break;
//                     };
//                 }
//                 for( ; nonius < j; nonius++){
//                     if (array[nonius] > flag){
//                         array[j--] = array[nonius];
//                         break;
//                     }
//                 }
//             }
//             array[nonius] = flag;
//             sort(0, nonius);
//             sort(nonius + 1, numsize);
//         }
//     }
//     sort(0, array.length);
//     return array;
// }