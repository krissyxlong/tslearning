## [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
> 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用）
```javascript
    const p = new Proxy(target, handler);
    // target：要用使用 proxy 包装的目标对象（可以是任何类型的对象，包括原生数组、函数，甚至另一个代理）。
    // handler：handler 对象是一个容纳一批特定属性的占位符对象。它包含有 Proxy 的各个捕获器（trap）
```
- handler.getPrototypeOf()：Object.getPrototypeOf() 方法陷阱
- handler.setPrototypeOf()：Object.setPrototypeOf() 方法陷阱
- handler.defineProperty(): Object.defineProperty 方法的陷阱
- handler.has(): in 操作符的陷阱。
- handler.get(): 属性读取操作的陷阱。
- handler.set(): 属性设置操作的陷阱。
- handler.deleteProperty(): delete 操作符的陷阱。
- handler.ownKeys(): Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的陷阱。
- handler.apply(): 函数调用操作的陷阱。
- handler.construct(): new 操作符的陷阱。

#### 示例
```javascript
    // 基础示例
    const handler = {
        get: function(obj, prop) {
            return prop in obj ? obj[prop] : 37;
        }
    };

    const p = new Proxy({}, handler);
    p.a = 1;
    p.b = undefined;

    console.log(p.a, p.b);      // 1, undefined
    console.log('c' in p, p.c); // false, 37
```

```javascript
    // 无操作转发代理
    let target = {};
    let p = new Proxy(target, {});

    p.a = 37;   // 操作转发到目标

    console.log(target.a);    // 37. 操作已经被正确地转发
```

```javascript
    // 验证
    let validator = {
        set: function(obj, prop, value) {
            if (prop === 'age') {
                if (!Number.isInteger(value)) {
                    throw new TypeError('The age is not an integer');
                }
                if (value > 200) {
                    throw new RangeError('The age seems invalid');
                }
            }

            // The default behavior to store the value
            obj[prop] = value;

            // 表示成功
            return true;
        }
    };
    let person = new Proxy({}, validator);
    person.age = 100;
    console.log(person.age); 
    // 100
    person.age = 'young'; 
    // 抛出异常: Uncaught TypeError: The age is not an integer
    person.age = 300; 
    // 抛出异常: Uncaught RangeError: The age seems invalid
```

```javascript
    // 扩展构造函数
    // 操作 DOM 节点
    // 值修正及附加属性
    // 通过属性查找数组中的特定对象
```