const debounce = function(func, wait) {
    let timeout, result;
    const debounced = function(args) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(null, args);
        }, wait);
        return result;
    };
    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
};


const throttle = (func, wait) => {
    let timeout, result;
    const debounced = function(args) {
        if (!timeout) {
            func.apply(null, args);
        }

        timeout = setTimeout(function() {
            func.apply(null, args);
        }, wait);
        return result;
    };
    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
};

document.getElementById('hi').onclick = () => {
    console.log('clicked');
    debounce(() => {
        console.log(111111);
    }, 3000)
};
