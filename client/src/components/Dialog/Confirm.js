import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { DialogTitle, DialogActions } from './components';

const Confirm = ({ title, open, handleChange }) => {
    return (
        <Dialog open={open} maxWidth={'md'}>
            <DialogTitle title={`Delete ${title}`} onClose={() => handleChange(false)}/>
            <DialogContent>
                <DialogContentText>
                    {`Are you sure you want to delete this ${title}?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleChange(false)} variant="contained" color="primary" autoFocus>
                    Cancel
                </Button>
                <Button onClick={() => handleChange(true)} variant="outlined" color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Confirm;
