import React, { Component } from 'react';
import { withStyles, AppBar, Toolbar, Typography, Grid } from 'material-ui-next';

import Sudoku from './Games/Sudoku';

const styles = {
  root: {
      flexGrow: 1
  },
  flex: {
      flex: 1,
  },
  menuButton: {
      marginLeft: -12,
      marginRight: 20,
  },
  game: {
      marginTop: 30
  }
};

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
                Brain Games
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.game}>
          <Grid item xs={12}>
            <Sudoku />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
