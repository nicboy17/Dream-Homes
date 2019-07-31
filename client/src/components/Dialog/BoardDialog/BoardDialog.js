import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

class BoardDialog extends Component {
    state = {
        name: '',
        smallText: 'for example <<living room>>',
        nameError: false
    };

    onChangeText = e => {
        this.setState({ name: e.target.value });
    };

    onCreatePress = () => {
        if (this.state.name.length < 3 || this.state.name.length > 12) {
            this.setState({
                smallText: 'Name must atleast 3 to 12 characters long',
                nameError: true
            })
        } else {
            this.props.history.push('/');
        }
    };

    render() {
        return (
            <Dialog open={true} onClose={this.handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle style={{ textAlign: 'center' }} id='form-dialog-title'>
                    Create a board
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        type='name'
                        label='Name'
                        fullWidth
                        onChange={e => this.onChangeText(e)}
                        value={this.state.name}
                        helperText={this.state.smallText}
                        error={this.state.nameError}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.onCreatePress}
                        color='primary'
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default BoardDialog;
