import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

class BoardDialog extends Component {
    state = {
        name: '',
        smallText: 'for example <<living room>>',
        nameError: false
    };

    onChangeText = e => {
        this.setState({ name: e.target.value });
    };

    onCreatePress = async () => {
        const username = this.props.location.pathname.split('/')[2];
        if (this.state.name.length < 3 || this.state.name.length > 12) {
            this.setState({
                smallText: 'Name must at least 3 to 12 characters long',
                nameError: true
            });
        } else {
            // Makes a post request to /user/:username/board
            try {
                const body = {
                    title: this.state.name
                };
                const config = {
                    'Content-Type': 'application/json'
                };
                let res = await axios.post(`/users/${username}/board`, body, config);
                if (res.data.success) {
                    return this.props.history.push('/');
                }
                // Snackbar show alert
                console.log('Something went wrong with the post request');
            } catch (err) {
                // Snackbar show alert
                console.log(err.message);
            }
        }
    };

    onCloseClick = () => {
        const username = this.props.location.pathname.split('/')[2];
        this.props.history.push(`/profile/${username}`);
    };

    render() {
        return (
            <Dialog
                open={true}
                onClick={() => this.onCloseClick()}
                aria-labelledby='form-dialog-title'
                maxWidth = 'xs'
                fullWidth = {true}
            >
                <div onClick={e => e.stopPropagation()}>
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
                        <Button onClick={this.onCreatePress} color='primary'>
                            Create
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        );
    }
}

export default BoardDialog;
