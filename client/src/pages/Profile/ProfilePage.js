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

    render () {
        const { classes } = this.props;
        const { user, boards, posts } = this.props.userStore;

        return (
            <div>
                <Navbar/>
                <div className={classes.root}>
                    <ProfileHeader user={user} history={this.props.history}/>
                    <Divider variant={'middle'}/>
                    <div className={classes.body}>
                        <ProfileTabs selected={this.state.tab} onChange={this.tabChange} boards={boards} posts={posts}/>
                    </div>
                </div>
                <Route path={'/interest-quiz'} component={InterestQuizDialog}/>
                <Route path={'/profile/:username/post/create'} component={PostDialog}/>
                <Route path={'/profile/:username/board/create'} component={BoardDialog}/>
                <Route path={'/profile/:username/edit'} component={EditPicUserDialog}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userStore: state.UserStore
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            getBoardsandPosts
        },
        dispatch
    );
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Profile);
