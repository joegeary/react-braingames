import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles, IconButton, Button, Paper } from 'material-ui-next';
import ArrowBackIcon from 'material-ui-icons-next/ArrowBack';

import ViewContainer from '../layout/ViewContainer';
import LayoutAppBar from '../layout/LayoutAppBar';
import LayoutBody from '../layout/LayoutBody';

import './sudoku.css';
import Board from './Board';
import OptionsMenu from './OptionsMenu';
import { newGame, undoMove, redoMove } from '../../actions/sudoku';

const styles = {
    board: {
        paddingTop: '20px'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px'
    }
};

class Sodoku extends Component {

    constructor(props) {
        super(props);
        
        this.onUndoClick = this.onUndoClick.bind(this);
        this.onRedoClick = this.onRedoClick.bind(this);
    }

    componentDidMount() {
        this.props.newGame(this.props.difficulty);
    };

    onUndoClick() {
        this.props.undoMove();
    }

    onRedoClick() {
        this.props.redoMove();
    }

    render() {
        const { classes, canUndo, canRedo } = this.props;

        const appBarLeft = (
            <IconButton component={Link} to="/">
                <ArrowBackIcon />
            </IconButton>
        );

        const appBarRight = (
            <OptionsMenu />
        );

        return (
            <ViewContainer>
                <LayoutAppBar
                    title="Sudoku"
                    iconElementLeft={appBarLeft}
                    iconElementRight={appBarRight}
                />
                <LayoutBody className="sudoku">
                    <Paper square className={classes.board} >
                        <Board board={this.props.board} />
                        <div className={classes.buttons}>
                            <Button onClick={this.onUndoClick} disabled={!canUndo}>Undo Move</Button>
                            <Button onClick={this.onRedoClick} disabled={!canRedo}>Redo Move</Button>
                        </div>
                    </Paper>
                </LayoutBody>
            </ViewContainer>
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
    undoMove,
    redoMove
})(withStyles(styles)(Sodoku));
