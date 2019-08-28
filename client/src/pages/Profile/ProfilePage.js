import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ProfileTabs from './ProfileTabs';
import ProfileHeader from './ProfileHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import InterestQuizDialog from '../../components/Dialog/InterestQuizDialog/QuizDialog';
import PostDialog from '../../components/Dialog/PostDialog/PostDialog';
import BoardDialog from '../../components/Dialog/BoardDialog/BoardDialog';
import EditPicUserDialog from '../../components/Dialog/EditUserDialog/EditUserDialog';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import SnackBar from '../../components/SnackBar/SnackBar';
import { getBoardsandPosts, clearError } from '../../actions/profile';
import { follow, unfollow } from '../../actions/user';

const styles = theme => ({
    root: {
        margin: theme.spacing(2)
    },
    body: {
        margin: '2rem auto',
        width: '85%'
    },
    tabs: {}
});

class ProfilePage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            tab: 0
        };

        this.tabChange = this.tabChange.bind(this);
    }

    componentDidMount () {
        const username = this.props.match.params.username;
        this.setState({ username: username });
        this.props.getBoardsandPosts(username);
    }

    tabChange (e, value) {
        this.setState({ tab: value });
    }

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
        const { classes } = this.props;

        const { userStore, profileStore: { user, boards, posts, favourites, loading } } = this.props;
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
                <div className={classes.root}>
                    <ProfileHeader user={userStore} profile={this.props.profileStore} history={this.props.history}
                        followHandle={() => this.onFollow()} unFollowHandle={() => this.onUnFollow()}/>
                    <Divider variant={'middle'}/>
                    <div className={classes.body}>
                        <ProfileTabs selected={this.state.tab} onChange={this.tabChange} boards={boards} posts={posts} favourites={favourites}/>
                    </div>
                </div>
                <Route path={'/profile/:username/interest-quiz'} component={InterestQuizDialog}/>
                <Route path={'/profile/:username/post/create'} component={PostDialog}/>
                <Route path={'/profile/:username/board/create'} component={BoardDialog}/>
                <Route path={'/profile/:username/edit'} component={EditPicUserDialog}/>
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
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(ProfilePage);
