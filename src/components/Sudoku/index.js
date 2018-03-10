import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Card, CardHeader, CardActions, Button, CardContent } from 'material-ui-next';

import './index.css';
import Board from './Board';
import Options from './Options';
import { newGame, solveGame, restartGame, undoMove, redoMove } from '../../actions/sudoku';

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
        this.onUndoClick = this.onUndoClick.bind(this);
        this.onRedoClick = this.onRedoClick.bind(this);

        this.onNewClick();
    }

    onNewClick() {
        this.props.newGame(this.props.difficulty);
    }

    onSolveClick() {
        this.props.solveGame(this.props.board);
    }

    onRestartClick() {
        this.props.restartGame(this.props.board);
    }

    onUndoClick() {
        this.props.undoMove();
    }

    onRedoClick() {
        this.props.redoMove();
    }

    render() {
        const { canUndo, canRedo } = this.props;

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
                        <Button variant="raised" onClick={this.onUndoClick} disabled={!canUndo}>Undo Move</Button>
                        <Button variant="raised" onClick={this.onRedoClick} disabled={!canRedo}>Redo Move</Button>
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

export default connect(mapStateToProps, { 
    newGame, 
    solveGame, 
    restartGame,
    undoMove,
    redoMove
})(withStyles(styles)(Sodoku));
