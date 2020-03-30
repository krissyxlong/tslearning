const throttle = (fn, time) => {
    let timer, firstTime = true, _self = fn;
    return function() {
        const args = arguments;
        const _this = this;
        if (!firstTime) { // 第一次不用延迟执行
            _self.apply(_this, args);
            firstTime = false;
            return;
        }
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            clearTimeout(timer);
            _self.apply(_this, args);
            timer = null;
        }, time);
    };
};

window.onresize = throttle(() => {
    console.log(1);
}, 3000);