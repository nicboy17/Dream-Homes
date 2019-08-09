import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles({
    container: {
        display: 'grid',
        justifyItems: 'center',
        zIndex: '0'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: '15px',
        justifyItems: 'center'
    },
    card: {
        height: '55vh',
        width: '18vw',
        background: 'yellow'
    },
    signin: {
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
    modal: {
        backgroundColor: 'white',
        width: '35vw',
        height: '90vh',
        borderRadius: '15px',
        textAlign: 'center'
    },
    inputContainer: {
        height: '13vh',
        minWidth: '22vw',
        padding: '0',
        margin: '0'
    },
    input: {
        width: '22vw',
        marginTop: '10px',
        '& label': {
            fontWeight: 'bold',
            color: 'black'
        }
    },
    welcome: {
        marginBottom: '0'
    },
    signupbutton: {
        border: '1px solid lightgrey',
        backgroundColor: 'white',
        padding: '10px 50px 10px 50px',
        margin: '0 auto',
        marginTop: '20px',
        borderRadius: '50px',
        fontWeight: 'bold',
        display: 'block',
        '&:hover': {
            backgroundColor: 'lightblue',
            color: 'white',
            cursor: 'pointer'
        }
    },
    footer: {
        borderTop: '1px solid lightgrey',
        paddingTop: '20px',
        marginTop: '35px',
        fontSize: '14px'
    },
    login: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            color: 'blue',
            cursor: 'pointer'
        }
    }
});

// eslint-disable-next-line react/prop-types
const SignUp = ({ history }) => {
    const style = useStyles();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        passwordError: ''
    });
    const { email, username, password, password2, passwordError } = formData;

    const onChangeText = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const postInfo = async () => {
        if (password !== password2) {
            setFormData({ ...formData, passwordError: 'Passwords do not match' });
        }

        // TODO: Fix Signup (fix password validation as well)
        if (!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-zd$@!%*?&].{8,}/)) {
            setFormData({
                ...formData,
                passwordError:
                    'Password must contain at least 8 characters and one Lower Case and one Upper Case and 3 Numbers'
            });
        } else {
            try {
                const body = {
                    username,
                    name: username,
                    email,
                    password
                };
                const config = {
                    'Content-Type': 'application/json'
                };
                await axios.post('/users/register', body, config);
                history.push(`/profile/${username}`);
            } catch (err) {
                console.log('Something went wrong with the registration');
            }
        }
    };

    return (
        <div>
            <div className={style.container}>
                <div className={style.grid}>
                    <Paper className={style.card} />
                    <Paper className={style.card} />
                    <Paper className={style.card} />
                    <Paper className={style.card} />
                    <Paper className={style.card} />
                    <Paper className={style.card} />
                    <Paper className={style.card} />
                    <Paper className={style.card} />
                </div>
            </div>
            <div className={style.signin}>
                <div className={style.modal}>
                    <h1 className={style.welcome}>Welcome!</h1>
                    <div className={style.inputContainer}>
                        <TextField
                            label='Username'
                            name='username'
                            className={style.input}
                            value={username}
                            onChange={e => onChangeText(e)}
                        />
                    </div>
                    <div className={style.inputContainer}>
                        <TextField
                            label='E-mail'
                            name='email'
                            className={style.input}
                            value={email}
                            onChange={e => onChangeText(e)}
                        />
                    </div>
                    <div className={style.inputContainer}>
                        <TextField
                            label='Password'
                            name='password'
                            type='password'
                            className={style.input}
                            value={password}
                            onChange={e => onChangeText(e)}
                            error={Boolean(passwordError)}
                            helperText={passwordError}
                        />
                    </div>
                    <div className={style.inputContainer}>
                        <TextField
                            label='Confirm Password'
                            name='password2'
                            type='password'
                            className={style.input}
                            value={password2}
                            onChange={e => onChangeText(e)}
                        />
                    </div>
                    <button className={style.signupbutton} onClick={postInfo}>
                        Sign Up!
                    </button>
                    <p className={style.footer}>
                        Already a Member?{' '}
                        <Link to='/' className={style.login}>
                            Log In!
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
