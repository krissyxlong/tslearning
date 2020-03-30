/*
 * @Description: 
 * @Author: 
 * @Date: 2020-01-10 16:34:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-30 17:50:26
 */
import React from 'react';
import Demo from './component/hooks/demo';
import './App.css';

const App = () => {
    // const width = useWindowWidth();
    return <div className="App">
        <div id='hello'>hello world</div>
        <Demo />
        {/*<p>窗口宽度：{width}</p>*/}
        {/*<Context />*/}
        {/*<SetInterval />*/}
        {/*<Step />*/}
    </div>;
};

export default App;
