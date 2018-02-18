import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Card, CardHeader, CardActions, Button, CardContent } from 'material-ui-next';

import './index.css';
import Board from './Board';
import { newGame, solveGame, restartGame } from '../../actions/sudoku';

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

        this.onNewClick = this.onNewClick.bind(this);
        this.onSolveClick = this.onSolveClick.bind(this);
        this.onRestartClick = this.onRestartClick.bind(this);

        this.onNewClick();
    }

    onNewClick() {
        this.props.newGame('EASY');
    }

    onSolveClick() {
        this.props.solveGame(this.props.board);
    }

    onRestartClick() {
        this.props.restartGame(this.props.board);
    }

    render() {
        return (
            <Grid container justify="center" className="sudoku">
                <Grid item>
                <Card>
                    <CardHeader title="Sudoku" />
                    <CardContent>
                        <Board
                            board = {this.props.board}
                        />
                    </CardContent>
                    <CardActions>
                        <Button variant="raised" onClick={this.onNewClick}>New Game</Button>
                        <Button variant="raised" onClick={this.onRestartClick}>Restart Game</Button>
                        <Button variant="raised" disabled >Undo Move</Button>
                        <Button variant="raised" disabled >Redo Move</Button>
                        <Button variant="raised" onClick={this.onSolveClick}>Solve Game</Button>
                    </CardActions>
                </Card>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    const { difficulty, board } = state.sudoku;

    return {
        difficulty,
        board
    };
}

export default connect(mapStateToProps, { newGame, solveGame, restartGame })(withStyles(styles)(Sodoku));
