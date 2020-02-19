/**
 * Created by longjing on 18/6/3.
 */

/** 计数排序
 *
 * */

export default (a) => {
    if (!Array.isArray(a)) {
        return null;
    }

    let len = a.length;
    let min = a[0];
    let max = a[0];
    let countArr = [];
    let result = [];

    for(let i=1; i<len; i++) {
        if (min > a[i]) {
            min = a[i];
        }
        if (max < a[i]) {
            max = a[i];
        }
        countArr[a[i]] = countArr[a[i]] ? countArr[a[i]] + 1 : 1;
    }
    for (let k=1; k<countArr.length; k++) {
        countArr[k] = (countArr[k] || 0) + (countArr[k-1] || 0);
    }

    for (let j=len-1; j>=0; j--) {
        result[countArr[a[j]] - 1] = a[j];
        countArr[a[j]]-- ;
    }

    return result;
}