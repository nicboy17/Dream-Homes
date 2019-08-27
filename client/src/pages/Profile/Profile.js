import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import '../stylesheet/Profile.css';
import Tooltip from '@material-ui/core/Tooltip';

const Profile = ({ profile, user, followHandle, unFollowHandle, createHandle }) => {
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
        if (user.authenticated && profile.user._id !== user.user._id) {
            return <FollowButton />;
        }
        return (
            <div>
                <Button
                    color="primary"
                    onClick={() => createHandle('board')}
                    style={{
                        margin: '10px'
                    }}
                >
                    Create Board
                </Button>
                <Button
                    color="primary"
                    variant={'contained'}
                    onClick={() => createHandle('post')}
                    style={{
                        margin: '10px'
                    }}
                >
                    Create Post
                </Button>
            </div>
        );
    };

    if (_.isUndefined(profile.user) || profile.loading) {
        return <CircularProgress className="spinner" />;
    }
    return (
        <div className="subHeader">
            <div className="nameContainer">
                <Tooltip title="Edit Profile">
                    <Avatar
                        className="subHeaderIcon"
                        component={Link}
                        src={profile.user.profile}
                        to={'/profile/' + profile.user.username + '/edit'}
                    />
                </Tooltip>
                <div>
                    <h3 className="profileName">{profile.user.name}</h3>
                    <h5 className="profileFollowers">
                        {profile.user.followers} Followers |{' '}
                        {profile.user.following} Following
                    </h5>
                </div>
            </div>
            <div />
            <CreateButtons />
        </div>
    );
};

export default Profile;
