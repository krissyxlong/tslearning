/* const btn1 = document.getElementById("button1");
const btn2 = document.getElementById("button2");
const btn3 = document.getElementById("button3");

// 菜单程序: 传统面向对象语言命令模式的实现
const setCommand = function(button, command) {
    button.onclick = function() {
        command.execute();
    };
}

var MenuBar = {
    refresh: function() {
        console.log('刷新菜单');
    }
};
var SubMenu = {
    add: function() {
        console.log('增加子菜单');
    },
    del: function() {
        console.log('删除子菜单');
    }
};

var RefreshMenuBarCommand = function(receiver) {
    this.receiver = receiver;
}
RefreshMenuBarCommand.prototype.execute = function() {
    this.receiver.refresh();
}
var AddSubMenuCommand = function(receiver) {
    this.receiver = receiver;
};
AddSubMenuCommand.prototype.execute = function() {
    this.receiver.add();
};
var DelSubMenuCommand = function(receiver) {
    this.receiver = receiver;
};
DelSubMenuCommand.prototype.execute = function() {
    this.receiver.del();
}
// 把命令接收者传入 command 对象中，并将 command 安装在 button 上
var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
var delSubMenuCommand = new DelSubMenuCommand(SubMenu);

setCommand(btn1, refreshMenuBarCommand);
setCommand(btn2, addSubMenuCommand);
setCommand(btn3, delSubMenuCommand);
 */

 // 宏命令
var closeDoorCommand = {
    execute: () => {
        console.log('关门');
    }
};
var openQQCommand = {
    execute: () => {
        console.log('登录QQ');
    }
};
var openPcCommand = {
    execute: () => {
        console.log('开电脑');
    }
};
var MaroCommand = function() {
    return {
        commandList: [],
        add: function(command) {
            this.commandList.push(command);
        },
        execute: function() {
            for (var i = 0; i < this.commandList.length; i++) {
                this.commandList[i].execute();
            }
        }
    };
};
var maroCommand = MaroCommand();
maroCommand.add(closeDoorCommand);
maroCommand.add(openQQCommand);
maroCommand.add(openPcCommand);
maroCommand.execute();
