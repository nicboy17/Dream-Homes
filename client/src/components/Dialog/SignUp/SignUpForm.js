import React from 'react';
import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(6),
        backgroundColor: theme.palette.background.paper
    },
    signIn: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: '1',
        position: 'fixed',
        left: '0px',
        top: '0px',
        height: '100vh',
        width: '100vw',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgotPassword: {
        textAlign: 'center',
        margin: '0.5rem 0',
        textDecoration: 'underline',
        fontSize: '13px',
        color: 'grey',
        '&:hover': {
            color: 'blue',
            cursor: 'pointer'
        }
    },
    formControl: {
        marginBottom: theme.spacing(6),
        display: 'block',
        minWidth: '22vw'
    },
    input: {
        width: '25vw'
    },
    button: {
        display: 'block',
        margin: '4rem auto 0'
    }
}));

// eslint-disable-next-line react/prop-types
const SignUpForm = ({ handleChange, handleSignIn, name, username, email, password, confirmPassword, disabled }) => {
    const classes = useStyles();

    const FormHelper = ({ input }) => {
        if (input.error) {
            return (
                <FormHelperText id="error">{input.message}</FormHelperText>
            );
        }
        return null;
    };

    return (
        <div className={classes.root}>
            <form onSubmit={handleSignIn} className="needs-validation" noValidate>
                <FormControl className={classes.formControl} error={name.error}>
                    <Input type="text" id="name" name="name" placeholder="Enter your name" value={name.value} onChange={handleChange} classes={{ input: classes.input }} required />
                    <FormHelper input={name}/>
                </FormControl>
                <FormControl className={classes.formControl} error={username.error}>
                    <Input type="text" id="username" name="username" placeholder="Enter your username" value={username.value} onChange={handleChange} classes={{ input: classes.input }} required />
                    <FormHelper input={username}/>
                </FormControl>
                <FormControl className={classes.formControl} error={email.error}>
                    <Input type="email" id="email" name="email" placeholder="Enter your email" value={email.value} onChange={handleChange} classes={{ input: classes.input }} required />
                    <FormHelper input={email}/>
                </FormControl>
                <FormControl className={classes.formControl} error={password.error}>
                    <Input type="password" id="password" name="password" placeholder="Password" value={password.value} onChange={handleChange} classes={{ input: classes.input }} required />
                    <FormHelper input={password} />
                </FormControl>
                <FormControl className={classes.formControl} error={confirmPassword.error}>
                    <Input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword.value} onChange={handleChange} classes={{ input: classes.input }} required />
                    <FormHelper input={confirmPassword} />
                </FormControl>
                <div>
                    <Button type="submit" color="primary" className={classes.button} href={''}
                        disabled={name.error || username.error || email.error || password.error || confirmPassword.error || disabled}>
                        Sign Up
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
