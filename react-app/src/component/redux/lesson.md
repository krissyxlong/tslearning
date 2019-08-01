

/**
 1、原则一：一个应用只能有一个 state 树
 2、原则二：state 是只读的；action 是一个描述变化的普通对象；state 是描述 app 的最小表达式
 3、纯函数：输出完全依赖于输入。redux 包含很多纯函数
 4、原则三：通过发起 action 来改变（action 是纯函数）
*/
## lesson4
纯函数使得 UI 或视图层更可预测。由 react 探索。
redux 使用纯函数来描述变化，入参为之前的 state 和 action。
所有 redux 应用中都有一个函数来处理整个应用的 state 和分发的 action，来返回一个新的 state 数。

## lesson5
编写 reducer 函数，入参为 state 和 action

## lesson6
redux 的一个函数 createStore：绑定了 redux 的三大原则。
维护应用的 state；分发 action；reducer 怎样通过 action 变更 state；
对应三个方法：getState(); subscribe（）；dispatch()；
