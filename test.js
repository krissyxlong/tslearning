const addOne = value => value + 1;
const addTwo = value => addOne(value + 1);
const addThree = value => addTwo(value + 1);
const cal = () => addThree(1) + addTwo(1);
console.log(11, cal());