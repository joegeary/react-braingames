import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { withStyles, Drawer, List, ListItem, ListItemText, ListSubheader } from 'material-ui-next';

import { toggleDifficultyPanel, startGame, restartGame, clearHistory } from '../../actions/sudoku';
import { startTimer, resetTimer } from '../../actions/stopwatch';


const styles = {
    list: {
        width: 'auto'
    }
};

class SelectDifficulty extends Component {

    constructor(props) {
        super(props);
        
        this.handleChangeDifficulty = this.handleChangeDifficulty.bind(this);
        this.handleRestartGame = this.handleRestartGame.bind(this);
    }

    hideDrawer = () => {
        this.props.toggleDifficultyPanel();
    }

    handleChangeDifficulty = (difficulty) => {
        this.props.startGame(difficulty);
        this.props.clearHistory();

        this.props.resetTimer();
    }

    handleRestartGame() {
        this.props.restartGame(this.props.board);
        this.props.clearHistory();

        this.props.resetTimer();
    }

    render() {
        const { classes, showDifficultySelector } = this.props;

        return (
            <Drawer anchor="bottom" open={showDifficultySelector} onClose={this.hideDrawer}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.hideDrawer}
                    onKeyDown={this.hideDrawer}
                    className={classes.list}
                >
                    <List
                        component="nav"
                        subheader={
                            <ListSubheader component="div">Current progress will be lost!</ListSubheader>
                        }
                    >
                        <ListItem button onClick={() => this.handleChangeDifficulty('EASY')}>
                            <ListItemText primary="Easy" />
                        </ListItem>
                        <ListItem button onClick={() => this.handleChangeDifficulty('MEDIUM')}>
                            <ListItemText primary="Medium" />
                        </ListItem>
                        <ListItem button onClick={() => this.handleChangeDifficulty('HARD')}>
                            <ListItemText primary="Hard" />
                        </ListItem>
                        <ListItem button onClick={() => this.handleChangeDifficulty('EXPERT')}>
                            <ListItemText primary="Expert" />
                        </ListItem>
                        <ListItem button onClick={this.handleRestartGame}>
                            <ListItemText primary="Restart" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        );
    }

};


const mapStateToProps = (state) => {
    const { difficulty, board, showDifficultySelector } = state.sudoku.present;

    return {
        difficulty,
        board,
        showDifficultySelector
    };
}

export default connect(mapStateToProps, { 
    toggleDifficultyPanel,
    startGame,
    restartGame,
    clearHistory,
    startTimer,
    resetTimer
})(withStyles(styles)(SelectDifficulty));