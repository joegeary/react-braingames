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
import Timer from '../Timer';
import Board from './Board';
import OptionsMenu from './OptionsMenu';
import SelectDifficulty from './SelectDifficulty';

import { startGame, undoMove, redoMove, useHint, clearHistory } from '../../actions/sudoku';
import { startTimer, resetTimer } from '../../actions/stopwatch';

const styles = {
    board: {
        paddingTop: '20px'
    },
    text: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px auto',
        width: '362px'
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
        this.props.clearHistory();

        this.props.resetTimer();
        this.props.startTimer();
    };

    onUndoClick() {
        this.props.undoMove();
    }

    onRedoClick() {
        this.props.redoMove();
    }

    handleUseHint() {
        this.props.useHint(this.props.board);
        this.props.clearHistory();
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
                <LayoutBody className={classes.board}>
                    <div className={classes.text}>
                        <Typography variant="caption">{difficulty}</Typography>
                        <Typography variant="caption"><Timer updateInterval="1000" /></Typography>
                    </div>
                    <Board board={this.props.board} />
                    <div className={classes.buttons}>
                        <Button onClick={this.onUndoClick} disabled={!canUndo}>
                            <span className={classes.buttonWrapper}>
                                <UndoIcon /> Undo
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
    useHint,
    clearHistory,
    startTimer,
    resetTimer
})(withStyles(styles)(Sodoku));
