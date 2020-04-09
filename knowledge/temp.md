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

