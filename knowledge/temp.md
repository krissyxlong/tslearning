[A deep dive into react fiber internals](https://blog.logrocket.com/deep-dive-into-react-fiber-internals/) 翻译
- 好奇 ReactDOM.render(<App />, document.getElementById('root')) 到底发生了什么吗？
- 我们都知道 ReactDOM 会构建 DOM 树，然后渲染到屏幕。但是 react 是怎样构建 DOM 树的呢？当状态发生变化后它是怎样更新的呢？
- 此文从 15.0.0 开始解释 react 怎样构建 DOM 树，然后解释 16.0.0 怎样解决这个问题，此文包含很多开发者不需要接触到的概念。
### stack reconciler
- 从熟悉的
```javascript
ReactDOM.render(<App />, document.getElementById('root'))
```
开始说起。
- reactDOM 模块将 <App /> 传递给 __reconciler__。这有两个问题：
1、<App />是什么？2、什么是 reconciler?
- <App /> 是一个 react 元素，元素描述了树。
> An element is a plain object describing a component instance or DOM node and its desired properties.
- 换而言之，元素不是真正的 DOM 节点或者组件实例；他们只是在告诉 react 元素的类型，属性，以及元素的 children 是什么。
- 这就是 react 真正强大的地方。react 抽象出了关于构建、渲染、处理真实 DOM 的生命周期这些复杂的部分。方便更好理解，下面看下 a traditional approach using object-oriented.
- 在典型的基于对象编程中，开发者需要实例化，并处理每个 DOM 的生命周期。例如，如果想创建一个简单的表单和提交按钮，开发者也需要好好维护状态。
- 理解这点很重要：react 组件只是对屏幕需要渲染内容的一种描述，创建的时候并不会真正的引起渲染。这使的 react 能更容易地解析和遍历他们，来创建 DOM 树。真正的渲染是在遍历完成后才发生。
- 当 react 碰到一个 class 或者函数组件，它会问组件渲染的内容，并调用 render 方法来确认他们想渲染的元素，然后不断递归。
- 这种为了知道整个 app 树底层的 DOM 标签而不断递归遍历的过程叫做 __reconciliation__ 。reaconciliation 的结果就是 react 知道了 DOM 树的结果，然后 __renderer__ 例如 react-dom 或者 react-native 会使用最小的代价来更新 DOM 节点。
- 所以，这也意味着：当执行 ReactDOM.render() 或者 setState 时，React 会执行 reconciliation。
- 现在已经了解了 reconciliation 的过程，下面看下这种模型的缺点。
>（题外话：为什么叫做 stack reconciler，这来源于堆的数据结构，后进先出机制。结果表明，做一次有效的递归，都与堆有关。）
### 递归
- reconciliation 算法有点类似递归算法。一个更新会导致整个子树马上被重新渲染。尽管这可以 works well，但是有两个限制
> (1) 每次 UI 更新并不需要立马被执行，事实上这非常浪费性能，会引起掉帧，降低用户体验。
(2) 不同类型的更新有不同的优先级-动画更新需要被更快执行。
- 现在已经理解了掉帧，但为什么递归会引起掉帧呢？这涉及到帧率。
- 帧率。。。
- 当每帧的渲染内容耗时超过了 16 ms 就会导致掉帧。这就是为什么需要按更新类型来区分优先级，而不是盲目地执行每次传递给 reconciler 的更新。另外需要有的特征是：可以中止、继续下一帧的 work，这样，react 可以更好的控制 16ms 的渲染工作。
- 这就是 react team 为什么重写 reconciliation算法的原因，新算法叫 __Fiber__ 。下面开始了解 Fiber。

----------
### How fiber works
- 先了解下 fiber 需要有的功能：
> (1) 给不同的 work 安排优先级；(2) 可中止 work，并稍后返回；(3) 取消不再需要的 work；(4) 重复使用之前的 work。
- 实现这样的过程的最大挑战就是 js engine 怎么工作

### js execution stack
- 当写 js 函数时，js engine 都会创建一个函数执行环境。每次 js engine 开始时，都会创建一个保存着全局变量的全局执行环境，例如浏览器中的 window 对象和 nodejs 中的 global 对象。这些环境都是用栈数据结构来处理的。
- 事件队列原理：js engine 需等执行栈变空才会处理事件队列。虽然事件队列的事件被称为异步事件，但是异步只与到达队列的时间有关，而不是被处理的时间。
- 回到 __stack reconciler__。当 react 遍历树的时候，就是这么在执行栈里操作的。所以，当有更新的时候，更新会被 push 进事件队列，当执行栈变空的时候，更新才会被处理。这就是 Fiber 解决的问题。
> Fiber is reimplementation of the stack, specialized for react components.You can think of a single fiber as a virtual stack frame.  The advantage of reimplementating the stack is that you can keep stack frames in memory and execute them however you want. This is crucial for accomplishing the goals we have for scheduling. Aside from scheduling, manually dealing with stack frames unlocks the potential for features such as concurrency and error boundaries.
- 一个 fiber 代表一个虚拟栈的 work。在之前的版本中，react 创建一个代表 element 的对象树，这些树时不能变更的，然后递归遍历整个树。而当前的版本，react 创建了可以该改变的 fiber node tree。__fiber node 保存了组件的 state，props，和底层的 DOM 元素。__
- 因为 fiber node 是可以改变的，react 不需要在每次更新中都重建每个节点。当有更新是，可以克隆，复制节点。在 fiber tree 中。react 不会递归遍历，__instead, it creates a singly linked list and does a parent-first, depth-first traversal.__
### singly linked list of fiber nodes
- a fiber node 代表一个栈帧，同时也代表一个 react 组件实例。它由以下元素组成：
##### Type | key | Child | Siblings
#### Return


