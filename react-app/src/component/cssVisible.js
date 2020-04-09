import React from 'react';

export default () => {
    const clickBlock = () => {
        console.log('clicked');
    };
    return <div className="visible">
        <div className='green block'></div>
        <div className='red block' onClick={clickBlock}></div>
        <div className='blue block'></div>
    </div>
};