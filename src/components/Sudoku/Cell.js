import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui-next';
import classNames from 'classnames';

import { changeSquareValue } from '../../actions/sudoku';

const styles = {
    root: {
        margin: 0,
        padding: 0,
        '&:nth-child(3n+4) input': {
            borderLeft: '2px solid grey'
        }
    },
    input: {
        boxSizing: 'border-box',
	    border: '0.5px solid #ddd',
	    padding: 0,
	    margin: 0,
	    height: '40px',
	    width: '40px',
	    textAlign: 'center',
        fontSize: '20px',
        backgroundColor: '#f3f3f3',
        cursor: 'default',
        color: 'transparent',
        textShadow: '0 0 0 #404040',
        '-webkit-user-select': 'all',
        '-moz-user-select': 'all',
        '-ms-user-select': 'all',
        'user-select': 'all',
        '&:focus': {
            outline: 'none',
            backgroundColor: '#ccc'
        },
        '&::selection': {
            background: 'transparent'
        },
        '&::-moz-selection': {
            background: 'transparent'
        }
    },
    valid: {
        textShadow: '0 0 0 #690'
    },
    invalid: {
        textShadow: '0 0 0 #900'
    }
}

class Cell extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    shouldComponentUpdate(newProps) {
         const oldCell = this.props.cell;
         const newCell = newProps.cell;

         return oldCell.value !== newCell.value || oldCell.editable !== newCell.editable;
    }

    onClick = (e) => {
        e.target.select();
    }

    onChange = (e) => {
        const cell = this.props.cell;
        const newValue = e.target.value;

        if (!this.isValid(newValue)) {
            e.target.value = cell.value;
            return;
        }

        this.props.changeSquareValue(cell.x, cell.y, newValue === '' ? '' : newValue, this.props.board);
        this.onClick(e);
    }

    isValid = (val) => {
        return (val === '' || /[1-9]/.test(val));
    }

    render() {
        const { cell, classes } = this.props;
        const isValid = cell.editable ? (cell.valid ? 'valid' : 'invalid') : '';

        return (
            <td className={classes.root}>
                <input 
                    /*className={`square ${isValid}`}*/
                    className={classNames(classes.input, classes[isValid])}
                    type="text" 
                    value={cell.value} 
                    disabled={!cell.editable}
                    onClick={this.onClick}
                    onChange={this.onChange}
                />
            </td>
        )
    }
}

export default withStyles(styles)(connect(null, { changeSquareValue })(Cell));
