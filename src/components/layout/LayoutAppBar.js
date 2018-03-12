import React from 'react';
import { withStyles, AppBar, Toolbar, Typography} from 'material-ui-next';

const styles = (theme) => ({
    title: {
        flex: 1
    }
});

const LayoutAppBar = (props) => {
    const { classes, title, iconElementRight, iconElementLeft } = props;

    return (
        <AppBar position="static">
            <Toolbar>
                {iconElementLeft}
                <Typography variant="title" color="inherit" className={classes.title}>
                    {title}
                </Typography>
                {iconElementRight}
            </Toolbar>
        </AppBar>
    );
};

export default withStyles(styles)(LayoutAppBar);