import React from 'react';
import { withStyles } from 'material-ui-next';

const styles = {
  root: {
    flex: '1 1 auto',
    overflowY: 'auto',
    minHeight: 0,
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch', // iOS momentum scrolling
    height: '100%',
  }
};

const ScrollView = props => {
  const { children, classes, ...other } = props;

  return (
    <div
      className={classes.root}
      {...other}
    >
      {children}
    </div>
  );
};

export default withStyles(styles)(ScrollView);