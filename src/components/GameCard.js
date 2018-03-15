import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography, Button, IconButton } from 'material-ui-next';
import red from 'material-ui-next/colors/red';
import FavoriteIcon from 'material-ui-icons-next/Favorite';

const styles = (theme) => ({
    media: {
        height: 194,
    },
    actions: {
        borderTop: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'space-between'
    },
    avatar: {
        backgroundColor: red[500],
    },
});

const GameCard = (props) => {
    const { game, classes } = props;

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="Game" className={classes.avatar}>{game.abbr}</Avatar>
                }
                title={game.title}
            />
            <CardMedia className={classes.media} image="/img/test.png" title={game.title} />
            <CardContent>
                <Typography component="p">{game.description}</Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
                <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <Button component={Link} to={'/' + game.key}>More Details</Button>
            </CardActions>
        </Card>     
    )
}

export default withStyles(styles)(GameCard);