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
