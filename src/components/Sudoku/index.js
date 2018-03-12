import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles, IconButton, Button, Paper, Menu, MenuItem } from 'material-ui-next';
import ArrowBackIcon from 'material-ui-icons-next/ArrowBack';
import MoreVertIcon from 'material-ui-icons-next/MoreVert';

import ViewContainer from '../layout/ViewContainer';
import LayoutAppBar from '../layout/LayoutAppBar';
import LayoutBody from '../layout/LayoutBody';

import './index.css';
import Board from './Board';
import { newGame, solveGame, restartGame, undoMove, redoMove } from '../../actions/sudoku';

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
    state = {
        anchorEl: null
    };

    constructor(props) {
        super(props);

        this.onNewClick = this.onNewClick.bind(this);
        this.onSolveClick = this.onSolveClick.bind(this);
        this.onRestartClick = this.onRestartClick.bind(this);
        this.onUndoClick = this.onUndoClick.bind(this);
        this.onRedoClick = this.onRedoClick.bind(this);
    }

    componentDidMount() {
        this.onNewClick();
    };

    handleMenuClose = () => {
        this.setState({
            anchorEl: null
        });
    };

    handleOptionsMenu = (e) => {
        this.setState({
            anchorEl: e.currentTarget
        });
    };

    onNewClick() {
        this.props.newGame(this.props.difficulty);
        this.handleMenuClose();
    }

    onSolveClick() {
        this.props.solveGame(this.props.board);
        this.handleMenuClose();
    }

    onRestartClick() {
        this.props.restartGame(this.props.board);
        this.handleMenuClose();
    }

    onUndoClick() {
        this.props.undoMove();
    }

    onRedoClick() {
        this.props.redoMove();
    }

    render() {
        const { classes, canUndo, canRedo } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        const appBarLeft = (
            <IconButton component={Link} to="/">
                <ArrowBackIcon />
            </IconButton>
        );

        const appBarRight = (
            <div>
                <IconButton
                    aria-owns={open ? 'menu-options' : null}
                    aria-haspopup="true"
                    onClick={this.handleOptionsMenu}
                    color="inherit"
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="menu-options"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleMenuClose}
                >
                    <MenuItem onClick={this.onNewClick}>New Game</MenuItem>
                    <MenuItem onClick={this.onRestartClick}>Restart Game</MenuItem>
                    <MenuItem onClick={this.onSolveClick}>Solve Game</MenuItem>
                </Menu>
            </div>
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
    solveGame, 
    restartGame,
    undoMove,
    redoMove
})(withStyles(styles)(Sodoku));
