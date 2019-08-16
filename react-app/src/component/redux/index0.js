import { createStore } from 'redux';
// 编写 reducer 函数：
const reducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};
//
// console.log(0, reducer(1, { type: 'DECREMENT' }));
// console.log(3, reducer(2, { type: 'INCREMENT' }));
// console.log(1, reducer(2, { type: 'DECREMENT' }));


const store = createStore(reducer);
// console.log(1111, store.getState());
// //
// // store.dispatch({ type: 'INCREMENT' });
// // console.log(2222, store.getState());

store.subscribe(() => {
    document.body.innerText = store.getState();
});

document.addEventListener('click', () => {
    store.dispatch({
        type: 'INCREMENT'
    });
})
