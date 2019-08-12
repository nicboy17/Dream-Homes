import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';

const useStyles = makeStyles(theme => ({
    root: {
        width: '80vw',
        marginLeft: '10vw'
    },
    title: {
        padding: '1rem 0 1rem 0',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
        position: 'absolute',
        bottom: 5,
        left: 0,
        width: '100%',
        textAlign: 'center'
    },
    imageContainer: {
        margin: '1vw'
    },
    image: {
        width: '16vw',
        height: 'auto',
        borderRadius: '1vw'
    },
    masonry: {
        margin: '0 auto',
        position: 'relative',
        textAlign: 'center',
        color: 'white'
    }
}));

const Posts = ({ posts }) => {
    const classes = useStyles();

    const images = posts.map((post, i) => {
        return (
            <Link to={'/posts/' + post._id} key={i}>
                <div className={classes.imageContainer}>
                    <img src={post.image} alt={post.title} className={classes.image}/>
                    <p className={classes.title}>{post.title}</p>
                </div>
            </Link>
        );
    });

    return (
        <div className={classes.root}>
            <Masonry
                className={classes.masonry}
                options={{ fitWidth: true, columnWidth: 1 }}
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
