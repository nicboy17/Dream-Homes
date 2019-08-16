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
    constructor (props) {
        super(props);
        this.state = {
            smallText: '',
            nameError: false,
            name: ''
        };
    }

    // Fetch Name and Picture from UserDB
    componentDidMount = async () => {
        try {
            const username = this.props.location.pathname.split('/')[2];
            const res = await axios.get(`/users/${username}`);
            console.log(res);
            if (res.data.user) {
                return this.setState({
                    user: res.data.user,
                    profile: res.data.user.profile,
                    username: res.data.user.username,
                    name: res.data.user.name
                });
            }
        } catch (err) {
            console.log('Something went wrong with fetching user API');
        }
    };

    renderLoading = () => {
        if (!this.state.user) {
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
            name: e.target.value.replace(/[^a-zA-Z0-9 ]/g, '')
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
        this.props.history.push(`/profile/${this.state.username}`);
    };

    onSavePress = async () => {
        if (this.state.name.length < 3 || this.state.name.length > 25) {
            this.setState({
                smallText: 'Name must at least 3 to 25 characters long',
                nameError: true
            });
        } else {
            try {
                const formData = new FormData();
                if (this.state.imageFile) {
                    formData.append('image', this.state.imageFile);
                }
                if (this.state.user.name !== this.state.name) {
                    formData.append('name', this.state.name);
                }

                const res = await axios({
                    url: `/users/${this.state.user.username}`,
                    method: 'PUT',
                    data: formData,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(res);
                this.props.history.push(`/profile/${this.state.username}`);
                window.location.reload();
            } catch (err) {
                console.log('Something went wrong with editing user pic and username');
            }
        }
    };

    render () {
        this.renderLoading();
        return (
            <Dialog
                open={true}
                maxWidth='xs'
                fullWidth
                onClose={this.handleClose}
                aria-labelledby='form-dialog-title'
                onClick={() => this.onCloseClicked()}
                stop
            >
                <div onClick = {e => e.stopPropagation()}>
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
                        <Button onClick={this.onSavePress} color='primary'>
                            Save
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        );
    }
}

export default EditPicUserDialog;
