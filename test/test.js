const getSingle = (fn) => {
    let result;
    return function() {
        if (!result) {
            result = fn.apply(this, arguments);
        }
        return result;
    };
};