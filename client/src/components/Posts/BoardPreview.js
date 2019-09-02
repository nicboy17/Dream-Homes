import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Masonry from 'react-masonry-component';

const useStyles = makeStyles(theme => ({
    imageContainer: {
        // display: 'inline-block',
        position: 'absolute',
        width: '32.5%',
        margin: 1
    },
    image: {
        display: 'block',
        width: '100%',
        height: 'auto',
        borderRadius: '1vw'
    },
    masonry: {
        margin: '0 auto',
        width: '100%!important',
        height: '100%!important',
        textAlign: 'center',
        color: 'white'
    }
}));

const BoardPreview = ({ posts, className }) => {
    const classes = useStyles();

    const images = posts.map((post, i) => {
        return (
            <div className={classes.imageContainer} key={i}>
                <img src={post.image} alt={post._id} className={classes.image}/>
            </div>
        );
    });

    return (
        <div className={className}>
            <Masonry
                className={classes.masonry}
                options={{ fitWidth: true, resize: false, transitionDuration: 0 }}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}
                imagesLoadedOptions={{}}
            >
                {images}
            </Masonry>
        </div>
    );
};

export default BoardPreview;
