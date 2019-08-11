import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(7),
        maxWidth: '80%'
    },
    avatar: {
        marginRight: '1.5rem',
        width: 80,
        height: 80
    },
    beside: {
        display: 'inline-block'
    },
    button: {
        margin: theme.spacing(0.5)
    }
}));

const ProfileHeader = ({ user, history }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="space-around" alignItems="center">
                <div>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <div className={classes.beside}>
                            <Avatar className={classes.avatar} component={Link} src={user.image}
                                to={'/profile/' + user.username + '/edit'}/>
                        </div>
                        <div className={classes.beside}>
                            <Typography variant="h4" gutterBottom>
                                {user.name}
                            </Typography>
                            <div>
                                <Typography variant="caption" gutterBottom className={classes.beside}>
                                    134 followers | 280 following
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                </div>
                <div>
                    <Button variant="outlined" size="medium" color="primary" className={classes.button} onClick={() => {
                        history.push('/profile/' + user.username + '/board/create');
                    }}>
                        Create Board
                    </Button>
                    <Button variant="contained" size="medium" color="primary" className={classes.button}
                        onClick={() => {
                            history.push('/profile/' + user.username + '/post/create');
                        }}>
                        Create Post
                    </Button>
                </div>
            </Grid>
        </div>
    );
};

export default ProfileHeader;
