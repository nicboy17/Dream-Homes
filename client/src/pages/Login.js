import React, { useState } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { styles } from './auth-styles';
import { Paper, TextField, withStyles } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../actions/userActions';

// eslint-disable-next-line react/prop-types
const Login = ({ classes, userStore, login }) => {
    let [email, password] = useState('');

    const handleChangePassword = (e) => {
        password = e.target.value;
    };

    const handleChangeEmail = (e) => {
        email = e.target.value;
    };

    const postInfo = () => {
        login({ email, password });
    };

    if (userStore.authenticated) {
        return (<Redirect to={'/profile/' + userStore.user.username} />);
    }

    return (
        <div>
            <div className={classes.container}>
                <div className={classes.grid}>
                    <Paper className={classes.card} />
                    <Paper className={classes.card} />
                    <Paper className={classes.card} />
                    <Paper className={classes.card} />
                    <Paper className={classes.card} />
                    <Paper className={classes.card} />
                    <Paper className={classes.card} />
                    <Paper className={classes.card} />
                </div>
            </div>
            <div className={classes.signIn}>
                <div className={classes.modal}>
                    <h1 className={classes.welcome}>Welcome!</h1>
                    <div className={classes.emailContainer}>
                        <TextField label='E-mail' className={classes.inputEmail} onChange={handleChangeEmail}/>
                    </div>
                    <div className={classes.passwordContainer}>
                        <TextField label='Password' type="password" className={classes.inputPassword} onChange={handleChangePassword}/>
                    </div>
                    <p className={classes.forgotPassword}>Forgot your password?</p>
                    <button className={classes.loginButton} onClick={postInfo}>Login</button>
                    <p className={classes.footer}>{'Don\'t have an account?'}<Link to='/signup' className={classes.signUp}>Sign Up!</Link></p>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    userStore: state.UserStore
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            login
        },
        dispatch
    );
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Login);
