function Board(players) {
    this.players = players;
    this.board = [[],[],[]];

}

Board.prototype.init = function() {
    var elm = createElm();
    for(var i = 0; i < 3; i++) {
        var rowElm = createRowElm(i);
        var cell1 = new Cell(i,0, this);
        cell1.createCellElm();
        var cell2 = new Cell(i,1, this);
        cell2.createCellElm();
        var cell3 = new Cell(i,2, this);
        cell3.createCellElm();
        this.board[i] = [cell1, cell2, cell3];
        rowElm.appendChild(cell1.getElm());
        rowElm.appendChild(cell2.getElm());
        rowElm.appendChild(cell3.getElm());
        elm.appendChild(rowElm);
    }
};

Board.prototype.nextPlayer = function () {
    return this.players[0] === this.player ? this.players[1] : this.players[0];
};


Board.prototype.log = function (message) {
    var logElm = document.getElementById('log');
    logElm.innerHTML = message;
};

Board.prototype.step = function (row, col) {

    this.player = this.nextPlayer();
    var allowed = [];
    this.board.forEach(function(row) {
        row.forEach(function(cell) {
            if (cell.isEmpty()) {
                allowed.push(cell);
            }
        });
    });
    var cell = this.player.move(allowed);
    if (cell) { //bad way to identify if human or computer
        cell.occupy(this.player);
    } else {
        this.board[row][col].occupy(this.player);
        if (this.isOver()) {
            this.log('Chicken Dinner!!! ' + this.player.name + ' is the winner');
            // return;
        } else {
            this.step();
        }
    }
};

//private methods

function createElm () {
    var elm = document.getElementById('board');
    elm.classList.add('board');
    return elm;
}

function createRowElm (row) {
    var rowElm = document.createElement('div');
    rowElm.classList.add('row');
    rowElm.id = 'row_'+ row;
    return rowElm;
}

Board.prototype.isOver = function () {
    var firstRow        = this.board[0],
        secondRow       = this.board[1],
        thirdRow        = this.board[2],
        firstColumn     = [this.board[0][0], this.board[1][0], this.board[2][0]],
        secondColumn    = [this.board[0][1], this.board[1][1], this.board[2][1]],
        thirdColumn     = [this.board[0][2], this.board[1][2], this.board[2][2]],
        firstDiagonal   = [this.board[0][0], this.board[1][1], this.board[2][2]],
        secondDiagonal  = [this.board[0][2], this.board[1][1], this.board[2][0]];

    return  this.isMatched(firstRow)        ||
            this.isMatched(secondRow)       ||
            this.isMatched(thirdRow)        ||
            this.isMatched(firstColumn)     ||
            this.isMatched(secondColumn)    ||
            this.isMatched(thirdColumn)     ||
            this.isMatched(firstDiagonal)   ||
            this.isMatched(secondDiagonal)  ||
            this.isFull();
};

//checks if a row column or diagonal is matched
Board.prototype.isMatched = function(arr) {
    return !arr[0].isEmpty() && arr[0].getPlayer() === arr[1].getPlayer() && arr[0].getPlayer() === arr[2].getPlayer();
};

Board.prototype.isFull = function() {
    var retVal = true;
    this.board.forEach(function (row) {
        row.forEach(function (cell) {
            if (cell.isEmpty()) {
                retVal = false;
            }
        });
    });
    return retVal;
};
