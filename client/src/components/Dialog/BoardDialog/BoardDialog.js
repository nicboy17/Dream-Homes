import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogTitle } from '../components';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import { addBoard } from '../../../actions/board';

const styles = theme => ({
    button: {
        display: 'block',
        margin: '2rem auto'
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
    }

    componentDidMount () {
        this.setState({ username: this.props.match.params.username });
    }

    onChangeText = e => {
        this.setState({ title: e.target.value });
    };

    onCreate = () => {
        if (this.state.title.length < 3 || this.state.title.length > 12) {
            this.setState({
                smallText: 'Name must at least 3 to 12 characters long',
                nameError: true
            });
        } else {
            this.props.addBoard({ title: this.state.title }, this.state.username);
            this.onCloseClick();
        }
    };

    onCloseClick = () => {
        this.props.history.push(`/profile/${this.state.username}`);
    };

    render () {
        const { userStore, match: { params }, classes } = this.props;
        if (userStore.authenticated && userStore.user.username !== params.username) {
            return <Redirect to={`/profile/${params.username}`} />;
        }

        return (
            <Dialog open={true} onClick={() => this.onCloseClick()} aria-labelledby='board-dialog' maxWidth='xs'
                fullWidth={true}>
                <div onClick={e => e.stopPropagation()}>
                    <DialogTitle style={{ textAlign: 'center' }} id='dialog-title' title={'Create a board'} onClose={() => this.onCloseClick()}/>
                    <DialogContent>
                        <form onSubmit={() => this.onCreate()}>
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
                            <div>
                                <Button type='submit' color='primary' className={classes.button}>Create</Button>
                            </div>
                        </form>
                    </DialogContent>
                </div>
            </Dialog>
        );
    }
}

const mapStateToProps = state => ({
    userStore: state.UserStore,
    snackBarStore: state.SnackBarStore
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            addBoard
        },
        dispatch
    );
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(BoardDialog);
