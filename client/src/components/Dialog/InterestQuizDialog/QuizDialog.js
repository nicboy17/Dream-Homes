import React from 'react';
import { withStyles } from '@material-ui/styles';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogActions, DialogContent } from '../components';
import Interests from './Interests';
import axios from 'axios';

const styles = theme => ({
    root: {
        textAlign: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    },
    button: {
        margin: '1rem auto'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 26
    }
});

class QuizDialog extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            open: true,
            selected: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    componentDidMount () {
        const username = this.props.match.params.username;
        this.setState({ username: username });
    }

    handleChange (interest) {
        const selected = this.state.selected;
        const index = selected.indexOf(interest);

        if (index !== -1) {
            selected.splice(index, 1);
        } else if (selected.length < 6) {
            selected.push(interest);
        }
        this.setState({ selected });
    }

    async handleConfirm () {
        try {
            const body = {
                interests: this.state.selected
            };
            const config = {
                'Content-Type': 'application/json',
                'access-token': this.props.userStore.token
            };
            const res = await axios.put(`users/${this.state.username}/interests`, body, config);
            if (res.data.success) {
                return this.props.history.push(`/profile/${this.state.username}`);
            }
        } catch (err) {
            console.log(err);
        }
        this.setState({ open: false });
    }

    handleClose = () => {
        this.setState({ open: false });
        this.props.history.push(`/profile/${this.state.username}`);
    };

    render () {
        const { classes } = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open} maxWidth={'md'}>
                <DialogTitle id="title" title={'Select your interests:'} onClose={this.handleClose} />
                <DialogContent>
                    <Interests handleChange={this.handleChange} selected={this.state.selected} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleConfirm} color="primary" className={classes.button}>
                        Done!
                    </Button>
                </DialogActions>
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
            // back-end integration with redux-saga
        },
        dispatch
    );
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(QuizDialog);
