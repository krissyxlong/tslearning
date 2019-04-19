// 一、文本元素
function ReactDOMTextComponent(text) {
    //存下当前的字符串
    this._currentElement = '' + text;
    //用来标识当前component
    this._rootNodeID = null;
}
//component渲染时生成的dom结构
ReactDOMTextComponent.prototype.mountComponent = function(rootID) {
    this._rootNodeID = rootID;
    return '<span data-reactid="' + rootID + '">' + this._currentElement + '</span>';
}

// 二、浏览器基本元素
function ReactDOMComponent(element){
    //存下当前的element对象引用
    this._currentElement = element;
    this._rootNodeID = null;
}
ReactDOMComponent.prototype.mountComponent = function(rootID){
    //赋值标识
    this._rootNodeID = rootID;
    const props = this._currentElement.props;
    let tagOpen = '<' + this._currentElement.type;
    let tagClose = '</' + this._currentElement.type + '>';

    //加上reactid标识
    tagOpen += ' data-reactid=' + this._rootNodeID;

    //拼凑出属性
    for (let propKey in props) {

        //这里要做一下事件的监听，就是从属性 props 里面解析拿出 on 开头的事件属性的对应事件监听
        if (/^on[A-Za-z]/.test(propKey)) {
            let eventType = propKey.replace('on', '');
            //针对当前的节点添加事件代理,以_rootNodeID为命名空间
            // todo 给 data-reactid-id 的元素添加事件监听；
            console.log('事件监听');
            // $(document).delegate('[data-reactid="' + this._rootNodeID + '"]', eventType + '.' + this._rootNodeID, props[propKey]);
        }

        //对于children属性以及事件监听的属性不需要进行字符串拼接
        //事件会代理到全局。这边不能拼到dom上不然会产生原生的事件监听
        if (props[propKey] && propKey != 'children' && !/^on[A-Za-z]/.test(propKey)) {
            tagOpen += ' ' + propKey + '=' + props[propKey];
        }
    }
    //获取子节点渲染出的内容
    let content = '';
    const children = props.children || [];

    const childrenInstances = []; //用于保存所有的子节点的componet实例，以后会用到
    let that = this;
    children.forEach(function(key, child) {
        //这里再次调用了instantiateReactComponent实例化子节点component类，拼接好返回
        let childComponentInstance = instantiateReactComponent(child);
        childComponentInstance._mountIndex = key;

        childrenInstances.push(childComponentInstance);
        //子节点的rootId是父节点的rootId加上新的key也就是顺序的值拼成的新值
        let curRootId = that._rootNodeID + '.' + key;
        //得到子节点的渲染内容
        let childMarkup = childComponentInstance.mountComponent(curRootId);
        //拼接在一起
        content += ' ' + childMarkup;

    });

    //留给以后更新时用的这边先不用管
    this._renderedChildren = childrenInstances;

    //拼出整个html内容
    return tagOpen + '>' + content + tagClose;
}

// 三、自定义类型
function ReactCompositeComponent(element){
    //存放元素element对象
    this._currentElement = element;
    //存放唯一标识
    this._rootNodeID = null;
    //存放对应的ReactClass的实例
    this._instance = null;
}

//用于返回当前自定义元素渲染时应该返回的内容
ReactCompositeComponent.prototype.mountComponent = function(rootID){
    this._rootNodeID = rootID;
    //拿到当前元素对应的属性值
    var publicProps = this._currentElement.props;
    //拿到对应的ReactClass
    var ReactClass = this._currentElement.type;
    // Initialize the public class
    var inst = new ReactClass(publicProps);
    this._instance = inst;
    //保留对当前comonent的引用，下面更新会用到
    inst._reactInternalInstance = this;

    if (inst.componentWillMount) {
        inst.componentWillMount();
        //这里在原始的reactjs其实还有一层处理，就是  componentWillMount调用setstate，不会触发rerender而是自动提前合并，这里为了保持简单，就略去了
    }
    //调用ReactClass的实例的render方法,返回一个element或者一个文本节点
    var renderedElement = this._instance.render();
    //得到renderedElement对应的component类实例
    var renderedComponentInstance = instantiateReactComponent(renderedElement);
    this._renderedComponent = renderedComponentInstance; //存起来留作后用

    //拿到渲染之后的字符串内容，将当前的_rootNodeID传给render出的节点
    var renderedMarkup = renderedComponentInstance.mountComponent(this._rootNodeID);

    //之前我们在React.render方法最后触发了mountReady事件，所以这里可以监听，在渲染完成后会触发。
    $(document).on('mountReady', function() {
        //调用inst.componentDidMount
        inst.componentDidMount && inst.componentDidMount();
    });

    return renderedMarkup;
}


// component 工厂, 不管来了什么类型的 node， 都返回一个 component 实例
function instantiateReactComponent(node){
    if(typeof node === 'string' || typeof node === 'number'){
        return new ReactDOMTextComponent(node)
    }
    if(typeof node === 'object' && typeof node.type === 'string'){
        //注意这里，使用了一种新的component
        return new ReactDOMComponent(node);
    }
    // 自定义的元素节点
    if(typeof node === 'object' && typeof node.type === 'function'){
        //注意这里，使用新的component,专门针对自定义元素
        return new ReactCompositeComponent(node);

    }
}

function ReactElement(type,key,props){
    this.type = type;
    this.key = key;
    this.props = props;
}

const React = {
    nextReactRootIndex:0,
    createElement:function(type,config,children){
        let props = {},propName;
        config = config || {}
        //看有没有key，用来标识element的类型，方便以后高效的更新，这里可以先不管
        let key = config.key || null;

        //复制config里的内容到props
        for (propName in config) {
            if (config.hasOwnProperty(propName) && propName !== 'key') {
                props[propName] = config[propName];
            }
        }

        //处理children,全部挂载到props的children属性上
        //支持两种写法，如果只有一个参数，直接赋值给children，否则做合并处理
        const childrenLength = arguments.length - 2;
        if (childrenLength === 1) {
            props.children = $.isArray(children) ? children : [children] ;
        } else if (childrenLength > 1) {
            const childArray = Array(childrenLength);
            for (let i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
            }
            props.children = childArray;
        }

        return new ReactElement(type, key,props);

    },
    render:function(element,container) { // 入口，负责调度渲染

        const componentInstance = instantiateReactComponent(element);
        const markup = componentInstance.mountComponent(React.nextReactRootIndex++);
        container.innerHTML = markup;
        //触发完成mount的事件
        const event = new CustomEvent('mountReady', {detail: {some: 'data'}});
        document.dispatchEvent(event);
    }
};
