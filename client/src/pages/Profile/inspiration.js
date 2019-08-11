import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2)
    }
}));

const Inspiration = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h2>You have not added any Inspiration yet.</h2>
        </div>
    );
};

export default Inspiration;
