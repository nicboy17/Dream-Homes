import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import MoreMenu from '../Menu/Menu';

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
        borderBottomLeftRadius: '1vw',
        borderBottomRightRadius: '1vw',
        backgroundColor: 'rgb(0, 0, 0, 0.55)'
    },
    deleteIconContainer: {
        display: 'none',
        float: 'right',
        position: 'absolute',
        right: 0,
        top: 10,
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
            <MoreMenu icon={'vert'} style={{ marginRight: '10px' }} remove={() => deleteHandle(post)} edit={() => deleteHandle(post)} menuStyle={classes.deleteIconContainer}/>
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
