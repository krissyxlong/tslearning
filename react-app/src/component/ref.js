import React, { useEffect, useRef } from 'react';
const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
      {props.children}
    </button>
  ));

  function TextInputWithFocusButton() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
      // `current` points to the mounted text input element
      inputEl.current.focus();
    };
    return (
      <>
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Focus the input</button>
      </>
    );
  }

export default () => {
    const ref = React.createRef();
    useEffect(() => {
        console.log(1111);
    });
    const handleClick = () => {
        console.log('ref:', ref);
    };
    return <div>
        <FancyButton ref={ref}>Click me!</FancyButton>
        <h3 onClick={handleClick}>点击</h3>
        <TextInputWithFocusButton />
    </div>;
};

/* 父组件访问子组件：结合使用 React.forwardRef 和 React.createRef
    1、通过 React.createRef 创建一个 ref
    2、将 ref 传递给子组件
    3、子组件通过 React.forwardRef((props, ref) => ...) 封装并获取 ref 属性
    4、子组件中再将 ref 属性传递给 DOM 元素
    5、父组件可通过 ref.current 可获取步骤 4 中 DOM 节点对象
*/