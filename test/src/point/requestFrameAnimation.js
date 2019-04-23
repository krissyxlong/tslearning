var start = null;
var element = document.getElementById('hi');
element.style.position = 'absolute';
let i = 0;

function step(timestamp) {
    i++;
    if (!start) start = timestamp;
    var progress = timestamp - start;
    console.log(timestamp, start, progress);
    element.style.top = Math.floor(700 * (progress) / 1000) + 'px';
    if (progress < 1000) {
        window.requestAnimationFrame(step);
    } else {
        console.log(1111, i);
    }
}

window.requestAnimationFrame(step);

// console.log(1);
// setTimeout(function () {
//     console.log(2);
// }, 0);
// fetch('http://127.0.0.1:8089/').then(function (res) {
//     console.log(4);
// }).catch(function (err) {
//     console.log(5);
// });
// console.log(3);
