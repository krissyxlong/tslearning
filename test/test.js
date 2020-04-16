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
    '49': 'jump',
    '50': 'crouch',
    '51': 'defense',
    '52': 'attack'
};

var commandStack = [];
document.onkeypress = function(ev) {
    var keyCode = ev.keyCode;
    var command = makeCommand(Ryu, commands[keyCode]);
    if (command) {
        command();
        commandStack.push(command);
    }
}

document.getElementById('replay').onclick = function() {
    var command;
    while(command = commandStack.shift()) {
        command();
    }
}