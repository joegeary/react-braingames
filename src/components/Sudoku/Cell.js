import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui-next';
import classNames from 'classnames';

import { changeSquareValue, selectSquare, changeSquareNotes } from '../../actions/sudoku';
import CellNotes from './CellNotes';

const styles = {
    root: {
        height: '42px',
        width: '11.11%',
        display: 'inline-block',
        float: 'left',
        textAlign: 'center',
        overflow: 'hidden',
        boxSizing: 'border-box',
        boxShadow: '0 0 0 1px #bdc3c7',
        background: 'white',
        color: '#2c3e50',
        cursor: 'pointer' 
    },
    vertLine: {
        boxShadow: '0 0 0 1px #bdc3c7, inset -2px 0 0 #34495e'
    },
    horzLine: {
        boxShadow: '0px 0px 0px 1px #bdc3c7, inset 0px -2px 0 0 #34495e'
    },
    bothLine: {
        boxShadow: '0px 0px 0px 1px #bdc3c7, inset -2px 0 0 black, inset 0px -2px 0 black'
    },
    input: {
        lineHeight: '41px',
        fontSize: '14px',
        textAlign: 'center',
        marginLeft: '-1px'
    },
    fixed: {
        background: '#ecf0f1',
        cursor: 'not-allowed' 
    },
    highlight: {
        background: '#ffe'
    },
    match: {
        fontWeight: 'bold',
        color: '#3498db'
    },
    selected: {
        position: 'relative',
        background: '#3498db',
        fontWeight: 'bold',
        boxShadow: '0 0 3px 3px #bdc3c7'
    },
    invalid: {
        background: '#efdbdb',
        color: '#900'
    }
}

class Cell extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onClick = (e) => {
        const { cell, selected } = this.props;
        if (cell !== selected) {
            this.props.selectSquare(cell);
        }
    }

    onKeyPress = (e) => {
        const { cell, board, pencilMode } = this.props;
        const newValue = this.isValid(e.key) ? e.key : '';

        if (!cell.editable) {
            return;
        }

        if (pencilMode) {
            this.props.changeSquareNotes(cell.x, cell.y, newValue, board);
        } else {
            this.props.changeSquareValue(cell.x, cell.y, newValue, board);
        }
    }

    isValid = (val) => {
        return (/[1-9]/.test(val));
    }

    render() {
        const { cell, classes, selected } = this.props;
        const arr = [classes.root];

        if ((cell.y === 2 || cell.y === 5) && (cell.x === 2 || cell.x === 5)) {
            arr.push(classes.bothLine);
        } else if (cell.y === 2 || cell.y === 5) {
            arr.push(classes.vertLine);
        } else if (cell.x === 2 || cell.x === 5) {
            arr.push(classes.horzLine);
        }

        if (selected) {
            if (selected.x === cell.x && selected.y === cell.y) {
                arr.push(classes.selected)
            } else {
                if (selected.x === cell.x || selected.y === cell.y || (Math.floor(selected.x / 3) === Math.floor(cell.x / 3) && Math.floor(selected.y / 3) === Math.floor(cell.y / 3))) {
                    arr.push(classes.highlight);
                }
                if (selected.value === cell.value) {
                    arr.push(classes.match);
                }
            }
        }

        if (!cell.editable) {
            arr.push(classes.fixed);
        } else if (!cell.valid) {
            arr.push(classes.invalid);
        }

        return (
            <div 
                className={classNames(arr)} 
                onClick={this.onClick} 
                onKeyUp={this.onKeyPress} 
                tabIndex={cell.x * cell.y}
            >
                {cell.notes ? (
                    <CellNotes cell={cell} />
                ) : (
                    <span className={classes.input}>{cell.value}</span>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { selected, pencilMode } = state.sudoku.present;

    return {
        selected,
        pencilMode
    };
}

export default withStyles(styles)(connect(mapStateToProps, { changeSquareValue, changeSquareNotes, selectSquare })(Cell));
