import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Posts from '../../components/Posts/Posts';

const useStyles = makeStyles(theme => ({
    root: {}
}));

const UserPosts = ({ posts }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                !posts || !posts.length ? <h2>You have not added any posts yet.</h2>
                    : <Posts posts={posts}/>
            }
        </div>
    );
};

export default UserPosts;
