import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Boards from './Boards';
import Posts from '../../components/Posts/Posts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removePost } from '../../actions/post';
import { removeBoard } from '../../actions/board';

function TabPanel (props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {}
}));

const ProfileTabs = ({ userStore, profileStore, selected, onChange, removeBoard, removePost }) => {
    const classes = useStyles();
    const removeVisible = userStore.authenticated && profileStore.user._id === userStore.user._id;

    const deleteBoard = (board) => {
        removeBoard(board);
    };

    const deletePost = (post) => {
        removePost(post);
    };

    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="space-between" alignItems="flex-start">
                <Tabs value={selected} onChange={onChange}>
                    <Tab label="Boards" value={0} />
                    <Tab label="Posts" value={1} />
                    <Tab label="Favourites" value={2} />
                </Tabs>
            </Grid>
            <TabPanel value={selected} index={0}>
                <Boards boards={profileStore.boards} deleteHandle={removeVisible ? deleteBoard : false} />
            </TabPanel>
            <TabPanel value={selected} index={1}>
                <Posts posts={profileStore.posts} deleteHandle={removeVisible ? deletePost : false} />
            </TabPanel>
            <TabPanel value={selected} index={2}>
                <Posts posts={profileStore.favourites} />
            </TabPanel>
        </div>
    );
};

const mapStateToProps = state => ({
    userStore: state.UserStore,
    profileStore: state.ProfileStore
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            removeBoard,
            removePost
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileTabs);
