import React from 'react';
import useWindowWidth from './component/hooks/useWindowWidth';
import Context from './component/hooks/context';
import SetInterval, { Step } from './component/hooks/setInterval';
import Video from './component/video';
import './App.css';

const App = () => {
    // const width = useWindowWidth();
    return <div className="App">
        <div id='hello'>hello world</div>
        {/*<p>窗口宽度：{width}</p>*/}
        {/*<Context />*/}
        {/*<SetInterval />*/}
        {/*<Step />*/}
        <Video />
    </div>;
};

export default App;
