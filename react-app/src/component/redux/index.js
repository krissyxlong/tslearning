import { combineReducers, createStore } from 'redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/** createStore 内部逻辑概要！！！
 * 1、需同步 state 变化的模块先 subscribe state 变化；
 * 2、reducer：定义维护了各类 action 怎么变更 state，
 * 3、dispatch: 发起 action，更新 state，同时触发 subscribe state 变化的模块（如 render）重新执行
 /*const createStore = (reducer) => {
    let state;
    let listeners = [];
    const getState = () => state;

    // change the current application state by dispatching an action,
    // and the subscribe method to subscribe to the changes and re-render our application with the current state of the app.
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };
    const subscribe = (listener) => {
        listeners.push(listener);
        return listeners.filter( l => l!== listener ); // 取消订阅返回
    };
    dispatch({});
    return { getState, dispatch, subscribe };
};*/

// reducer： a pure function to implement the update logic of app
function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

// a todo reducer( one reducer can be called bu another reducer to update )
// reducer composition (with arrays\object)
const todo = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            }
        default:
            return state;
    }
};
const todos = (state = [], action) => {
    console.log('action:', action);
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(item => {
                return todo(item, action);
            });
        default:
            return state;
    }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

// const todoApp = (state = {}, action) => {
//     return {
//         todos: todos(
//             state.todos,
//             action
//         ),
//         visibilityFilter: visibilityFilter(
//             state.visibilityFilter,
//             action
//         )
//     };
// };

// a function return another function
// const combineReducers = (reducers) => {
//     return (state = {}, action) => {
//         return Object.keys(reducers).reduce((nextState, key) => {
//             return {
//                 ...nextState,
//                 key: reducers[key](state[key], action)
//             };
//         }, {})
//     };
// };

// import { combineReducers } from 'redux';
const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const store = createStore(todoApp);
let nextTodoId = 0;

const Todo = ({
    id,
    text,
    completed,
    onClick
}) => {
    return <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
        key={id}>
        {text}
    </li>
};
const TodoList = ({
                      todos
                  }) => {
    return <ul>{
        todos.map(todo => <Todo
            key={todo.id}
            {...todo}
            onClick={() => {
                store.dispatch({
                    type: 'TOGGLE_TODO',
                    id: todo.id
                })
            }}
        />)
    }</ul>
};

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(i => i.completed)
        case 'SHOW_ACTIVE':
            return todos.filter(i => !i.completed)
        default:
            return todos;
    }
};

class AddTodo extends Component {
    render() {
        return <>
            <input ref={node => { this.input = node; }} />
            <button onClick={() => {
                store.dispatch({
                    type: 'ADD_TODO',
                    text: this.input.value,
                    id: nextTodoId++
                });
                this.input.value = ''
            }}>Add to do</button></>
    }
}
const FilterLink = ({
                        filter,
                        children
                    }) => {
    return <a href={'#'} onClick={(e) => {
        e.preventDefault();
        store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter
        });
    }
    }>{children}</a>;
};
const Footer = () => {
    return <p>
        show:
        {' '}
        <FilterLink filter={'SHOW_ALL'}>all</FilterLink>
        {' '}
        <FilterLink filter={'SHOW_ACTIVE'}>ACTIVE</FilterLink>
        {' '}
        <FilterLink filter={'SHOW_COMPLETED'}>COMPLETED</FilterLink>
    </p>;
};
class TodoApp extends Component {
    render() {
        const visibleTodos = getVisibleTodos(this.props.todos, this.props.visibilityFilter);

        return <div>
            <AddTodo />
            <TodoList todos={visibleTodos}/>
            <Footer />
        </div>
    }
}

class Provider extends Component {
    render() {
        return this.props.children;
    }
}

const render = () => {
    ReactDOM.render(<Provider store={createStore(todoApp)}>
        <TodoApp
            todos={store.getState().todos}
            visibilityFilter={store.getState().visibilityFilter}
            onIncrement={() => {store.dispatch({type: 'INCREMENT'})}}
            onDecrement={() => {store.dispatch({type: 'DECREMENT'})}}
        />
    </Provider>, document.getElementById('hello'));
};

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(render);
render();

