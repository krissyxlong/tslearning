// const addOne = value => {
//     throw new Error('hehe');
// };
// const addTwo = value => {
//     return addOne(value + 1)
// };
// const addThree = value => {
//     return addTwo(value + 1);
// };
// const cal = () => addThree(1) + addTwo(1);
// console.log(11, cal());

console.log('a');
setTimeout(() => {
    console.log('b');
}, 0);
new Promise((resolve, reject) => {
  resolve();
})
.then(() => {
  console.log('c');
});
console.log('d');