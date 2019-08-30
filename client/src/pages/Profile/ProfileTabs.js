import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Boards from './Boards';
import Posts from '../../components/Posts/Posts';

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

const ProfileTabs = ({ selected, onChange, boards, posts, favourites }) => {
    const classes = useStyles();

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
                <Boards boards={boards} />
            </TabPanel>
            <TabPanel value={selected} index={1}>
                <Posts posts={posts} deleteButtonVisible={true} />
            </TabPanel>
            <TabPanel value={selected} index={2}>
                <Posts posts={favourites} />
            </TabPanel>
        </div>
    );
};

export default ProfileTabs;
