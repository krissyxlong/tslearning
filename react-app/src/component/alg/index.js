
import React, { Component }  from 'react'
import { selectSort, paoSort } from '../components/sortSelect';
import erfen from '../components/erfen';
import inserSort from '../components/insertSort';
import shellSort from '../components/shellSort';
import mergeSort from '../components/mergeSort';
import quickSort from '../components/quickSort';
import binarySort from '../components/binarySort';
import countSort from '../components/countSort';
// import '../style.less';

class Block extends Component {
    render() {
        const { title, explanation, exp } = this.props;
        return <div className="block" style={{ marginTop:20 }}>
            <h3 className="title" style={{ color: 'red' }}>{title}</h3>
            <div className="explanation">{explanation}</div>
            <div className="exp">{exp}</div>
        </div>
    }
}

class Container extends Component {

    render() {
        console.log('-----------11', inserSort([49, 38, 65, 97, 76, 13, 27, 49, 55, 4]));

        return <div>
            <div>
                <h5>稳定：如果a原本在b前面，而a=b，排序之后a仍然在b的前面；</h5>
                <h5>不稳定：如果a原本在b的前面，而a=b，排序之后a可能会出现在b的后面；</h5>
                <h5>内排序：所有排序操作都在内存中完成；</h5>
                <h5>外排序：由于数据太大，因此把数据放在磁盘中，而排序通过磁盘和内存的数据传输才能进行；</h5>
                <h5>时间复杂度: 一个算法执行所耗费的时间。</h5>
                <h5>空间复杂度: 运行完一个程序所需内存的大小。</h5>
            </div>
            <Block
                title="二分查找"
                explanation="数组有序,时间复杂度 最坏: T(n) = O(log2n), 比较到最后一个才找到, 最好: 在中间; 控件复杂度: S(n) = n"
                exp={`输入: [1, 3, 5, 6, 8, 10], 5,  结果: ${erfen([1, 3, 5, 6, 8, 10], 5)}`}
            />
            <Block
                title="冒泡排序"
                explanation="需比较 N*(N-1）/2 次, 交换最多为 n^2/2, 时间复杂度为: O(n^2). 是一种稳定算法"
                exp={`输入: [3, 1, 5, 10, 0, 8],  结果: ${paoSort([3, 1, 5, 10, 0, 8]).join(',')}`}
            />
            <Block
                title="选择排序"
                explanation="需比较 N*(N-1）/2, 最多交换 N 次, 时间复杂度为: O(n^2). 比冒泡排序快"
                exp={`输入: [3, 1, 5, 10, 0, 8],  结果: ${selectSort([3, 1, 5, 10, 0, 8]).join(',')}`}
            />
            <Block
                title="插入排序"
                explanation="最差需比较 N*(N-1）/2, 时间复杂度为: O(n^2); 最好需比较 N-1 次, 时间复杂度为 O(N), 进行大量排序时不建议使用"
                exp={`输入: [3, 1, 5, 10, 0, 8],  结果: ${inserSort([3, 1, 5, 10, 0, 8]).join(',')}`}
            />
            <Block
                title="希尔排序"
                explanation="性能比直接插入排序好, 最佳情况：T(n) = O(nlog2n)    最坏情况：T(n) = O(nlog2n)    平均情况：T(n) = O(nlogn)"
                exp={`输入: [49, 38, 65, 97, 76, 13, 27, 49, 55, 4],  结果: ${shellSort([49, 38, 65, 97, 76, 13, 27, 49, 55, 4]).join(',')}`}
            />
            <Block
                title="归并排序"
                explanation="速度仅次于快速排序, 最佳情况：T(n) = O(n)    最坏情况：T(n) = O(nlogn)    平均情况：T(n) = O(nlogn)"
                exp={`输入: [49, 38, 65, 97, 76, 13, 27, 49, 55, 4],  结果: ${mergeSort([49, 38, 65, 97, 76, 13, 27, 49, 55, 4]).join(',')}`}
            />
            <Block
                title="快速排序"
                explanation="最佳情况：T(n) = O(nlogn)    最坏情况：T(n) = O(n^2)    平均情况：T(n) = O(nlogn)"
                exp={`输入: [49, 38, 65, 97, 76, 13, 27, 49, 55, 4],  结果: ${quickSort([49, 38, 65, 97, 76, 13, 27, 49, 55, 4]).join(',')}`}
            />
            <Block
                title="堆排序"
                explanation="最佳情况：T(n) = O(nlogn)    最坏情况：T(n) = O(nlogn)    平均情况：T(n) = O(nlogn).  由于建初始堆所需的比较次数较多，所以堆排序不适宜于记录数较少的文件。它是不稳定的排序方法。"
                exp={`输入: [49, 38, 65, 97, 76, 13, 27, 49, 55, 4],  结果: ${binarySort([49, 38, 65, 97, 76, 13, 27, 49, 55, 4]).join(',')}`}
            />
            <Block
                title="计数排序"
                explanation="只能排序整数.  最佳情况：T(n) = O(n+k)  最差情况：T(n) = O(n+k)  平均情况：T(n) = O(n+k). 不是比较排序,速度快于任何比较排序算法,但是需要消耗额外的内容 "
                exp={`输入: [49, 38, 65, 97, 76, 13, 27, 49, 55, 4],  结果: ${countSort([49, 38, 65, 97, 76, 13, 27, 49, 55, 4]).join(',')}`}
            />
        </div>
    }
}

export default Container;

