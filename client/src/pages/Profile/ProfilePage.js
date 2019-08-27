import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SnackBar from '../../components/SnackBar/SnackBar';
import { Route, withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import InterestQuizDialog from '../../components/Dialog/InterestQuizDialog/QuizDialog';
import PostDialog from '../../components/Dialog/PostDialog/PostDialog';
import BoardDialog from '../../components/Dialog/BoardDialog/BoardDialog';
import EditPicUserDialog from '../../components/Dialog/EditPicUserDialog/EditPicUserDialog';
import Button from '@material-ui/core/Button';
import Posts from '../../components/Posts/Posts';
import _ from 'lodash';
import '../stylesheet/Profile.css';
import { getBoardsandPosts, clearError } from '../../actions/profileActions';
import { follow, unfollow } from '../../actions/userActions';
import Boards from './Boards';
import Profile from './Profile';

class ProfilePage extends Component {
    state = {
        username: '',
        activePanel: 'board',
        SnackBar: true
    };

    componentDidMount () {
        const username = this.props.match.params.username;
        this.setState({ username: username });
        this.props.getBoardsandPosts(username);
    }

    toggleTabs = item => {
        this.setState({ activePanel: `${item}` });
    };

    onCreate = item => {
        this.props.history.push(`/profile/${this.state.username}/${item}/create`);
    };

    onFollow = () => {
        const { follow, profileStore: { user } } = this.props;
        follow(user._id);
        this.setState({ followedOrNot: !this.state.followedOrNot });
    };

    onUnFollow = () => {
        const { unfollow, profileStore: { user } } = this.props;
        unfollow(user._id);
        this.setState({ followedOrNot: !this.state.followedOrNot });
    };

    renderSnackBarError = () => {
        const {
            profileStore: { error },
            clearError
        } = this.props;
        if (!_.isEmpty(error)) {
            return (
                <SnackBar
                    message={error.message}
                    variant={error.status}
                    open={!_.isEmpty(error)}
                    onClose={() => {
                        this.setState({ SnackBar: false });
                        clearError();
                    }}
                />
            );
        }
    };

    render () {
        const { profileStore: { user, boards, posts, favourites, loading } } = this.props;
        if (_.isUndefined(user) || loading) {
            return <CircularProgress className="spinner" />;
        }
        return (
            <div>
                <Route path="/profile/:username/edit" component={EditPicUserDialog} />
                <Route path="/profile/:username/interest-quiz" component={InterestQuizDialog} />
                <Route path="/profile/:username/post/create"
                    render={props => <PostDialog key={props.match.params.username} {...props} />}
                />
                <Route path="/profile/:username/board/create" component={BoardDialog} />
                <Profile user={this.props.userStore} profile={this.props.profileStore} createHandle={this.onCreate}
                    followHandle={this.onFollow} unFollowHandle={this.onUnFollow} />
                <div style={{ display: this.state.activePanel === 'board' ? 'grid' : 'none' }}>
                    <div className="tabSection">
                        <div>
                            <Button color="primary" variant={'contained'}
                                style={{ margin: '10px' }}>
                                Boards
                            </Button>
                            <Button
                                color="primary" style={{ margin: '10px' }}
                                onClick={() => this.toggleTabs('post')}>
                                Posts
                            </Button>
                            <Button color="primary" style={{ margin: '10px' }}
                                onClick={() => this.toggleTabs('favorite')}>
                                Favorites
                            </Button>
                        </div>
                        <div />
                    </div>
                    <div className="activePanel">
                        <div className={boards.length === 0 ? 'gridContainer1' : 'gridContainer'}>
                            <Boards boards={boards} />
                        </div>
                    </div>
                </div>
                <div style={{ display: this.state.activePanel === 'post' ? 'grid' : 'none' }}>
                    <div className="tabSection">
                        <div>
                            <Button
                                color="primary" style={{ margin: '10px' }}
                                onClick={() => this.toggleTabs('board')}>
                                Boards
                            </Button>
                            <Button
                                color="primary" style={{ margin: '10px' }}
                                variant={'contained'}>
                                Posts
                            </Button>
                            <Button
                                color="primary" style={{ margin: '10px' }}
                                onClick={() => this.toggleTabs('favorite')}>
                                Favorites
                            </Button>
                        </div>
                        <div />
                    </div>
                    <div className="Panel">
                        <div className={posts.length === 0 ? 'postContainer1' : 'postContainer'}>
                            <Posts posts={posts}/>
                        </div>
                    </div>
                </div>
                <div style={{ display: this.state.activePanel === 'favorite' ? 'grid' : 'none' }}>
                    <div className="tabSection">
                        <div>
                            <Button
                                color="primary" style={{ margin: '10px' }}
                                onClick={() => this.toggleTabs('board')}>
                                Boards
                            </Button>
                            <Button
                                id="post" color="primary" style={{ margin: '10px' }}
                                onClick={() => this.toggleTabs('post')}>
                                Posts
                            </Button>
                            <Button
                                color="primary" style={{ margin: '10px' }}
                                variant={'contained'}>
                                Favorites
                            </Button>
                        </div>
                        <div />
                    </div>
                    <div className="Panel">
                        <div className={posts.length === 0 ? 'postContainer1' : 'postContainer'}>
                            <Posts posts={favourites}/>
                        </div>
                    </div>
                </div>
                {this.renderSnackBarError()}
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
            follow,
            unfollow,
            clearError
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
)(ProfilePage);
