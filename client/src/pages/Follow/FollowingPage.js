import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { getFollowing } from '../../actions/user';
import { withStyles } from '@material-ui/styles';
import Users from '../../components/Users/Users';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, Transition } from '../../components/Dialog/components';

const styles = theme => ({
    root: {
        padding: '1rem 5rem'
    },
    header: {
        marginBottom: theme.spacing(4)
    }
});

class FollowingPage extends Component {
    constructor (props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);

        this.state = {
            open: true
        };
    }

    componentDidMount () {
        const { userStore, profileStore, getFollowing, match } = this.props;
        if (match.params.username === userStore.user.username) {
            getFollowing(userStore.user._id);
        } else {
            getFollowing(profileStore.user._id);
        }
    }

    handleClose () {
        this.setState({ open: false });
        this.props.history.goBack();
    };

    render () {
        const { profileStore: { following } } = this.props;

        return (
            <Dialog onClose={this.handleClose} TransitionComponent={Transition} open={this.state.open} maxWidth={'md'}>
                <DialogTitle id="title" title={'Following:'} onClose={this.handleClose} />
                <Users users={following} history={this.props.history}/>
            </Dialog>
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
