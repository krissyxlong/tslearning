console.log('test compose pattern');
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

/* 空调 */
var openAcCommand = {
    execute: () => {
        console.log('1：打开空调');
    }
};

/* 电视、音响 */
var openTvCommand = {
    execute: () => {
        console.log('2：打开电视');
    }
};
var openSoundCommand = {
    execute: () => {
        console.log('2：打开音响');
    }
};
var maroCommand1 = MaroCommand();
maroCommand1.add(openTvCommand);
maroCommand1.add(openSoundCommand);

/* 关门、开电脑、登录QQ */
var closeDoorCommand = {
    execute: () => {
        console.log('3：关门');
    }
};
var openQQCommand = {
    execute: () => {
        console.log('3：登录QQ');
    }
};
var openPcCommand = {
    execute: () => {
        console.log('3：开电脑');
    }
};

var maroCommand2 = MaroCommand();
maroCommand2.add(closeDoorCommand);
maroCommand2.add(openPcCommand);
maroCommand2.add(openQQCommand);

var maroCommand = MaroCommand();
maroCommand.add(openAcCommand);
maroCommand.add(maroCommand1);
maroCommand.add(maroCommand2);

maroCommand.execute();
/* 基本对象可以被组合成更复杂的对象，组合对象又可以被组合，然后不断递归。让整个对象运转起来只需执行 execute 方法。深度优先遍历 */