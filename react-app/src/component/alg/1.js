const method1 = (number) => {
    number = Number(number);
    const decimal = number - Math.floor(number);
    let integer = number - decimal;
    let res = '';
    while (integer >= 1000) {
        res = `${integer % 1000}${res ? ',' + res : ''}`;
        integer = Math.floor(integer / 1000);
    }
    res = `${integer ? integer + ',' : ''}${res}`;
    return res + '.' + decimal;
};

const method2 = (number) => {
    number = String(number);
    let integer = number.split('.')[0];
    let decimal = number.split('.')[1];
    let res = [];
    integer = String(integer).split('');
    while (integer.length > 3) {
        if (res.length > 0) {
            res = [...integer.splice(-3, 3), ',', ...res];
        } else {
            res = [...integer.splice(-3, 3)];
        }
    }
    if (integer.length > 0) {
        res = [...integer, ',', ...res]
    }
    return res.join('') + '.' + decimal;
}

export default () => {
    console.log('method1:', method1(113474982374.1));
    console.log('method2:', method2(113474982374.1));
};
