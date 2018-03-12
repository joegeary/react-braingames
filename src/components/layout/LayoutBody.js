import React from 'react';
import { withStyles } from 'material-ui-next';
import classNames from 'classnames';

const styles = (theme) => ({
    root: {
        margin: '0 0 38px'
    },
    rootResponsive: {
        '@media (min-width: 600px)': {
            width: 'auto',
            marginLeft: 40,
            marginRight: 40
        },
        '@media (min-width: 920px)': {
            width: 840,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        '@media (min-width: 1260px)': {
            width: '66.67%'
        },
        '@media (min-width: 1800px)': {
            width: 1200
        }
    },
    rootFullHeight: {
        height: '100%',
        marginBottom: 0
    }
});

const LayoutBody = props => {
    const { children, classes, fullHeight, fullWidth, style, ...other } = props;
  
    return (
      <div
        className={classNames(classes.root, {
          [classes.rootResponsive]: !fullWidth,
          [classes.rootFullHeight]: fullHeight,
        })}
        style={style}
        {...other}
      >
        {children}
      </div>
    );
  };

  export default withStyles(styles)(LayoutBody);