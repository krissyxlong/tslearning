const func = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
};
const div = document.getElementById('hi');
const func2 = async (time, color) => {
    div.style.backgroundColor = color;
    await func(time);
};

const main = async() => {
    while (true) {
        await func2(1000, 'red');
        await func2(2000, 'blue');
        await func2(3000, 'green');
    }
};

main();
