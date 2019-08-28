import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    author: {
        marginTop: '1rem'
    },
    avatar: {
        display: 'inline-block',
        margin: 10,
        width: 25,
        height: 25
    },
    title: {
        padding: '1rem 0 1rem 0',
        fontWeight: 'bold'
    },
    date: {
        fontSize: 10,
        marginBottom: '1rem',
        fontStyle: 'oblique'
    }
}));

const PostDetails = ({ post, history, favouritePost, unFavouritePost, isFavourited, authenticated, match }) => {
    const classes = useStyles();
    const placeholder = 'https://team-pineapple.s3.ca-central-1.amazonaws.com/placeholder.jpg';

    const date = new Date(post.date).toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <div>
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={4} className={classes.author}
                onClick={() => history.push(`/profile/${post.user.username}`)}>
                <Avatar src={post.user.profile || placeholder} component={'div'} className={classes.avatar} />
                <Typography variant="subtitle2" className={classes.user}>{post.user.name}</Typography>
            </Grid>
            <Grid className={classes.content}>
                <Typography variant="h5" component="h5" className={classes.title}>{post.title}</Typography>
                <Typography variant="subtitle2" className={classes.text}>{post.description}</Typography>
                <p className={classes.date}>{'Published ' + date}</p>
            </Grid>
        </div>
    );
};

export default PostDetails;
