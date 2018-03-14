import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles, IconButton, Button, Paper, Typography, Badge } from 'material-ui-next';

import ArrowBackIcon from 'material-ui-icons-next/ArrowBack';
import UndoIcon from 'material-ui-icons-next/Undo';
import RedoIcon from 'material-ui-icons-next/Redo';
import ModeEditIcon from 'material-ui-icons-next/ModeEdit';
import LightbulbOutlineIcon from 'material-ui-icons-next/LightbulbOutline';

import ViewContainer from '../layout/ViewContainer';
import LayoutAppBar from '../layout/LayoutAppBar';
import LayoutBody from '../layout/LayoutBody';

import './sudoku.css';
import Board from './Board';
import OptionsMenu from './OptionsMenu';
import { startGame, undoMove, redoMove, useHint } from '../../actions/sudoku';
import SelectDifficulty from './SelectDifficulty';

const styles = {
    board: {
        paddingTop: '20px'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px'
    },
    buttonWrapper: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'column'
    }
};

class Sodoku extends Component {

    constructor(props) {
        super(props);
        
        this.onUndoClick = this.onUndoClick.bind(this);
        this.onRedoClick = this.onRedoClick.bind(this);
        this.handleUseHint = this.handleUseHint.bind(this);
    }

    componentDidMount() {
        this.props.startGame(this.props.difficulty);
    };

    onUndoClick() {
        this.props.undoMove();
    }

    onRedoClick() {
        this.props.redoMove();
    }

    handleUseHint() {
        this.props.useHint(this.props.board);
    }

    render() {
        const { classes, difficulty, hints, canUndo, canRedo } = this.props;

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
                        <Typography variant="caption">{difficulty}</Typography>
                        <Board board={this.props.board} />
                        <div className={classes.buttons}>
                            <Button onClick={this.onUndoClick} disabled={!canUndo}>
                                <span className={classes.buttonWrapper}>
                                    <UndoIcon /> Undo
                                </span>
                            </Button>
                            <Button onClick={this.onRedoClick} disabled={!canRedo}>
                                <span className={classes.buttonWrapper}>
                                    <RedoIcon /> Redo
                                </span>
                            </Button>
                            <Button>
                                <span className={classes.buttonWrapper}>
                                    <ModeEditIcon /> Pencil
                                </span>
                            </Button>
                            <Button onClick={this.handleUseHint} disabled={hints===0}>
                                <span className={classes.buttonWrapper}>
                                    { hints > 0 
                                        ? (<Badge badgeContent={hints} color="primary"><LightbulbOutlineIcon /></Badge>) 
                                        : (<LightbulbOutlineIcon />) }
                                    Hint
                                </span>
                            </Button>
                        </div>
                    </Paper>
                </LayoutBody>
                <SelectDifficulty />
            </ViewContainer>
        );
    }
}

const mapStateToProps = (state) => {
    const { difficulty, board, hints } = state.sudoku.present;

    return {
        difficulty,
        hints,
        board,
        canUndo: state.sudoku.past.length > 0,
        canRedo: state.sudoku.future.length > 0
    };
}

export default connect(mapStateToProps, { 
    startGame,
    undoMove,
    redoMove,
    useHint
})(withStyles(styles)(Sodoku));
