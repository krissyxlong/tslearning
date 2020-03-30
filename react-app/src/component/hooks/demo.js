/*
 * @Description: 
 * @Author: 
 * @Date: 2020-01-10 16:34:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-30 18:17:39
 */
import React, { useState, useEffect } from 'react';

const Repeat = React.memo(() => {
  console.log(2222);
  return <div>22222222</div>;
});

export default () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('useEffect', count);
    document.title = `You clicked ${count} times`;
    setCount(3);
    return () => {
      console.log('clean up');
    };
  }, [count]);
  console.log('rendering demo');
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <Repeat />
    </div>
  );
}

