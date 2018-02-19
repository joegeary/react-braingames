import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IconButton, Menu, MenuItem } from 'material-ui-next';
import MoreVertIcon from 'material-ui-icons-next/MoreVert';

import { newGame } from '../../actions/sudoku';

class Options extends Component {
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

    handleSelectDifficulty = (newDifficulty) => {
        this.handleCloseMenu();
        this.props.newGame(newDifficulty);
    }

    render() {
        const { anchorEl } = this.state;
        const { difficulty } = this.props;

        return (
            <div>
                <IconButton onClick={this.handleShowMenu}>
                    <MoreVertIcon />
                </IconButton>
                <Menu open={Boolean(anchorEl)} onClose={this.handleCloseMenu} anchorEl={anchorEl}>
                    <MenuItem key="EASY" selected={difficulty === 'EASY'} onClick={() => { this.handleSelectDifficulty('EASY')}}>Easy</MenuItem>
                    <MenuItem key="MEDIUM" selected={difficulty === 'MEDIUM'} onClick={() => { this.handleSelectDifficulty('MEDIUM')}}>Medium</MenuItem>
                    <MenuItem key="HARD" selected={difficulty === 'HARD'} onClick={() => { this.handleSelectDifficulty('HARD')}}>Hard</MenuItem>
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { difficulty } = state.sudoku;

    return {
        difficulty
    };
}

export default connect(mapStateToProps, { newGame })(Options);