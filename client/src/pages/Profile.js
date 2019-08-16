import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import { Card, Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import house from '../assets/house.png';
import { Route, Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import InterestQuizDialog from '../components/Dialog/InterestQuizDialog/QuizDialog';
import PostDialog from '../components/Dialog/PostDialog/PostDialog';
import BoardDialog from '../components/Dialog/BoardDialog/BoardDialog';
import EditPicUserDialog from '../components/Dialog/EditPicUserDialog/EditPicUserDialog';
import Button from '@material-ui/core/Button';
import { getBoardsandPosts, followUser, unfollowUser } from '../actions/profileActions';
import Posts from '../components/Posts/Posts';

import './stylesheet/Profile.css';

class Profile extends Component {
    state = {
        username: '',
        activePanel: 'board',
        followedOrNot: false
    };

    componentDidMount () {
        const username = this.props.match.params.username;
        this.setState({ username: username });
        this.props.getBoardsandPosts(username);
    }

    toggle = () => {
        if (this.state.activePanel === 'board') {
            this.setState({ activePanel: 'post' });
        } else {
            this.setState({ activePanel: 'board' });
        }
    };

    onCreateBoardPress = () => {
        this.props.history.push(`/profile/${this.state.username}/board/create`);
    };

    onCreatePostPress = () => {
        this.props.history.push(`/profile/${this.state.username}/post/create`);
    };

    onFollowPress = () => {
        const {
            userStore: { authenticated, user },
            profileStore: { _id },
            history,
            followUser
        } = this.props;
        const currentUserId = user._id;
        const followingId = _id;
        if (!authenticated) {
            history.push('/login');
        } else {
            followUser(currentUserId, followingId);
            this.setState({ followedOrNot: !this.state.followedOrNot });
        }
    };

    onUnfollowPress = () => {
        const {
            userStore: { user },
            profileStore: { _id },
            unfollowUser
        } = this.props;
        const currentUserId = user._id;
        const followingId = _id;
        unfollowUser(currentUserId, followingId);
        this.setState({ followedOrNot: !this.state.followedOrNot });
    };

    renderFollowButton = () => {
        return this.state.followedOrNot === false ? (
            <button className='followButton' onClick={() => this.onFollowPress()}>
                Follow!
            </button>
        ) : (
            <button className='followButton' onClick={() => this.onUnfollowPress()}>
                Stop Following!
            </button>
        );
    };

    renderBoards = () => {
        return this.props.profileStore.boards.length === 0 ? (
            <h2>You have not added any boards yet.</h2>
        ) : (
            this.props.profileStore.boards.map((board, i) => {
                return (
                    <Card key={i} className='card'>
                        <CardActionArea className='card'>
                            <CardMedia className='cardImg' image={house} />
                            <Typography variant='h6' className='cardHeader'>
                                {board['title']}
                            </Typography>
                            <Typography variant='body1' className='cardHeader'>
                                {board['posts'].length} posts
                            </Typography>
                        </CardActionArea>
                    </Card>
                );
            })
        );
    };

    renderPosts = () => {
        return this.props.profileStore.posts.length === 0 ? (
            <h2>You have not added any posts yet.</h2>
        ) : (
            <Posts posts={this.props.profileStore.posts} />
        );
    };

    renderCreateButtons = () => {
        const {
            userStore: { user, authenticated },
            profileStore
        } = this.props;
        if (authenticated) {
            if (profileStore._id !== user._id) {
                return <>{this.renderFollowButton()}</>;
            }
        } else if (!authenticated) {
            return <>{this.renderFollowButton()}</>;
        }
        return (
            <>
                <Button
                    color='primary'
                    className='button'
                    onClick={() => this.onCreateBoardPress()}
                >
                    Create Board
                </Button>
                <Button
                    color='primary'
                    className='button'
                    variant={'contained'}
                    onClick={() => this.onCreatePostPress()}
                >
                    Create Post
                </Button>
            </>
        );
    };

    render () {
        const { profileStore } = this.props;
        if (!profileStore.boards) {
            return <CircularProgress />;
        }

        return (
            <div>
                <Route path='/profile/:username/edit' component={EditPicUserDialog}/>
                <Route path='/profile/:username/interest-quiz' component={InterestQuizDialog}/>
                <Route path='/profile/:username/post/create' component={PostDialog}/>
                <Route path='/profile/:username/board/create' component={BoardDialog}/>
                <div className='subHeader'>
                    <div className='nameContainer'>
                        <Avatar className='subHeaderIcon' component={Link} src={profileStore.profile}
                            to={'/profile/' + profileStore.username + '/edit'}/>
                        <div>
                            <h3 className='profileName'>{this.state.username}</h3>
                            <h5 className='profileFollowers'>
                                {profileStore.followers || 0} Followers |{' '}
                                {profileStore.following || 0} Following
                            </h5>
                        </div>
                    </div>
                    <div />
                    <div>{this.renderCreateButtons()}</div>
                    <div />
                </div>
                <div style={{ display: this.state.activePanel === 'board' ? 'grid' : 'none' }}>
                    <div className='tabSection'>
                        <div>
                            <button className='activeTab' onClick={() => this.toggle()}>
                                Boards
                            </button>
                            <button className='tab' onClick={() => this.toggle()}>
                                My Posts
                            </button>
                        </div>
                        <div />
                    </div>
                    <div className='activePanel'>
                        <div
                            className={
                                profileStore.boards.length === 0
                                    ? 'gridContainer1'
                                    : 'gridContainer'
                            }
                        >
                            {this.renderBoards()}
                        </div>
                    </div>
                </div>
                <div style={{ display: this.state.activePanel === 'post' ? 'grid' : 'none' }}>
                    <div className='tabSection'>
                        <div>
                            <button className='tab' onClick={() => this.toggle()}>
                                Boards
                            </button>
                            <button className='activeTab' onClick={() => this.toggle()}>
                                My Posts
                            </button>
                        </div>
                        <div />
                    </div>
                    <div className='activePanel'>
                        <div
                            className={
                                profileStore.posts.length === 0 ? 'postContainer1' : 'postContainer'
                            }
                        >
                            {this.renderPosts()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userStore: state.UserStore,
    profileStore: state.ProfileStore
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getBoardsandPosts,
            followUser,
            unfollowUser
        },
        dispatch
    );
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Profile);
