import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

class EditPicUserDialog extends Component {
    state = {
        smallText: '',
        userNameError: false,
        username:''
    };
    //Fetch Username and Picture from UserDB
    componentDidMount = async () => {
        try {
            const username = this.props.location.pathname.split('/')[2];
            let res = await axios.get(`/users/${username}`);
            console.log(res);
            if (res.data.user) {
                return this.setState({
                    user: res.data.user,
                    profile: res.data.user.profile,
                    username: res.data.user.username
                });
            }
        } catch (err) {
            console.log('Something went wrong with fetching user API');
        }
    };

    renderLoading = () => {
        if (!Boolean(this.state.user)) {
            return (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <CircularProgress />
                </div>
            );
        }
    };

    onChangeText = e => {
        this.setState({
            username: e.target.value.replace(/\s/g, '').replace(/[^a-zA-Z0-9 ]/g, '')
        });
    };

    handleFileUpload = () => {
        document.getElementById('selectImage').click();
    };
    onChangeImage = e => {
        if (e.target.files[0]) {
            this.setState({
                profile: URL.createObjectURL(e.target.files[0]),
                imageFile: e.target.files[0]
            });
        }
    };

    onCloseClicked = () => {
        const username = this.props.location.pathname.split('/')[2];
        this.props.history.push(`/profile/${username}`);
    };

    onSavePress = async () => {
        if (this.state.username.length < 3 || this.state.username.length > 12) {
            this.setState({
                smallText: 'Username must at least 3 to 25 characters long',
                userNameError: true
            });
        } else {
            try {
                const formData = new FormData();
                formData.append('Hey', 'test');
                if (this.state.imageFile) {
                    formData.append('image', this.state.imageFile);
                }
                if (this.state.user.username !== this.state.username) {
                    formData.append('username', this.state.username);
                }

                let res = await axios({
                    url: `/users/${this.state.user.username}`,
                    method: 'PUT',
                    data: formData,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(res);
                this.props.history.push(`/profile/${this.state.username}`);
            } catch (err) {
                console.log('Something went wrong with editing user pic and username');
            }
        }
    };

    render() {
        this.renderLoading();
        return (
            <Dialog
                open={true}
                maxWidth='xs'
                fullWidth
                onClose={this.handleClose}
                aria-labelledby='form-dialog-title'
            >
                <CloseIcon onClick={() => this.onCloseClicked()} />
                <DialogTitle style={{ textAlign: 'center' }} id='form-dialog-title'>
                    Edit avatar/username
                </DialogTitle>
                <DialogContent
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Avatar
                        style={{ height: 100, width: 100, margin: 10 }}
                        src={this.state.profile || require('../../../assets/icon_profile.svg')}
                        onClick={() => this.handleFileUpload()}
                    />
                    <input
                        id='selectImage'
                        hidden
                        type='file'
                        accept='image/png,image/jpeg'
                        onChange={e => this.onChangeImage(e)}
                    />

                    <TextField
                        autoFocus
                        margin='dense'
                        id='username'
                        type='username'
                        label='Username'
                        fullWidth
                        onChange={e => this.onChangeText(e)}
                        value={this.state.username}
                        helperText={this.state.smallText}
                        error={this.state.userNameError}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onSavePress} color='primary'>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default EditPicUserDialog;
