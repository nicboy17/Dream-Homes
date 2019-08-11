import React from 'react';
import { withStyles } from '@material-ui/styles';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent } from '../components';
import SnackBar from '../../SnackBar/SnackBar';
import { register, respond } from '../../../actions/userActions';
import { Link } from 'react-router-dom';
import SignupForm from './SignUpForm';

const styles = theme => ({
    footer: {
        borderTop: '1px solid lightgrey',
        padding: theme.spacing(3),
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUp: {
        textDecoration: 'none',
        color: 'black',
        fontWeight: 'bold',
        '&:hover': {
            color: 'blue',
            cursor: 'pointer'
        }
    },
    p: {
        fontSize: '14px',
        margin: 'auto'
    }
});

class SignUp extends React.Component {
    constructor (props) {
        super(props);

        this.nameValidator = this.nameValidator.bind(this);
        this.usernameValidator = this.usernameValidator.bind(this);
        this.emailValidator = this.emailValidator.bind(this);
        this.passwordValidator = this.passwordValidator.bind(this);
        this.confirmPasswordValidator = this.confirmPasswordValidator.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.snackBarClose = this.snackBarClose.bind(this);

        this.state = {
            open: true,
            name: { value: '', error: false, message: '', validator: this.nameValidator },
            username: { value: '', error: false, message: '', validator: this.usernameValidator },
            email: { value: '', error: false, message: '', validator: this.emailValidator },
            password: { value: '', error: false, message: '', validator: this.passwordValidator },
            confirmPassword: { value: '', error: false, message: '', validator: this.confirmPasswordValidator },
            snackBar: false
        };
    }

    handleChange (e) {
        const name = e.target.name;
        const value = e.target.value;

        this.state[name].validator(value);
    }

    handleSignUp (e) {
        e.preventDefault();

        this.props.register({
            name: this.state.name.value,
            username: this.state.username.value,
            email: this.state.email.value,
            password: this.state.password.value
        });
        this.setState({ snackBar: true });
    }

    handleClose = () => {
        this.setState({ open: false });
        this.props.history.push('/');
    };

    snackBarClose (event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ snackBar: false });
        this.props.dispatch(respond());
        if (this.props.userStore.authenticated) {
            this.props.history.push('profile/' + this.props.userStore.user.username);
        }
    }

    ServerResponse = () => {
        if (this.props.userStore.authenticated) {
            return (
                <SnackBar message={'Sign Up Success'} variant={'success'} open={this.state.snackBar}
                    onClose={this.snackBarClose} duration={1250}/>
            );
        } else if (!this.props.userStore.authenticated && this.props.userStore.error) {
            return (
                <SnackBar message={'Sign Up Failed: ' + this.props.userStore.error.message} variant={'error'}
                    open={this.state.snackBar} onClose={this.snackBarClose} duration={2000}/>
            );
        }

        return null;
    };

    render () {
        const { classes } = this.props;

        return (
            <div>
                <Dialog onClose={this.handleClose} aria-labelledby="dialog-title" open={this.state.open} maxWidth={'md'}>
                    <DialogTitle id="title" title={'Welcome!'} onClose={this.handleClose} />
                    <DialogContent>
                        <SignupForm handleChange={this.handleChange} handleSignIn={this.handleSignUp}
                            name={this.state.name} username={this.state.username} email={this.state.email} password={this.state.password} confirmPassword={this.state.confirmPassword}
                            disabled={this.state.snackBar}/>
                    </DialogContent>
                    <div className={classes.footer}>
                        <p className={classes.p}>{'Already a Member?'}<Link to='/login' className={classes.signUp}> Login</Link></p>
                    </div>
                </Dialog>
                <this.ServerResponse />
            </div>
        );
    }

    nameValidator (value) {
        const name = this.state.name;

        if (value === '') {
            name.error = true;
            name.message = 'Name must not be empty';
        } else if (value.length < 3) {
            name.error = true;
            name.message = 'name must not be at least 3 characters';
        } else {
            name.error = false;
            name.message = '';
        }
        name.value = value;

        this.setState({ name });
    }

    usernameValidator (value) {
        const username = this.state.username;

        if (value === '') {
            username.error = true;
            username.message = 'Name must not be empty';
        } else if (value.length < 3) {
            username.error = true;
            username.message = 'name must not be at least 3 characters';
        } else {
            username.error = false;
            username.message = '';
        }
        username.value = value;

        this.setState({ username });
    }

    emailValidator (value) {
        const email = this.state.email;
        // eslint-disable-next-line no-useless-escape
        const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (value === '') {
            email.error = true;
            email.message = 'Email must not be empty';
        } else if (!emailPattern.test(value)) {
            email.error = true;
            email.message = 'Email must not be valid';
        } else {
            email.error = false;
            email.message = '';
        }
        email.value = value;

        this.setState({ email });
    }

    passwordValidator (value) {
        const password = this.state.password;

        if (value === '' || !value) {
            password.error = true;
            password.message = 'Password must not be empty';
        } else if (value.length < 8) {
            password.error = true;
            password.message = 'password must not be at least 8 characters';
        } else {
            password.error = false;
            password.message = '';
        }
        password.value = value;

        this.setState({ password });
    }

    confirmPasswordValidator (value) {
        const password = this.state.password.value;
        const confirm = this.state.confirmPassword;

        if (value === '' || !value) {
            confirm.error = true;
            confirm.message = 'Confirm Password must not be empty';
        } else if (value !== password) {
            confirm.error = true;
            confirm.message = 'Confirm Password does not match Password';
        } else {
            confirm.error = false;
            confirm.message = '';
        }
        confirm.value = value;

        this.setState({ confirm });
    }
}

const mapStateToProps = state => ({
    userStore: state.UserStore
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            register,
            dispatch
        },
        dispatch
    );
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(SignUp);
