import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { getFollowers } from '../../actions/user';
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

class FollowersPage extends Component {
    constructor (props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);

        this.state = {
            open: true
        };
    }

    componentDidMount () {
        const { profileStore, getFollowers } = this.props;
        getFollowers(profileStore.user._id);
    }

    handleClose () {
        this.setState({ open: false });
        this.props.history.goBack();
    };

    render () {
        const { profileStore: { followers } } = this.props;

        return (
            <Dialog onClose={this.handleClose} TransitionComponent={Transition} open={this.state.open} maxWidth={'md'}>
                <DialogTitle id="title" title={'Followers:'} onClose={this.handleClose} />
                <Users users={followers} history={this.props.history}/>
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
