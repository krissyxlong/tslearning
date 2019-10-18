### 提升 react 性能技巧

## 1.使用纯函数
纯组件：相同的状态和 props 渲染相同的输出，如 react.pureComponent

## 2.使用 react.memo 创建函数组件
是高阶函数，类似 react.pureComponent(针对类组件),通过记忆上次某个输入 prop 的执行结果，避免重新渲染来提升应用性能。

## 3.使用 shouldComponentUpdate
有自信就可以使用

## 4.懒加载组件
使用 Suspense 和 lazy

## 5.使用 react fragment

## 6.不使用内联函数
使用内联函数，在每次 render 过程中都会创建一个新的函数实例。当 react 进行虚拟 DOM diff 时，它每次都会找到一个新的函数实例；
因此在渲染阶段它会将旧实例扔给垃圾回收。

## 7.在 constructor 的早期绑定函数

## 8.箭头函数
箭头函数式对象实例，而不是原型属性。在组件复用时，在组件外创建的多个对象中都会有这些函数的多个实例。复用性不高。

## 9.避免使用内联样式属性

## 10.优化 react 中的条件渲染
减少 react 组件的安装与卸载，操作昂贵。

## 11.不要在 render 函数中导出数据
核心原则是将 render 函数作为纯函数。











