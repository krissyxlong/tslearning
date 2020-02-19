import React, { useEffect, useState } from 'react';

// 简单定时器场景
export default () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const id = setInterval(() => { // 每次执行都会重新生成定时器
            setCount(c => c + 1);
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return <div>定时器：{count}</div>
}

// 定时器加步长
export const Step = () => {
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(1);
    useEffect(() => {
        const id = setInterval(() => {
            setCount(c => c + step);
        }, 1000);
        return () => clearInterval(id);
    }, [step]);
    return <div>
        <h1>步长定时器：{count}</h1>
        <input value={step} onChange={e => setStep(Number(e.target.value))} />
        {/* 修改 step 会重启定时器 */}
    </div>;
};
