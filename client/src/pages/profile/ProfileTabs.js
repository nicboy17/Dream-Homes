import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles( {
});

export default function ProfileTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <Grid container direction="row" justify="space-around" alignItems="center">
            <Tabs value={value} onChange={handleChange} className={classes.tabs}>
                <Tab label="BOARDS" value={0} />
                <Tab label="INSPIRATION" />
                <Tab label="MY POSTS" />
            </Tabs>
            <Typography className={classes.padding} />
        </Grid>
    );
}