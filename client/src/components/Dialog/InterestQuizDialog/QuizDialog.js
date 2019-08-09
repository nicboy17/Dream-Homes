import React from 'react';
import { withStyles } from '@material-ui/styles';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
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

    handleChange (interest) {
        const selected = this.state.selected;
        const index = selected.indexOf(interest);

        if (index !== -1) {
            selected.splice(index, 1);
        } else if (selected.length <= 6) {
            selected.push(interest);
        }
        this.setState({ selected });
    }

    async handleConfirm () {
        const username = this.props.location.pathname.split('/')[2];
        try {
            const body = {
                interests: this.state.selected
            };
            const config = {
                'Content-Type': 'application/json'
            };
            const res = await axios.put(`users/${username}/interests`, body, config);
            if (res.data.success) {
                return this.props.history.push(`/profile/:${username}`);
            }
        } catch (err) {
            console.log(err);
        }
        this.setState({ open: false });
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    DialogTitle = withStyles(styles)(props => {
        const { children, classes, onClose } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root}>
                <Typography variant="h5" className={classes.title}>{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose} href={''}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });

    DialogContent = withStyles(theme => ({
        root: {
            paddingLeft: theme.spacing(8),
            paddingRight: theme.spacing(8),
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2)
        }
    }))(MuiDialogContent);

    DialogActions = withStyles(theme => ({
        root: {
            margin: 0,
            padding: theme.spacing(1),
            marginBottom: '2rem'
        }
    }))(MuiDialogActions);

    render () {
        const { classes } = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open} maxWidth={'md'}>
                <this.DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                    Select your interests:
                </this.DialogTitle>
                <this.DialogContent>
                    <Interests handleChange={this.handleChange} selected={this.state.selected} />
                </this.DialogContent>
                <this.DialogActions>
                    <Button onClick={this.handleConfirm} color="primary" className={classes.button} href={''}>
                        Done!
                    </Button>
                </this.DialogActions>
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
