<!--
 * @Description:  
 * @Author: 
 * @Date: 2020-04-02 16:34:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-02 18:18:51
 -->
for in 
通过浏览器级别的顺序（所以迭代过程中不要进行属性的添加删除，因为不确定这些属性是否会被继续访问到）迭代非 symbol 的可枚举属性，包括继承的可枚举属性。

### 迭代数组
for in 迭代数组时，index 跟对象 key 值一样，迭代的时候不保证顺序。如果要按 index 顺序迭代就不要用 for in.
## 只迭代自己的属性
使用 getOwnPropertyNames() 或 hasOwnProperty() 来过滤

## 为什么使用 for in
既然是为对象设计的，数组也推荐使用 forEach, for...of，那 for...in 是干什么用的呢？
调试用的，查看对象属性！！！

The for...in statement iterates over the enumerable properties of an object, in an arbitrary order. // 迭代可枚举属性，包括继承来的。

The for...of statement iterates over values that the iterable object defines to be iterated over. // 迭代对象定义的可迭代属值


可枚举属性（enumerable）：是否可被 for in 迭代到
Object.keys 返回对象本身具有的可枚举属性（不含继承的）
Object.values 返回对象本身的可枚举属性的键值（不含继承的）
Object.entries：返回对象本身的可枚举属性的键值对数组（不含继承的）
JSON.stringify 也只读取对象本身的可枚举属性