import React from 'react';
import { withStyles } from 'material-ui-next';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
};

const ViewContainer = props => {
  const { children, classes } = props;

  return <div className={classes.root}>{children}</div>;
};

export default withStyles(styles)(ViewContainer);