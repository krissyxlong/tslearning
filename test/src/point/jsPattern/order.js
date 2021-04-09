
const btn1 = document.getElementById("button1");
const btn2 = document.getElementById("button2");
const btn3 = document.getElementById("button3");

/* 菜单程序：执行命令的动作被约定为调用 command 对象的 execute()方法。
通过封装方法调用，我们可以把运算块包装成形。command 对象可以被四处传递，
所以在调用命令的时候，客户(Client)不需要 关心事情是如何进行的。 */
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

// 执行“刷新”
var RefreshMenuBarCommand = function(receiver) {
    this.receiver = receiver;
}
RefreshMenuBarCommand.prototype.execute = function() {
    this.receiver.refresh();
}
// 执行“添加”
var AddSubMenuCommand = function(receiver) {
    this.receiver = receiver;
};
AddSubMenuCommand.prototype.execute = function() {
    this.receiver.add();
};
// 执行“删除”
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