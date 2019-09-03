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
            following: false
        };
    }

    componentDidMount () {
        const { match, getBoardsandPosts, userStore, history } = this.props;
        getBoardsandPosts(match.params.username);
        if (userStore.authenticated && userStore.user.takeQuiz) {
            history.push(`/profile/${userStore.user.username}/interest-quiz`);
        }
    }

    onFollow = () => {
        const { follow, profileStore: { user } } = this.props;
        follow(user._id);
        this.setState({ following: true });
    };

    onUnFollow = () => {
        const { unfollow, profileStore: { user } } = this.props;
        unfollow(user._id);
        this.setState({ following: false });
    };

    render () {
        const { classes, userStore, profileStore: { user }, removeVisible } = this.props;

        if (!user) {
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
                        followHandle={() => this.onFollow()} unFollowHandle={() => this.onUnFollow()} removeVisible={removeVisible}/>
                    <Divider variant={'middle'}/>
                    <div className={classes.body}>
                        <ProfileTabs removeVisible={removeVisible} />
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
    removeVisible: state.UserStore.authenticated && state.ProfileStore.user._id === state.UserStore.user._id,
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
