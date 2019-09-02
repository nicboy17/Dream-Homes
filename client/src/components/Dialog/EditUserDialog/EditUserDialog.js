import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogTitle } from '../components';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import { bindActionCreators, compose } from 'redux';
import { edit, respond } from '../../../actions/user';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import SnackBar from '../../SnackBar/SnackBar';

const styles = theme => ({
    button: {
        margin: '1rem auto'
    },
    input: {
        marginLeft: theme.spacing(5)
    }
});

class EditUserDialog extends Component {
    constructor (props) {
        super(props);
        this.state = {
            open: true,
            loading: false,
            name: '',
            username: '',
            image: '',
            profile: '',
            snackBar: false,
            smallText: '',
            nameError: false
        };

        this.onSavePress = this.onSavePress.bind(this);
        this.snackBarClose = this.snackBarClose.bind(this);
    }

    componentDidMount = async () => {
        this.setState({
            profile: this.props.userStore.user.profile,
            username: this.props.match.params.username,
            name: this.props.userStore.user.name
        });
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
                image: e.target.files[0]
            });
        }
    };

    onCloseClicked = () => {
        this.props.history.push(`/profile/${this.state.username}`);
    };

    onSavePress = () => {
        if (this.state.name.length < 3 || this.state.name.length > 25) {
            this.setState({
                smallText: 'Name must at least 3 to 25 characters long',
                nameError: true
            });
        } else {
            this.props.edit({
                username: this.state.username,
                name: this.state.name,
                image: this.state.image
            });
            this.setState({ snackBar: true });
        }
    };

    snackBarClose (event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ snackBar: false });
        if (this.props.userStore.success) {
            this.props.history.push('/profile/' + this.state.username);
        }
        this.props.dispatch(respond());
    }

    // TODO: Refactor into seperate component
    ServerResponse = () => {
        if (this.props.userStore.success) {
            return (
                <SnackBar message={'User Updated'} variant={'success'} open={this.state.snackBar}
                    onClose={this.snackBarClose} duration={1250}/>
            );
        } else if (this.props.userStore.error) {
            return (
                <SnackBar message={'User Update Failed'} variant={'error'}
                    open={this.state.snackBar} onClose={this.snackBarClose} duration={2000}/>
            );
        }

        return null;
    };

    render () {
        const { classes } = this.props;

        return (
            <div>
                <Dialog
                    open={this.state.open}
                    maxWidth='sm'
                    fullWidth
                    onClose={this.handleClose}
                    aria-labelledby='form-dialog-title'
                    onClick={() => this.onCloseClicked()}
                >
                    <div onClick = {e => e.stopPropagation()}>
                        <DialogTitle id="title" title={'Edit profile image and/or name'} onClose={() => this.onCloseClicked()} />
                        <DialogContent
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Avatar
                                style={{ height: 100, width: 100, margin: 10 }}
                                src={this.state.profile}
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
                                className={classes.input}
                                onChange={e => this.onChangeText(e)}
                                value={this.state.name}
                                helperText={this.state.smallText}
                                error={this.state.nameError}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.onSavePress} color="primary" className={classes.button}>Done</Button>
                        </DialogActions>
                    </div>
                </Dialog>
                <this.ServerResponse />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userStore: state.UserStore
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            edit,
            dispatch
        },
        dispatch
    );
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(EditUserDialog);
