import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'grid',
        justifyContent: 'center'
    },
    title: {
        padding: '0.3rem 0 0.3rem 0',
        fontSize: 15,
        fontWeight: 'light',
        color: 'whitesmoke',
        position: 'absolute',
        bottom: -10,
        left: 0,
        width: '100%',
        textAlign: 'center',
        background: 'inherit',
        backgroundAttachment: 'fixed',
        overflow: 'auto',
        backgroundColor: 'rgb(0, 0, 0, 0.5)'
    },
    deleteIconContainer: {
        display: 'none',
        float: 'right',
        position: 'absolute',
        right: 0,
        top: 10,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    deleteIcon: {
        color: 'white'
    },
    imageContainer: {
        marginBottom: '7.5px',
        marginTop: '7.5px',
        '&:hover': {
            opacity: '0.9'
        },
        '&:hover $title': {
            display: 'block'
        },
        '&:hover $deleteIconContainer': {
            display: 'block'
        }
    },
    image: {
        width: '18vw',
        height: 'auto',
        borderRadius: '1vw',
        boxShadow: '0px 1px 3px grey'
    },
    masonry: {
        margin: '0 auto',
        position: 'relative',
        textAlign: 'center',
        color: 'white'
    }
}));

const Posts = ({ posts, deleteHandle = false, notFoundMessage = 'Sorry, no posts found' }) => {
    const classes = useStyles();
    if (!posts.length) {
        return (
            <h2>{ notFoundMessage }</h2>
        );
    }

    const deletePost = (post) => {
        if (!deleteHandle) {
            return null;
        }

        return (
            <IconButton size="medium" style={{ marginRight: '10px' }} onClick={() => deleteHandle(post)} className={classes.deleteIconContainer}>
                <DeleteIcon style={{ color: 'white' }} />
            </IconButton>
        );
    };

    const images = posts.map((post, i) => {
        return (
            <div className={classes.imageContainer} key={i}>
                <Link to={'/posts/' + post._id}>
                    <img src={post.image} alt={post.title} className={classes.image} />
                    <p className={classes.title}>{post.title}</p>
                </Link>
                {deletePost(post._id)}
            </div>
        );
    });

    return (
        <div className={classes.root}>
            <Masonry
                className={classes.masonry}
                options={{ fitWidth: true, gutter: 15 }}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}
                imagesLoadedOptions={{}}
            >
                {images}
            </Masonry>
        </div>
    );
};

export default Posts;
