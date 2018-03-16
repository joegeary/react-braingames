import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography, Button, IconButton } from 'material-ui-next';
import FavoriteIcon from 'material-ui-icons-next/Favorite';

const styles = (theme) => ({
    title: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    media: {
        height: 194,
        position: 'relative'
    },
    actions: {
        borderTop: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'space-between'
    },
    avatar: {
        textDecoration: 'none'
    },
    category: {
        background: 'rgba(0,0,0,0.54)',
        color: '#fff',
        padding: '3px 5px',
        position: 'absolute',
        bottom: '4px',
        left: '4px',
        borderRadius: '2px'
    },
    content: {
        height: '60px'
    },
    description: {
        maxHeight: '60px',
        overflow: 'hidden',
        position: 'relative',
        textAlign: 'justify',
        marginRight: '-1em',
        paddingRight: '1em',
        '&:before': {
            content: '\'...\'',
            position: 'absolute',
            right: 0,
            bottom: 0
        },
        '&:after': {
            content: '\'\'',
            position: 'absolute',
            right: 0,
            width: '1em',
            height: '1em',
            marginTop: '0.2em',
            background: '#fff'
        }
    }
});

const GameCard = (props) => {
    const { game, classes } = props;

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar component={Link} to={'/' + game.key} aria-label="Game" className={classes.avatar} style={{backgroundColor: game.color}}>{game.abbr}</Avatar>
                }
                title={
                    <Typography component={Link} to={'/' + game.key} variant="body2" className={classes.title}>{game.title}</Typography>
                }
            />
            <CardMedia className={classes.media} image={'/img/' + game.key + '.png'} title={game.title}>
                <Typography component="div" variant="body2" className={classes.category}>{game.category}</Typography>
            </CardMedia>
            <CardContent className={classes.content}>
                <Typography className={classes.description} component="p">{game.description}</Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
                <IconButton aria-label="Add to favorites" title="Add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <Button component={Link} to={'/' + game.key}>More Details</Button>
            </CardActions>
        </Card>     
    )
}

export default withStyles(styles)(GameCard);