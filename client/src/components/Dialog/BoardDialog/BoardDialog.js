import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { addBoard } from '../../../actions/userActions';

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
            // Makes a post request to /user/:username/board
            this.props.addBoard({ title: this.state.title }, this.state.username);
            this.onCloseClick();
        }
    };

    onCloseClick = () => {
        this.props.history.push(`/profile/${this.state.username}`);
    };

    render () {
        const { classes } = this.props;

        return (
            <Dialog open={true} onClick={() => this.onCloseClick()} aria-labelledby='board-dialog' maxWidth='xs'
                fullWidth={true}>
                <div onClick={e => e.stopPropagation()}>
                    <DialogTitle style={{ textAlign: 'center' }} id='dialog-title'>Create a board</DialogTitle>
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
        );
    }
}

const mapStateToProps = state => ({
    userStore: state.UserStore
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
