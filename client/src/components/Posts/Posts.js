import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import Confirm from '../Dialog/Confirm';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'grid',
        justifyContent: 'center'
    },
    title: {
        padding: '1rem 0 1rem 0',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
        position: 'absolute',
        bottom: -10,
        left: 0,
        width: '100%',
        textAlign: 'center'
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

const Posts = ({ posts, notFoundMessage = 'Sorry, no posts found' }) => {
    const classes = useStyles();

    const images = posts.map((post, i) => {
        return (
            <div className={classes.imageContainer} key={i}>
                <Link to={'/posts/' + post._id}>
                    <img src={post.image} alt={post.title} className={classes.image} />
                    <p className={classes.title}>{post.title}</p>
                </Link>
                <Confirm
                    item="posts"
                    id={post._id}
                    title={post.title}
                    className={classes.deleteIconContainer}
                />
            </div>
        );
    });

    if (!posts.length) {
        return (
            <h2>{ notFoundMessage }</h2>
        );
    }

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
