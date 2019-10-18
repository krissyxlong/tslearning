import React, { useEffect, useState, useReducer } from 'react';

// 计数器，依赖项是 count，但是每次 count 值发生变化都会清楚并重新设置计数器
// function Counter() {
//   const [count, setCount] = useState(0);
//
//   useEffect(() => {
//     const id = setInterval(() => {
//       setCount(count + 1);
//     }, 1000);
//     return () => clearInterval(id);
//   }, [count]);
//
//   return <h1>{count}</h1>;
// }

// 替换方法一
// function Counter() {
//   const [count, setCount] = useState(0);
//
//   useEffect(() => {
//     const id = setInterval(() => {
//       setCount(c => c + 1); // 给 react 发送指令，告知如何更新状态
//     }, 1000);
//     return () => clearInterval(id);
//   }, []);
//
//   return <h1>{count}</h1>;
// }

// 二、让定时器有依赖，但是依赖项 step 发生变化时，定时器还是会被清空重置
// function Counter() {
//   const [count, setCount] = useState(0);
//   const [step, setStep] = useState(1);
//
//   useEffect(() => {
//     const id = setInterval(() => {
//       setCount(c => c + step);
//     }, 1000);
//     return () => clearInterval(id);
//   }, [step]);
//
//   return (
//     <>
//       <h1>{count}</h1>
//       <input value={step} onChange={e => setStep(Number(e.target.value))} />
//     </>
//   );
// }

// 二 的替代方法，使用 useState, 依赖项设置为 dispatch
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' }); // Instead of setCount(c => c + step);
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]); // 你可以从依赖中去除dispatch, setState, 和useRef包裹的值因为React会确保它们是静态的。不过你设置了它们作为依赖也没什么问题。

  return (
    <>
      <h1>{count}</h1>
      <input value={step} onChange={e => {
        dispatch({
          type: 'step',
          step: Number(e.target.value)
        });
      }} />
    </>
  );;
}

const initialState = {
  count: 0,
  step: 1,
};

function reducer(state: any, action: any) {
  const { count, step } = state;
  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}

export default Counter;
