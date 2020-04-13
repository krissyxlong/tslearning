var event = {
    clientList: {},
    listen: function(key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);
    },
    trigger: function() {
        var key = Array.prototype.shift.call(arguments);
        var fns = this.clientList[key];
        if (!fns || fns.length === 0) {
            return;
        }
        for(var i = 0; i< fns.length; i++) {
            var fn = fns[i];
            fn.apply(this, arguments);
        }
    },
    remove: function(key, fn) {
        var fns = this.clientList[key];
        if (!fns) {
            return;
        }
        if (!fn) {
            fns && (fns.length = 0); // 如果没有传入具体的回调函数，表示需要取消 key 对应消息的所有订阅
        } else {
            for (var l = fns.length; l >= 0; l--) {
                var _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1); // 删除订阅者的回调函数
                }
            }
        }
    }
};

var installEvent = function(obj) {
    for (var i in event) {
        obj[i] = event[i];
    }
};

var salesOffices = {};
installEvent(salesOffices);
// 订阅消息
salesOffices.listen(88, fn1 = function(price) { // A 订阅的消息
    console.log('88 价格：', price);
})
salesOffices.listen(88, fn2 = function(price) { // B 订阅的消息
    console.log('110 价格：', price);
})
// 发布消息
salesOffices.remove(88, fn1);
salesOffices.trigger(88, 200000);
