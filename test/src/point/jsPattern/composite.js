var closeDoorCommand = {
  execute: () => {
      console.log('1：关门');
  }
};
var openPcCommand = {
  execute: () => {
      console.log('2：开电脑');
  }
};
var openQQCommand = {
  execute: () => {
      console.log('3：登录QQ');
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
maroCommand.add(openPcCommand);
maroCommand.add(openQQCommand);
maroCommand.execute();