import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { DialogTitle, DialogActions } from './components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { yes, no } from '../../actions/confirm';

const Confirm = ({ confirmStore, yes, no }) => {
    return (
        <Dialog open={confirmStore.open} maxWidth={'md'}>
            <DialogTitle title={confirmStore.title} onClose={no}/>
            <DialogContent>
                <DialogContentText>
                    {confirmStore.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={no} variant="contained" color="primary" autoFocus>
                    Cancel
                </Button>
                <Button onClick={yes} variant="outlined" color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = state => ({
    confirmStore: state.ConfirmStore
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            yes,
            no
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Confirm);
