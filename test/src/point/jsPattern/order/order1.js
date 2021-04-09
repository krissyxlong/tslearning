// 键盘游戏
console.log('键盘游戏');
var Ryu = {
  attack: function() {
      console.log('attack');
  },
  defense: function() {
      console.log('defense');
  },
  jump: function() {
      console.log('jump');
  },
  crouch: function() {
      console.log('crouch');
  }
};

var makeCommand = function(receiver, state) {
  return function() {
      receiver[state] && receiver[state]();
  }
};

var commands = {
  'w': 'jump',
  'a': 'crouch',
  's': 'defense',
  'd': 'attack'
};

var commandStack = [];
document.onkeypress = function(ev) {
  var key = ev.key;
  var command = makeCommand(Ryu, commands[key]);
  if (command) {
      command();
      commandStack.push(command);
  }
}

document.getElementById('replay').onclick = function() {
  var command;
  console.log('--------: 重放');
  while(command = commandStack.shift()) {
      command();
  }
}