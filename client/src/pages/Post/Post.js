import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import BoardList from './BoardList';
import PostDetails from './PostDetails';

const useStyles = makeStyles(theme => ({
    info: {
        padding: '3rem 0 1rem 3rem',
        width: '55%'
    },
    title: {
        padding: '1rem 0 1rem 0',
        fontWeight: 'bold'
    },
    image: {
        maxWidth: '80%',
        maxHeight: '60vh',
        float: 'right',
        paddingRight: '3rem'
    }
}));

const Post = ({ post, boards, handleSelectBoard, handleSave, value }) => {
    const classes = useStyles();

    return (
        <Grid container direction="row" justify="center">
            <Grid item xs={6}>
                <img src={post.image} alt={post.title} className={classes.image}/>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.info}>
                    <PostDetails post={post} />
                    <BoardList
                        boards={boards}
                        value={value}
                        handleSelect={handleSelectBoard}
                        handleSave={handleSave}
                    />
                </div>
            </Grid>
        </Grid>
    );
};

export default Post;
