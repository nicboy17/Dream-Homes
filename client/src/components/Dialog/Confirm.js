import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { DialogTitle, DialogActions } from './components';

const Confirm = ({ title, item, className }) => {
    const [open, setOpen] = React.useState(null);

    const handleOnDeletePress = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton
                size="medium"
                style={{
                    marginRight: '10px'
                }}
                onClick={() => setOpen(true)}
                className={className}
            >
                <DeleteIcon style={{ color: item === 'posts' ? 'white' : 'gray' }} />
            </IconButton>
            <Dialog open={open} maxWidth={'md'}>
                <DialogTitle title={`Delete ${title}`} onClose={() => setOpen(false)}/>
                <DialogContent>
                    <DialogContentText>
                        {`Are you sure you want to delete this ${item}?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} variant="contained" color="primary" autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={() => handleOnDeletePress()} variant="outlined" color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Confirm;
