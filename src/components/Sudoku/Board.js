import React from 'react';
import { withStyles } from 'material-ui-next';

import Cell from './Cell';

const styles = (theme) => ({
    root: {
        margin: '0 auto',
        width: '375px',
        boxShadow: '0 0 5px 5px #bdc3c7',
        userSelect: 'none'

    },
    clear: {
        clear: 'both'
    },
    row: {
        '&:nth-child(3n+4) input': {
            borderLeft: '2px solid grey'
        }
    }
});

const Board = (props) => {
    const { classes } = props;

    return (
        <div className={classes.root}>
            {props.board.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((cell) => (
                        <Cell 
                            key={cell.x + '' + cell.y}
                            cell={cell}
                            board={props.board}
                            onCellChange={props.onCellChange}
                        />
                    ))}
                </React.Fragment>
            ))}
            <div className={classes.clear}></div>
        </div>
    );
};

export default withStyles(styles)(Board);
