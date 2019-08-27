import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { getFollowing } from '../../actions/userActions';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    root: {
        padding: '1rem 5rem'
    }
});

class FollowingPage extends Component {
    state = {
        placeholder: ''
    };

    componentDidMount () {
        this.props.getFollowing(this.props.userStore.user._id);
    }

    Users = () => {
        const { following } = this.props.userStore;
        if (!following) {
            return null;
        }

        return following.length === 0 ? (
            <h2>There are no users</h2>
        ) : (
            following.map((user, i) => {
                return (
                    <div key={i}>
                        <Avatar src={user.profile}/>
                        <p>{user.name}</p>
                    </div>
                );
            })
        );
    };

    render () {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <h1>You are currently Following:</h1>
                <div>
                    {this.Users()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userStore: state.UserStore
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getFollowing
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
)(FollowingPage);
