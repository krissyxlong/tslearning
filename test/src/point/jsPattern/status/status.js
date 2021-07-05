/**
 * 1.0 开关
 */
// var Light = function () {
//   this.state = 'off';
//   this.button = null;
// };
// Light.prototype.init = function () {
//   var button = document.createElement('button');
//   var self = this;

//   button.innerHTML = '开关';
//   this.button = document.body.appendChild(button);
//   this.button.onclick = function () {
//     self.buttonWasPressed();
//   }
// };
// Light.prototype.buttonWasPressed = function () {
//   if (this.state === 'off') {
//     console.log('开灯');
//     this.state = 'on';
//   } else if (this.state === 'on') {
//     console.log('关灯');
//     this.state = 'off';
//   }
// }
// var light = new Light();
// light.init();
// /* 简单的强壮的状态机 */

/**
 * 1.2 开关
 * 当增加强光、弱光后，上述逻辑需要改动，且每次新增状态都需改变，如下：
 */
// Light.prototype.buttonWasPressed = function () {
//   if (this.state === 'off') {
//     console.log('弱光');
//     this.state = 'weakLight';
//   } else if (this.state === 'weakLight') {
//     console.log('强光');
//     this.state = 'strongLight';
//   } else if (this.state === 'strongLight') {
//     console.log('关灯');
//     this.state = 'off';
//   }
// };
/**
 * 问题：
 * 1、违反“开放-封闭”原则，新增、修改状态都要改动 buttonPressed
 * 2、所有跟状态相关的行为都封装在 buttonPressed 方法中，后期会无限膨胀
 * 3、状态切换不明显，通过 if\else 堆砌
 */

/**
 * 1.3 开关
 * 使用状态模式优化：把每种状态封装成单独的类，状态间的切换封装成状态类。
 */
// 三个状态类
// OffLightState:
var OffLightState = function (light) {
  this.light = light;
};
OffLightState.prototype.buttonWasPressed = function () {
  console.log('弱光'); // offLightState 对应的行为 
  this.light.setState(this.light.weakLightState);
};
// WeakLightState:
var WeakLightState = function (light) {
  this.light = light;
};
WeakLightState.prototype.buttonWasPressed = function () {
  console.log('强光'); // weakLightState 对应的行为 
  this.light.setState(this.light.strongLightState);
};
// StrongLightState:
var StrongLightState = function (light) {
  this.light = light;
};
StrongLightState.prototype.buttonWasPressed = function () {
  console.log('关灯'); // strongLightState 对应的行为
  this.light.setState(this.light.offLightState); // 切换状态到 offLightState
};

var Light = function () {
  this.offLightState = new OffLightState(this);
  this.weakLightState = new WeakLightState(this);
  this.strongLightState = new StrongLightState(this);
  this.button = null;
};

Light.prototype.init = function () {
  var button = document.createElement('button'),
    self = this;
  this.button = document.body.appendChild(button);
  this.button.innerHTML = '开关';
  this.currState = this.offLightState;
  this.button.onclick = function () {
    self.currState.buttonWasPressed();
  }
};
Light.prototype.setState = function (newState) {
  this.currState = newState;
}
var light = new Light();
light.init();
/* 状态模式使每个状态和它对应的行为之间的关系局部化，
这些行为被分散和封装在各自对应的状态类之中，便于阅读和管理
当需要新增状态时，只需增加一个状态类
 */

/* 2、见 PPT */

var FSM = {
  walk: {
    attack: function () {
      console.log('攻击');
    },
    defense: function () {
      console.log('防御');
    },
    jump: function () {
      console.log('跳跃');
    }
  },
  attack: {
    defense: function () {
      console.log('攻击的时候不能防御');
    },
    jump: function () {
      console.log('攻击的时候不能跳跃');
    },
  }
},

var getUserInfo = function () {
  ajax('http:// xxx.com/userInfo', function (data) {
    onsole.log('userId: ' + data.userId);
    onsole.log('userName: ' + data.userName);
    onsole.log('nickName: ' + data.nickName);
  });
};
var getUserInfo = function () {
  ajax('http:// xxx.com/userInfo', function (data) {
    printDetails(data);
  });
};
var printDetails = function (data) {
  console.log('userId: ' + data.userId);
  console.log('userName: ' + data.userName);
  console.log('nickName: ' + data.nickName);
};


var paging = function (currPage) {
  if (currPage <= 0) {
    currPage = 0;
    jump(currPage); // 跳转 
  } else if (currPage >= totalPage) {
    currPage = totalPage;
    jump(currPage);
  } else {
    jump(currPage);
  }
};

var paging = function (currPage) {
  if (currPage <= 0) {
    currPage = 0;
  } else if (currPage >= totalPage) {
    currPage = totalPage;
  }
  jump(currPage); // 跳转 
}

var getPrice = function (price) {
  var date = new Date();
  if (date.getMonth() >= 6 && date.getMonth() <= 9) { // 是否为夏天       
    return price * 0.8;
  }
  return price;
};// 可以优化为如下代码：
var isSummer = function () {
  var date = new Date();
  return date.getMonth() >= 6 && date.getMonth() <= 9;
};
var getPrice = function (price) {
  if (isSummer()) { // 夏天     
    return price * 0.8;
  }
  return price;
};


var createXHR = function () {
  var xhr;
  try {
    xhr = new ActiveXObject('MSXML2.XMLHttp.6.0');
  } catch (e) {
    try {
      xhr = new ActiveXObject('MSXML2.XMLHttp.3.0');
    } catch (e) {
      xhr = new ActiveXObject('MSXML2.XMLHttp');
    }
  }
  return xhr;
};
var xhr = createXHR();
var createXHR = function () {
  var versions = ['MSXML2.XMLHttp.6.0ddd', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
  for (var i = 0, version; version = versions[i++];) {
    try {
      return new ActiveXObject(version);
    } catch (e) {
    }
  }
};
var xhr = createXHR();

var del = function (obj) {
  if (obj.isReadOnly) {
    return;
  }
  if (obj.isFolder) {
    return deleteFolder(obj);
  }
  if (obj.isFile) {
    return deleteFile(obj);
  }
};


var googleMap = {
  show: function () {
    console.log('开始渲染谷歌地图');
  }
};
var baiduMap = {
  show: function () {
    console.log('开始渲染百度地图');
  }
};
var renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show();
  }
};
renderMap(googleMap); // 输出:开始渲染谷歌地图
renderMap(baiduMap); // 输出:开始渲染百度地图

// 假如没有统一接口
var googleMap = {
  show: function () {
    console.log('开始渲染谷歌地图');
  }
};
var baiduMap = {
  display: function () {
    console.log('开始渲染百度地图');
  }
};
var baiduMapAdapter = {
  show: function () {
    return baiduMap.display();
  }
}
renderMap(googleMap);
renderMap(baiduMapAdapter);

