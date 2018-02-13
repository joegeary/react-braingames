import React, { Component } from 'react';
import { withStyles, Grid, Card, CardHeader, CardActions, Button, CardContent } from 'material-ui-next';

import './index.css';
import Board from './Board';

const styles = {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Sodoku extends Component {
    
    puzzles = [
        "290500007700000400004738012902003064800050070500067200309004005000080700087005109",
        "080020000040500320020309046600090004000640501134050700360004002407230600000700450",
        "608730000200000460000064820080005701900618004031000080860200039050000100100456200",
        "902040560000009000061250470040030102600480090003070080500008000306500947100360005",
        "020001630090500400806049002900005701000900300352076800009004506080050000045600018",
        "034060901700012680080009000023050790007020005500078030010590000000000413078130020",
        "020604030450100206600005100004003000095201380200500907510000603807352000000000058",
        "032054900090001004080700031005600027800070000270140005000210300018907652603000000"
    ]

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            boardState: this.generatePuzzle()
        };
    }

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <Grid container justify="center" className="sudoku">
                <Grid item>
                <Card>
                    <CardHeader title="Sudoku" />
                    <CardContent>
                        <Board
                            boardState = {this.state.boardState}
                            onValueChange = {this.onValueChange}
                        />
                    </CardContent>
                    <CardActions>
                        <Button variant="raised" onClick={this.newGame}>New Game</Button>
                        <Button variant="raised">Restart Game</Button>
                        <Button variant="raised" disabled >Undo Move</Button>
                        <Button variant="raised" disabled >Redo Move</Button>
                        <Button variant="raised">Solve Game</Button>
                    </CardActions>
                </Card>
                </Grid>
            </Grid>
        );
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    newGame = () => {
        this.setState((prevState) => {
            return {
                boardState: this.generatePuzzle()
            };
        });
    }

    generatePuzzle() {
        var puzzle = this.puzzles[Math.floor(Math.random() * this.puzzles.length)];
        var boardState = this.createMatrix(9, 9);

        for (let i = 0; i < puzzle.length; i++) {
            var row = Math.floor(i / 9);
            var col = i % 9;

            boardState[row][col] = {
                value: puzzle[i],
                editable: puzzle[i] === '0',
                valid: true
            };
        }

        return boardState;
    }

    createMatrix(x, y) {
        return Array.from({
            length: x
        }, () => new Array(y).fill(0));
    }

    onValueChange = (x, y, value) => {
        this.setState((prevState) => {
            var board = prevState.boardState;
            board[x][y].value = value;
            
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    board[i][j].valid = this.validateCell(board, i, j);
                }
            }
            
            return {
                boardState: board
            };
        });
    }

    validateCell = (board, x, y) => {
        const value = board[x][y].value;

        // check the row
        for (let i = 0; i < board.length; i++) {
            if (x !== i && board[i][y].value === value) {
                return false;
            }
        }

        // check the column
        for (let i = 0; i < board[x].length; i++) {
            if (y !== i && board[x][i].value === value) {
                return false;
            }
        }

        // check the square
        const squareX = Math.floor(x / 3);
        const squareY = Math.floor(y / 3);
        for (let i = squareX * 3; i < (squareX * 3) + 3; i++) {
            for (let j = squareY * 3; j < (squareY * 3) + 3; j++) {
                if (!(i === x && j === y) && board[i][j].value === value) {
                    return false;
                }
            }
        }

        return true;
    }
}

export default withStyles(styles)(Sodoku);