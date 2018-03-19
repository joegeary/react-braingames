import React from 'react';
import { withStyles, AppBar, Toolbar, Typography} from 'material-ui-next';

const styles = (theme) => ({
    center: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center'
    }
});

const LayoutAppBar = (props) => {
    const { classes, title, iconElementRight, iconElementLeft, elementCenter } = props;

    return (
        <AppBar position="static">
            <Toolbar>
                {iconElementLeft}
                <Typography variant="title" color="inherit">
                    {title}
                </Typography>
                <div className={classes.center}>
                    {elementCenter}
                </div>
                {iconElementRight}
            </Toolbar>
        </AppBar>
    );
};

export default withStyles(styles)(LayoutAppBar);