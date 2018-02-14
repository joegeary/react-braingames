import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container justify="center" className="sudoku">
                <Grid item>
                <Card>
                    <CardHeader title="Sudoku" />
                    <CardContent>
                        <Board
                            boardState = {this.props.board}
                            onValueChange = {this.onValueChange}
                        />
                    </CardContent>
                    <CardActions>
                        <Button variant="raised" onClick={this.handleNewGame}>New Game</Button>
                        <Button variant="raised" onClick={this.handleRestart}>Restart Game</Button>
                        <Button variant="raised" disabled >Undo Move</Button>
                        <Button variant="raised" disabled >Redo Move</Button>
                        <Button variant="raised">Solve Game</Button>
                    </CardActions>
                </Card>
                </Grid>
            </Grid>
        );
    }

    handleNewGame = () => {
        const seed = Math.floor(Math.random() * this.puzzles.length)
        this.setState((prevState) => {
            return {
                seed: seed,
                boardState: this.generatePuzzle(seed)
            };
        });
    }

    handleRestart = () => {
        const seed = this.state.seed;
        this.setState((prevState) => {
            return {
                seed: seed,
                boardState: this.generatePuzzle(seed)
            };
        });
    }

    generatePuzzle(seed) {
        const puzzle = this.puzzles[seed];
        const boardState = this.createMatrix(9, 9);

        for (let i = 0; i < puzzle.length; i++) {
            const row = Math.floor(i / 9);
            const col = i % 9;

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

const mapStateToProps = (state) => {
    const { difficulty, board } = state;

    return {
        difficulty,
        board
    };
}

export default connect(mapStateToProps)(withStyles(styles)(Sodoku));