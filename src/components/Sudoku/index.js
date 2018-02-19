import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { withStyles, Grid, Card, CardHeader, CardActions, Button, CardContent } from 'material-ui-next';

import './index.css';
import Board from './Board';
import Options from './Options';
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
        //this.props.dispatch(UndoActionCreators.clearHistory());
        this.props.newGame(this.props.difficulty);
    }

    onSolveClick() {
        this.props.solveGame(this.props.board);
    }

    onRestartClick() {
        this.props.restartGame(this.props.board);
    }

    render() {
        const { canUndo, canRedo, onUndo, onRedo } = this.props;

        return (
            <Grid container justify="center" className="sudoku">
                <Grid item>
                <Card>
                    <CardHeader title="Sudoku" subheader="Fill a 9×9 grid with numbers so that each row, column and 3×3 section contain all of the digits between 1 and 9." action={<Options />}/>
                    <CardContent>
                        <Board
                            board = {this.props.board}
                        />
                    </CardContent>
                    <CardActions>
                        <Button variant="raised" onClick={this.onNewClick}>New Game</Button>
                        <Button variant="raised" onClick={this.onRestartClick}>Restart Game</Button>
                        <Button variant="raised" onClick={onUndo} disabled={!canUndo}>Undo Move</Button>
                        <Button variant="raised" onClick={onRedo} disabled={!canRedo}>Redo Move</Button>
                        <Button variant="raised" onClick={this.onSolveClick}>Solve Game</Button>
                    </CardActions>
                </Card>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    const { difficulty, board } = state.sudoku.present;

    return {
        difficulty,
        board,
        canUndo: state.sudoku.past.length > 0,
        canRedo: state.sudoku.future.length > 0
    };
}

const mapDispatchToProps = (dispatch) => {
    return { 
        newGame(difficulty) { dispatch(newGame(difficulty)); }, 
        solveGame(board) { dispatch(solveGame(board)); }, 
        restartGame(board) { dispatch(restartGame(board)); },
        onUndo: () => dispatch(UndoActionCreators.undo()),
        onRedo: () => dispatch(UndoActionCreators.redo())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Sodoku));
