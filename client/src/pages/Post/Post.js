import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import BoardList from './BoardList';
import PostDetails from './PostDetails';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { bindActionCreators, compose } from 'redux';
import { favouritePost, unFavouritePost } from '../../actions/user';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    info: {
        padding: '3rem 0 1rem 3rem',
        width: '55%'
    },
    title: {
        padding: '1rem 0 1rem 0',
        fontWeight: 'bold'
    },
    imageContainer: {
        position: 'relative',
        marginTop: '2rem'
    },
    image: {
        height: 'auto',
        width: 'auto',
        maxWidth: '85%',
        float: 'right',
        paddingRight: '3rem'
    },
    favourite: {
        position: 'absolute',
        top: 20,
        right: 65,
        zIndex: 1
    }
}));

const Post = ({ id, user, post, boards, handleSelectBoard, handleSave, value, authenticated, isFavourited, favouritePost, unFavouritePost, history }) => {
    const classes = useStyles();

    const onFavourite = () => {
        favouritePost(user.username, id);
    };

    const onUnFavourite = () => {
        unFavouritePost(user.username, id);
    };

    const FavouriteButton = () => {
        if (authenticated) {
            if (isFavourited(id)) {
                return <Fab className={classes.favourite} color={'primary'} onClick={() => onUnFavourite()}><Icon>star</Icon></Fab>;
            }
            return <Fab className={classes.favourite} color={'secondary'} onClick={() => onFavourite()}><Icon>star</Icon></Fab>;
        }
        return null;
    };

    return (
        <Grid container direction="row" justify="center">
            <Grid item xs={6} className={classes.imageContainer}>
                <img src={post.image} alt={post.title} className={classes.image} />
                <FavouriteButton />
            </Grid>
            <Grid item xs={6}>
                <div className={classes.info}>
                    <PostDetails post={post} history={history} authenticated={authenticated}/>
                    <BoardList
                        boards={boards}
                        value={value}
                        handleSelect={handleSelectBoard}
                        handleSave={handleSave}
                        visible={authenticated}
                    />
                </div>
            </Grid>
        </Grid>
    );
};
const mapStateToProps = state => ({
    isFavourited: (id) => {
        if (state.UserStore.user.favourites.indexOf(id) !== -1) {
            return true;
        }
        return false;
    }
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            favouritePost,
            unFavouritePost
        },
        dispatch
    );
}

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Post);
