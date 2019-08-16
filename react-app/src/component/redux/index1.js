// import { createStore } from 'redux';
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

const createStore = (reducer) => {
    let state;
    let listeners = [];
    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };
    const subscribe = (listener) => {
        listeners.push(listener);
        // return listeners.filter( l => l!== listener ); // 取消订阅返回
    };
    // dispatch({});
    return { getState, dispatch, subscribe };
};
const store = createStore(reducer);
const render = () => {
    document.body.innerText = store.getState();
};
store.subscribe(render);

document.addEventListener('click', () => {
    store.dispatch({
        type: 'INCREMENT'
    });
})

