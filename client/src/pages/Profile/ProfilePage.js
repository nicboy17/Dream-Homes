import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ProfileTabs from './ProfileTabs';

import ProfileHeader from './ProfileHeader';
import Navbar from '../../components/Navbar/Navbar';
import InterestQuizDialog from '../../components/Dialog/InterestQuizDialog/QuizDialog';
import PostDialog from '../../components/Dialog/PostDialog/PostDialog';
import BoardDialog from '../../components/Dialog/BoardDialog/BoardDialog';
import EditPicUserDialog from '../../components/Dialog/EditPicUserDialog/EditPicUserDialog';
import { Route } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { getBoardsandPosts } from '../../actions/userActions';
import { connect } from 'react-redux';
import { getBoardsandPosts, clearError } from '../../actions/profileActions';
import { follow, unfollow } from '../../actions/userActions';

const styles = theme => ({
    root: {
        margin: theme.spacing(2)
    },
    body: {
        margin: '2rem auto',
        width: '80%'
    },
    tabs: {}
});

class Profile extends Component {
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
        const { classes } = this.props;

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
                <div className={classes.root}>
                    <ProfileHeader user={user} history={this.props.history}/>
                    <Divider variant={'middle'}/>
                    <div className={classes.body}>
                        <ProfileTabs selected={this.state.tab} onChange={this.tabChange} boards={boards} posts={posts}/>
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
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(ProfilePage);
