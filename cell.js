Cell.prototype.createCellElm = function() {
    var elm = document.createElement('div');
    elm.classList.add('cell');
    elm.id = 'cell_' + this.row + '_' + this.col;
    var that = this;
    elm.addEventListener('click', function() {
        if (that.isEmpty()) {
            board.step(that.row, that.col);
        }
    });
    elm.innerHTML = '&nbsp;';
    this.elm = elm;
}

function Cell(row, col, board) {
    this.row = row;
    this.col = col;
    this.board = board;
    this.player = null;
}

Cell.prototype.getElm = function () {
    return this.elm;
};

Cell.prototype.isEmpty = function () {
    return this.player === null;
};

Cell.prototype.occupy = function(player) {
    this.player = player;
    this.elm.innerHTML = player.display();
};

Cell.prototype.getPlayer = function() {
    return this.player;
};
