function Player(params) {
    this.name   = params.name;
    this.symbol = params.symbol;
    this.type   = params.type;  // 'HUMAN' or 'COMPUTER'
}

Player.prototype.move = function(allowed) {
    if (this.type === 'COMPUTER') {
        return random_move(allowed);
    } //wait for user input if player is human
};

Player.prototype.display = function () {
    return this.symbol;
};

function random_move(allowed) {
    var r = Math.floor(Math.random() * allowed.length);
    return allowed[r];
}
