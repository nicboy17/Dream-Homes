import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogTitle } from '../components';
import TextField from '@material-ui/core/TextField';
import { addBoard, respond } from '../../../actions/userActions';
import SnackBar from '../../SnackBar/SnackBar';

const styles = theme => ({
    button: {
        margin: '1rem auto'
    }
});

class BoardDialog extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            title: '',
            smallText: 'for example <<living room>>',
            nameError: false
        };

        this.snackBarClose = this.snackBarClose.bind(this);
    }

    componentDidMount () {
        this.setState({ username: this.props.match.params.username });
    }

    onChangeText = e => {
        this.setState({ title: e.target.value });
    };

    onCreatePress = async () => {
        if (this.state.title.length < 3 || this.state.title.length > 12) {
            this.setState({
                smallText: 'Name must at least 3 to 12 characters long',
                nameError: true
            });
        } else {
            this.props.addBoard({ title: this.state.title }, this.state.username);
            this.setState({ snackBar: true });
        }
    };

    onCloseClick = () => {
        this.props.history.push(`/profile/${this.state.username}`);
    };

    snackBarClose (event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ snackBar: false });
        if (this.props.userStore.success) {
            this.onCloseClick();
        }
        this.props.dispatch(respond());
    }

    ServerResponse = () => {
        if (this.props.userStore.success) {
            return (
                <SnackBar message={'Board Created'} variant={'success'} open={this.state.snackBar}
                    onClose={this.snackBarClose} duration={1000}/>
            );
        } else if (this.props.userStore.error) {
            return (
                <SnackBar message={'Board Creation failed'} variant={'error'}
                    open={this.state.snackBar} onClose={this.snackBarClose} duration={1500}/>
            );
        }

        return null;
    };

    render () {
        // Redirect user to profile if not authorized
        const {
            userStore,
            match: { params },
            classes
        } = this.props;
        if (userStore.authenticated) {
            if (userStore.user.username !== params.username) {
                const redirect = `/profile/${params.username}`;
                return <Redirect to={redirect} />;
            }
        }
        return (
            <div>
                <Dialog open={true} onClick={() => this.onCloseClick()} aria-labelledby='board-dialog' maxWidth='xs'
                    fullWidth={true}>
                    <div onClick={e => e.stopPropagation()}>
                        <DialogTitle style={{ textAlign: 'center' }} id='dialog-title' title={'Create a board'} onClose={() => this.onCloseClick()}/>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin='dense'
                                id='name'
                                type='name'
                                label='Name'
                                fullWidth
                                onChange={e => this.onChangeText(e)}
                                value={this.state.title}
                                helperText={this.state.smallText}
                                error={this.state.nameError}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.onCreatePress} color='primary' className={classes.button}>Create</Button>
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
            addBoard,
            dispatch
        },
        dispatch
    );
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(BoardDialog);
