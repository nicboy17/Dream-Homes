import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(5)
    },
    avatar: {
        marginRight: '1.5rem',
        width: 80,
        height: 80,
    },
    vertical:{
        display: 'inline-block',
        borderLeft:'1px solid lightgrey',
        height: 14,
        margin:'0 0.5rem 0 0.5rem',
    },
    beside:{
        display: 'inline-block'
    },
    button: {
        margin: theme.spacing(0.5),
    }
}));

export default function ProfileHeader() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="space-around" alignItems="center">
                <div>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <div className={classes.beside}>
                            <Avatar className={classes.avatar} />
                        </div>
                        <div className={classes.beside}>
                            <Typography variant="h4" gutterBottom>
                                Delores Jones
                            </Typography>
                            <div>
                                <Typography variant="caption" gutterBottom className={classes.beside}>
                                    134 followers
                                </Typography>
                                <div className={classes.vertical}></div>
                                <Typography variant="caption" gutterBottom className={classes.beside}>
                                    280 following
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                </div>
                <div>
                    <Button variant="outlined" size="medium" color="primary" className={classes.button}>
                        Create Board
                    </Button>
                    <Button variant="contained" size="medium" color="primary" className={classes.button}>
                        Create Post
                    </Button>
                </div>
            </Grid>
        </div>
    );
}