import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Boards from './Boards';
import Posts from '../../components/Posts/Posts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { tabChange } from '../../actions/profile';
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

const ProfileTabs = ({ removeVisible, profileStore, tabChange, removeBoard, removePost }) => {
    return (
        <div>
            <Grid container direction="row" justify="space-between" alignItems="flex-start">
                <Tabs value={profileStore.tab} onChange={(e, val) => tabChange(val)}>
                    <Tab label="Boards" value={0} />
                    <Tab label="Posts" value={1} />
                    <Tab label="Favourites" value={2} />
                </Tabs>
            </Grid>
            <TabPanel value={profileStore.tab} index={0}>
                <Boards boards={profileStore.boards} deleteHandle={removeVisible ? removeBoard : false} />
            </TabPanel>
            <TabPanel value={profileStore.tab} index={1}>
                <Posts posts={profileStore.posts} deleteHandle={removeVisible ? removePost : false} />
            </TabPanel>
            <TabPanel value={profileStore.tab} index={2}>
                <Posts posts={profileStore.favourites} />
            </TabPanel>
        </div>
    );
};

const mapStateToProps = state => ({
    removeVisible: state.UserStore.authenticated && state.ProfileStore.user._id === state.UserStore.user._id,
    profileStore: state.ProfileStore
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            removeBoard,
            removePost,
            tabChange
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileTabs);
