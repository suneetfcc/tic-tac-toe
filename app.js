var name = prompt('Enter your name', 'Player1');
name = name[0].toUpperCase() + name.substr(1);
var player1 = new Player({
    id: 0,
    name: name,
    symbol: 'X',
    type: 'HUMAN'
});

var player2 = new Player({
    id: 1,
    name: 'Nexus5',
    symbol: 'O',
    type: 'COMPUTER'});

var board = new Board([player1, player2]);
board.init();
