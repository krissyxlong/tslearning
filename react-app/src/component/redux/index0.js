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

console.log(0, reducer(1, { type: 'DECREMENT' }));
console.log(3, reducer(2, { type: 'INCREMENT' }));
console.log(1, reducer(2, { type: 'DECREMENT' }));


const store = createStore(reducer);
console.log(1111, store.getState());

store.dispatch({ type: 'INCREMENT' });
console.log(2222, store.getState());

store.subscribe(() => {
    document.body.innerText = store.getState();
});

document.addEventListener('click', () => {
    store.dispatch({
        type: 'INCREMENT'
    });
})
// const createStore = (reducer) => {
//     let state;
//     let listeners = [];
//     const getState = () => state;
//
//     // change the current application state by dispatching an action,
//     // and the subscribe method to subscribe to the changes and re-render our application with the current state of the app.
//     const dispatch = (action) => {
//         state = reducer(state, action);
//         listeners.forEach(listener => listener());
//     };
//     const subscribe = (listener) => {
//         listeners.push(listener);
//         return listeners.filter( l => l!== listener ); // 取消订阅返回
//     };
//     dispatch({});
//     return { getState, dispatch, subscribe };
// };
