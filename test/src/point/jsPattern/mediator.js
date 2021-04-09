/* 初始化玩家对象 */
// function Player(name, teamColor) {
//   this.name = name;
//   this.teamColor = teamColor; // 队伍颜色
//   this.state = 'live'; 
//   this.partners = []; // 队友
//   this.enemies = []; // 敌人
// };
// Player.prototype.win = function () {
//   console.log(this.name + ' won');
// }
// Player.prototype.lose = function () {
//   console.log(this.name + ' lost');
// }
// Player.prototype.die = function () {
//   // 需遍历队友生存状态，如果全部死亡，则游戏结束；同时，敌人赢得胜利
//   this.state = 'dead';
//   let is_all_dead = this.partners.every(p => {
//     return p.state === 'dead';
//   });
//   if (is_all_dead) {
//     this.lose();
//     // 通知队友全部死亡
//     for ( let i = 0, partner; partner = this.partners[ i++ ]; ){
//       partner.lose();
//     }
//     // 通知敌人游戏胜利
//     for ( let i = 0, enemy; enemy = this.enemies[ i++ ]; ){
//       enemy.win();
//     }
//   }
// }
// /* 创建玩家 */
// let players = []
// let playerFactory = function( name, teamColor ){
//   let newPlayer = new Player( name, teamColor );
//   for ( let i = 0, player; player = players[ i++ ]; ){ 
//     // 通知所有的玩家，有新角色加入
//     if ( player.teamColor === newPlayer.teamColor ){ // 如果是同一队的玩家
//       player.partners.push(newPlayer); // 相互添加到队友列表
//       newPlayer.partners.push(player);
//     } else {
//       player.enemies.push(newPlayer); // 相互添加到敌人列表
//       newPlayer.enemies.push(player);
//     }
//   }
//   players.push( newPlayer );
//   return newPlayer;
// };

// /* 红队 */
// let player1 = playerFactory('A1', 'red');
// let player2 = playerFactory('A2', 'red');
// let player3 = playerFactory('A3', 'red');
// let player4 = playerFactory('A4', 'red');
// /* 蓝队 */
// let player5 = playerFactory('B1', 'blue');
// let player6 = playerFactory('B2', 'blue');
// let player7 = playerFactory('B3', 'blue');
// let player8 = playerFactory('B4', 'blue');

// /* 红队玩家全部死亡 */
// player1.die();
// player2.die();
// player3.die();
// player4.die();

/* 玩家增多带来的问题：
  玩家之间因为 partner\enemy 相互耦合
  状态变更时，需要显式遍历通知其他对象
  如果几十支队伍同时玩，如“吃鸡”，上面模式就 。。。 了
*/

/****************************** 改为中介者模式 *******************************/
function Player(name, teamColor) {
  this.name = name;
  this.teamColor = teamColor; // 队伍颜色
  this.state = 'live'; 
};
Player.prototype.win = function () {
  console.log(this.name + ' won');
}
Player.prototype.lose = function () {
  console.log(this.name + ' lost');
}
// 具体执行逻辑转给中介者执行
Player.prototype.die = function () { // 玩家死亡
  this.state = 'dead';
  playerDirector.receiveMessage('playerDead', this);
}
Player.prototype.remove = function () { // 移除玩家
  playerDirector.receiveMessage('removePlayer', this);
}
Player.prototype.changeTeam = function (color) { // 玩家换队
  playerDirector.receiveMessage('changeTeam', this, color);
}
/* 创建玩家 */
let players = []
let playerFactory = function( name, teamColor ){
  let newPlayer = new Player( name, teamColor );
  playerDirector.receiveMessage('addPlayer', newPlayer); // 之前的耦合逻辑转给中介者
  return newPlayer;
};

/* 实现 playerDirector
  一种：发布、订阅模式。player 作为发布者，playerDirecor 作为订阅者。
  二种：playerDirector 开发接口供 player 调用，如上代码所示
  两者没本质区别
*/

let playerDirector  = (function () {
  let players = {},
      operations = {}; // 中介者可以执行的操作
  // 新增玩家
  operations.addPlayer = function (player) {
    let teamColor = player.teamColor;
    players[teamColor] = players[teamColor] || [];
    players[teamColor].push(player);
  };
  // 移除玩家
  operations.removePlayer = function (player) {
    let teamColor = palyer.teamColor;
    players[teamColor] = players[teamColor] || [];
    for (let i = teamPlayers.length - 1; i >= 0; i-- ) { // 遍历删除
      if ( teamPlayers[ i ] === player ){
        teamPlayers.splice( i, 1 );
      }
    }
  };
  // 玩家换队
  operations.changeTeam = function (player, newTeamColor) {
    operations.removePlayer(player);
    player.teamColor = newTeamColor; // 改变颜色
    operations.addPlayer(player); // 重新加入队伍
  };
  // 玩家死亡
  operations.playerDead = function( player ){
    let teamColor = player.teamColor,
    teamPlayers = players[ teamColor ]; // 玩家所在队伍
    let all_dead = true;
     for ( let i = 0, tPlayer; tPlayer = teamPlayers[i++]; i < teamPlayers.length){
       if ( tPlayer.state !== 'dead' ){
        all_dead = false;
        break;
      }
    }
    if ( all_dead === true ){ // 全部死亡
      for ( let i = 0, tPlayer; tPlayer = teamPlayers[i++]; i < teamPlayers.length ){
        tPlayer.lose(); // 本队所有玩家 lose
      }
      for ( let color in players ){
        if ( color !== teamColor ){
          let elsePlayers = players[color]; // 其他队伍玩家
          for (let i = 0, ePlayer; ePlayer = elsePlayers[i++]; i < elsePlayers.length) {
            ePlayer.win(); // 其他队伍所有玩家 win
          }
        }
      }
    }
  };
  let receiveMessage = function () {
    let message = Array.prototype.shift.call(arguments);
    operations[message].apply(this, arguments);
  };
  return {
    receiveMessage,
  }
})();

/* 红队 */
let player1 = playerFactory('A1', 'red');
let player2 = playerFactory('A2', 'red');
let player3 = playerFactory('A3', 'red');
let player4 = playerFactory('A4', 'red');
/* 蓝队 */
let player5 = playerFactory('B1', 'blue');
let player6 = playerFactory('B2', 'blue');
let player7 = playerFactory('B3', 'blue');
let player8 = playerFactory('B4', 'blue');

/* 红队玩家全部死亡 */
player1.die();
player2.die();
player3.die();
player4.die();

// player1.remove();
// player2.remove();
// player3.die();
// player4.die();

// player1.changeTeam( 'blue' );
// player2.die();
// player3.die();
// player4.die();