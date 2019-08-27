import React from 'react';
import { withStyles } from '@material-ui/styles';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogActions, DialogContent } from '../components';
import Interests from './Interests';
import { saveInterests } from '../../../actions/userActions';

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
        this.setState({
            username: this.props.match.params.username,
            selected: this.props.user.interests
        });
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
        const username = this.props.match.params.username;
        this.props.saveInterests(username, this.state.selected);
        this.handleClose();
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
    user: state.UserStore.user
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            saveInterests
        },
        dispatch
    );
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(QuizDialog);
