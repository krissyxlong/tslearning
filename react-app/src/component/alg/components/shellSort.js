/**
 * Created by longjing on 18/5/31.
 */

export default function (arr) {
    // let arr = [49, 38, 65, 97, 76, 13, 27, 49, 55, 4];
    if (!Array.isArray(arr)) {
        return null;
    }
    let len = arr.length;
    for (let fra = Math.floor(len / 2); fra > 0; fra = Math.floor(fra / 2))
    {
        for (let i = fra; i < len; i++) {
            for (let j = i - fra; j >= 0 && arr[j] > arr[fra + j]; j -= fra) {
                let temp = arr[j];
                arr[j] = arr[fra + j];
                arr[fra + j] = temp;
            }
        }
    }
    return arr;
    console.log('------arr:', arr);
}
