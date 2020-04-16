/**************** 表单验证 *****************/
/********** 策略对象 ***********/
/* const strategies = {
    isNonEmpty: (value, errMsg) => {
        if (value === '') {
            return errMsg;
        }
    },
    minLength: (value, length, errMsg) => {
        if (value.length < length) {
            return errMsg
        }
    },
    isMobile: (value, errMsg) => {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errMsg
        }
    }
}; */
/********** validator 类 ***********/
/* var Validator = function() {
    this.cache = [];
};

Validator.prototype.add = function(value, rules) {
    var self = this;
    for(var i = 0, rule; rule = rules[i++];) {
        (function(rule) {
            var strategyItem = rule.strategy.split(':');
            var errMsg = rule.errMsg;
            self.cache.push(function() {
                var strategy = strategyItem.shift();
                var strategyParams = [value, ...strategyItem, errMsg];
                return strategies[strategy].apply(value, strategyParams);
            })
        })(rule);
    }
}

Validator.prototype.start = function() {
    for(var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
        var errMsg = validatorFunc();
        if (errMsg) {
            return errMsg;
        }
    }
} */
/********** 调用代码 ***********/
/* const submitData = {
    a: 2,
    b: 1879
};
const validataFunc = () => {
    const validator = new Validator();
    validator.add(submitData.a, [{
        strategy: 'isNonEmpty',
        errMsg: 'a不能为空'
    }]);
    validator.add(submitData.b, [{
        strategy: 'isMobile',
        errMsg: 'b不是正确的手机号'
    }]);
    const errMsg = validator.start();
    return errMsg;
};

console.log('校验结果：', validataFunc()); */

/**************** 奖金计算 *****************/
// const getBond = (number) => {
//     return (basic) => {
//         return basic * number;
//     };
// };

// const maps = {
//     S: getBond(4),
//     A: getBond(3),
//     B: getBond(2)
// };

// console.log('s:', maps['S'](20000)); // 绩效S
// console.log('a:', maps['A'](20000));
// console.log('b:', maps['B'](20000));


/**************** 小球缓动动画 *****************/
console.log('in');
const tween = { // 此处即为策略模式
    linear: (t, b, c, d) => {
        return c * t / d + b;
    },
    easeIn: (t, b, c, d) => {
        return c * (t /= d) * t + b;
    },
    strongEaseIn: (t, b, c, d) => {
        return c * (t /= d) * (t ** 4) + b;
    }
};

const Animate = function(dom) {
    this.dom = dom;
    this.startTime = 0;
    this.startPos = 0;
    this.endPos = 0;
    this.propertyName = null; // dom 节点需要被改变的 css 属性名
    this.easing = null;
    this.duration = null;
};

Animate.prototype.start = function(propertyName, endPos, duration, easing) {
    this.startTime = +new Date;
    this.startPos = this.dom.getBoundingClientRect()[propertyName]; // dom 节点初始位置
    this.propertyName = propertyName;
    this.endPos = endPos;
    this.duration = duration;
    this.easing = tween[easing];
    const self = this;
    const timeId = setInterval(function() {
        if (self.step() === false) { // 如果动画结束，则清除定时器
            clearInterval(timeId);
        }
    }, 19)
};

Animate.prototype.step = function() {
    let t = +new Date;
    if (t > this.startTime + this.duration) { // 修正小球位置
        this.update(this.endPos);
        return false;
    }
    const pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
    this.update(pos);
}

Animate.prototype.update = function(pos) {
    console.log(33, pos)
    this.dom.style[this.propertyName] = pos + 'px';
}

// 开始测试
const $div = document.getElementById('div');
// const $div = document.getElementById('ball');
const animate = new Animate($div);
animate.start('left', 500, 1000, 'easeIn');