FAQ
1、概念上，可以把 ref 当成是 class 中的实例变量

性能优化：
1、是否应该将函数从依赖中去除
    答案是否。
    如果必须要要移出去：
    （1）函数不要有依赖；
    （2）如果函数是执行纯计算任务，可以移出 effect；
    （3）用 useCallback 封装，这使得函数依赖没变，函数就不会发生变化。
2、如果 effect 依赖变化太多怎么办？
    想办法移出依赖：使用 useReducer、用 ref；
3、memorize calculations
    const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
4、how to create expensive objects lazily
    给 useState 传递函数：const [rows, setRows] = useState(() => createRows(props.count));
    useRef：const ref = useRef(new IntersectionObserver(onIntersect));
5、are hooks slow because of creating functions in render?
    首先：现代浏览器中，闭包运行速度与 class 运行差异不大，除了在极限情况下。
    然后：hooks 避免了创建实例，事件绑定等操作；hooks 语法不需要深层组件树递归。
6、how to avoid passing callbacks down
7、how to read an often-changing value from useCallback
8、how does react hooks associate hook calls with components?


HOC: 入参为组件，返回组件
定义：
为什么有用：隔离代码
    不要改变入参组件，使用组合的方式
    传递不相关的属性给 wrapped 组件
    最大化可组合性
    包裹 displayName 方便调试
    ref 在 HOC 中传递不一样
怎么写：


JSX in depth
底层，JSX 只是 React.createElement(component, props, ...children) 函数的语法糖
可以使用 . 语法定义，类似对象定义
可以在运行时选择类型
false, null, undefined, and true 都是无效渲染类型
    
    
    
