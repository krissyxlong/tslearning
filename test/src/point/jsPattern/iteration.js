// // 实现 jquery 中的 each 函数
// var each = function(arr, callback) {
//     for (var i = 0; i < arr.length; i++) {
//         var item = arr[i];
//         callback.call(item, i, item);
//     }
// };

// each([1, 2, 3], function(i, item) {
//     console.log(i, item);
// });


// 外部迭代器
var Iterator = function(obj) {
    var current = 0;
    var next = function() {
        current++;
    };
    var isDone = function() {
        return current >= obj.length;
    };
    var getCurrentItem = function() {
        return obj[current];
    };
    return {
        next,
        isDone,
        getCurrentItem,
        length: obj.length
    };
};

var compare = function(iterator1, iterator2) {
    if (iterator1.length !== iterator2.length){
        return false;
    }
    while (!iterator1.isDone() && !iterator2.isDone()) {
        if (iterator1.getCurrentItem() !== iterator2.getCurrentItem()) {
            return false;
        }
        iterator1.next();
        iterator2.next();
    }
    return true;
}

var iterator1 = Iterator([1, 2, 3]);
var iterator2 = Iterator([1, 3, 3]);

console.log('对比结果：', compare(iterator1, iterator2));



// 中止迭代器：约定如果回调返回 false，则提前中止循环
// var each = function(arr, callback) {
//     for(var i = 0; i < arr.length;i++) {
//         if(callback.call(arr[i], i, arr[i]) === false) {
//             break;
//         }
//     }
// }

// each([1, 2, 3, 4, 5], function(i, item) {
//     if (i > 3) {
//         return false;
//     }
//     console.log(item);
// })