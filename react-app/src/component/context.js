import React, { useState } from "react";
import ThemeContext from "../config/context";

const C = () => {
    const color = React.useContext(ThemeContext);
    return (
        <div style={{ color }}>
            <h4>组件C</h4>
            Hello World
        </div>
    );
};

const B = () => {
    return (
        <div>
            <h2>组件B</h2>
            <C />
        </div>
    );
};

const A = () => {
    const [color, setColor] = useState('green');
    const changeColor = () => {
        const value = color === 'green' ? 'red' : 'green';
        setColor(value);
    };
    return <div>
        <button onClick={changeColor}>change color</button>
        <ThemeContext.Provider value={color}>
            <B />
        </ThemeContext.Provider>
    </div>;
};

export default A;
