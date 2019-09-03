import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { getFollowers } from '../../actions/user';
import { withStyles } from '@material-ui/styles';
import Users from '../../components/Users/Users';

const styles = theme => ({
    root: {
        padding: '1rem 5rem'
    },
    header: {
        marginBottom: theme.spacing(4)
    }
});

class FollowersPage extends Component {
    componentDidMount () {
        const { userStore, getFollowers, match } = this.props;
        if (match.params.username === userStore.user.username) {
            getFollowers(this.props.userStore.user._id);
        } else {
            getFollowers(this.props.profileStore.user._id);
        }
    }

    render () {
        const { classes, profileStore: { followers } } = this.props;
        return (
            <div className={classes.root}>
                <h1>Followers:</h1>
                <div>
                    <Users users={followers} history={this.props.history}/>
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
            getFollowers
        },
        dispatch
    );
};

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(FollowersPage);
