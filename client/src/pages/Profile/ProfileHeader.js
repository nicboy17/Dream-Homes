import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '3rem auto',
        maxWidth: '85%',
        padding: '2rem 0 '
    },
    avatar: {
        marginRight: '1.5rem',
        width: 100,
        height: 100
    },
    beside: {
        display: 'inline-block'
    },
    button: {
        margin: theme.spacing(0.5)
    }
}));

const ProfileHeader = ({ user, profile, history, followHandle, unFollowHandle, removeVisible }) => {
    const classes = useStyles();

    const FollowButton = () => {
        if (!user.authenticated) {
            return null;
        }

        return !profile.user.isFollowing ? (
            <Button className="followButton" color="primary" onClick={() => followHandle()}>
                Follow
            </Button>
        ) : (
            <Button
                className="followButton"
                color="primary"
                variant={'contained'}
                onClick={() => unFollowHandle()}
            >
                unFollow
            </Button>
        );
    };

    const CreateButtons = () => {
        if (!user.authenticated) {
            return null;
        } else if (profile.user._id !== user.user._id) {
            return <FollowButton />;
        }
        return (
            <div>
                <Button variant="outlined" size="medium" color="primary" className={classes.button}
                    onClick={() => { history.push(`/profile/${user.user.username}/board/create`); }}>
                    Create Board
                </Button>
                <Button variant="contained" size="medium" color="primary" className={classes.button}
                    onClick={() => { history.push(`/profile/${user.user.username}/post/create`); }}>
                    Create Post
                </Button>
            </div>
        );
    };

    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="space-around" alignItems="center">
                <div>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <div className={classes.beside}>
                            {
                                removeVisible ? (
                                    <Avatar className={classes.avatar} component={RouterLink} src={profile.user.profile} to={`/profile/${user.user.username}/edit`}/>
                                ) : (
                                    <Avatar className={classes.avatar} src={profile.user.profile}/>
                                )
                            }
                        </div>
                        <div className={classes.beside}>
                            <Typography variant="h4" gutterBottom>
                                {profile.user.name}
                            </Typography>
                            <div>
                                <Typography variant="caption" gutterBottom className={classes.beside}>
                                    <Link component={RouterLink} to={`/profile/${profile.user.username}/followers`}>
                                        {profile.user.followers} followers
                                    </Link>  |
                                    <Link component={RouterLink} to={`/profile/${profile.user.username}/following`}>
                                        {profile.user.following} following
                                    </Link>
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                </div>
                <CreateButtons />
            </Grid>
        </div>
    );
};

export default ProfileHeader;
