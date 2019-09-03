import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogTitle } from '../components';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import { bindActionCreators, compose } from 'redux';
import { edit } from '../../../actions/user';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

const styles = theme => ({
    button: {
        margin: '1rem auto'
    },
    name: {
        marginLeft: theme.spacing(5)
    },
    label: {
        position: 'relative'
    },
    input: {
        position: 'absolute',
        left: 0,
        right: 100,
        opacity: 0,
        top: 0,
        bottom: 0,
        width: '100%'
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
            smallText: '',
            nameError: false
        };

        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onCloseClicked = this.onCloseClicked.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount = () => {
        this.setState({
            profile: this.props.userStore.user.profile,
            username: this.props.match.params.username,
            name: this.props.userStore.user.name
        });
    };

    onChangeText = e => {
        e.preventDefault();
        this.setState({
            name: e.target.value.replace(/[^a-zA-Z0-9 ]/g, '')
        });
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

    onSave = e => {
        e.preventDefault();
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
            this.onCloseClicked();
        }
    };

    render () {
        const { classes } = this.props;
        return (
            <Dialog open={this.state.open} maxWidth='sm' fullWidth onClose={this.onCloseClicked}>
                <DialogTitle id="title" title={'Edit profile image and/or name'} onClose={this.onCloseClicked} />
                <form onClick = {e => e.stopPropagation()} onSubmit={this.onSave}>
                    <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <label type="button" id="profileUpload" htmlFor="selectImage" key={this.state.profile} className={classes.label}>
                            <Avatar
                                style={{ height: 140, width: 140, margin: 10 }}
                                src={this.state.profile}
                            />
                            <input
                                id="selectImage"
                                name="selectImage"
                                type="file"
                                accept="image/*"
                                onChange={this.onChangeImage}
                                className={classes.input}
                            />
                        </label>

                        <TextField
                            autoFocus
                            margin='dense'
                            id='name'
                            type='name'
                            label='Name'
                            className={classes.name}
                            onChange={this.onChangeText}
                            value={this.state.name}
                            helperText={this.state.smallText}
                            error={this.state.nameError}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" color="primary" className={classes.button}>Done</Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

const mapStateToProps = state => ({
    userStore: state.UserStore
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            edit
        },
        dispatch
    );
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(EditUserDialog);
