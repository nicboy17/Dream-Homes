import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import { Card, Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import house from '../assets/house.png';
import { Route, Link, withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import InterestQuizDialog from '../components/Dialog/InterestQuizDialog/QuizDialog';
import PostDialog from '../components/Dialog/PostDialog/PostDialog';
import BoardDialog from '../components/Dialog/BoardDialog/BoardDialog';
import EditPicUserDialog from '../components/Dialog/EditPicUserDialog/EditPicUserDialog';
import Button from '@material-ui/core/Button';
import { getBoardsandPosts, followUser, unfollowUser, fetchProfileInfo } from '../actions/profileActions';
import Posts from '../components/Posts/Posts';
import _ from 'lodash';
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
        this.props.fetchProfileInfo(username);
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
            profileStore: { profileInfo },
            history,
            followUser
        } = this.props;
        const followee = profileInfo._id;
        const currentUserId = user._id;
        if (!authenticated) {
            history.push('/login');
        } else {
            followUser(followee, currentUserId);
            this.setState({ followedOrNot: !this.state.followedOrNot });
        }
    };

    onUnfollowPress = () => {
        const {
            userStore: { user },
            profileStore: { profileInfo },
            unfollowUser
        } = this.props;
        const currentUserId = user._id;
        const followee = profileInfo._id;
        unfollowUser(followee, currentUserId);
        this.setState({ followedOrNot: !this.state.followedOrNot });
    };

    checkFollowing = () => {
        const { userStore: { user }, profileStore: { followers } } = this.props;
        const res = _.filter(followers, follower => follower._id === user._id);
        return _.isEmpty(res);
    }

    renderFollowButton = () => {
        return this.checkFollowing() ? (
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
        return this.props.profileStore.profileInfo.boards.length === 0 ? (
            <h2>There are no boards</h2>
        ) : (
            this.props.profileStore.profileInfo.boards.map((board, i) => {
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
        return this.props.profileStore.profileInfo.posts.length === 0 ? (
            <h2>There are no posts</h2>
        ) : (
            <Posts posts={this.props.profileStore.profileInfo.posts} />
        );
    };

    renderCreateButtons = () => {
        const {
            userStore: { user, authenticated },
            profileStore: { profileInfo }
        } = this.props;
        if (authenticated) {
            if (profileInfo._id !== user._id) {
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
        const { profileStore: { profileInfo, following = [], followers = [] } } = this.props;
        if (_.isEmpty(this.props.profileStore)) {
            return <CircularProgress className = 'spinner' />;
        }
        return (
            <div>
                <Route path='/profile/:username/edit' component={EditPicUserDialog}/>
                <Route path='/profile/:username/interest-quiz' component={InterestQuizDialog}/>
                <Route path='/profile/:username/post/create' component={PostDialog}/>
                <Route path='/profile/:username/board/create' component={BoardDialog}/>
                <div className='subHeader'>
                    <div className='nameContainer'>
                        <Avatar className='subHeaderIcon' component={Link} src={profileInfo.profile}
                            to={'/profile/' + profileInfo.username + '/edit'}/>
                        <div>
                            <h3 className='profileName'>{profileInfo.name}</h3>
                            <h5 className='profileFollowers'>
                                {followers.length} Followers | {following.length} Following
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
                                Posts
                            </button>
                        </div>
                        <div />
                    </div>
                    <div className='activePanel'>
                        <div
                            className={
                                profileInfo.boards.length === 0
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
                                profileInfo.posts.length === 0 ? 'postContainer1' : 'postContainer'
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
            unfollowUser,
            fetchProfileInfo
        },
        dispatch
    );
};

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Profile);
