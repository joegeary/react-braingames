import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, IconButton, Menu, MenuItem } from 'material-ui-next';
import MoreVertIcon from 'material-ui-icons-next/MoreVert';

import { toggleDifficultyPanel, solveGame } from '../../actions/sudoku';

class OptionsMenu extends Component {
    state = {
        anchorEl: null
    };

    handleShowMenu = (e) => {
        this.setState({
            anchorEl: e.currentTarget
        });
    }

    handleCloseMenu = () => {
        this.setState({
            anchorEl: null
        });
    }

    handleNewGame = () => {
        this.props.toggleDifficultyPanel();
        this.handleCloseMenu();
    }

    handleSolveGame = () => {
        this.props.solveGame(this.props.board);
        this.handleCloseMenu();
    }

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <Button onClick={this.handleNewGame}>New Game</Button>
                <IconButton
                    aria-owns={open ? 'menu-sudoku-options' : null}
                    aria-haspopup="true"
                    onClick={this.handleShowMenu}
                    color="inherit"
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="menu-sudoku-options"
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
                    onClose={this.handleCloseMenu}
                >
                    <MenuItem onClick={this.handleNewGame}>Help</MenuItem>
                    <MenuItem onClick={this.handleSolveGame}>Solve Game</MenuItem>
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { difficulty, board } = state.sudoku.present;

    return {
        difficulty,
        board
    };
}

export default connect(mapStateToProps, {
    toggleDifficultyPanel, 
    solveGame
})(OptionsMenu);
