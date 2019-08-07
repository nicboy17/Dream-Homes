import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper, TextField } from '@material-ui/core';
import { Link} from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
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
        height: '80vh',
        borderRadius: '15px',
        textAlign: 'center'
    },
    welcome: {
        paddingTop: '20px'
    },
    emailContainer: {
        height: '13vh',
        minWidth: '22vw'
    },
    passContainer: {
        height: '13vh',
        minWidth: '22vw'
    },
    inputemail: {
        width: '22vw',
        '& label': {
            fontWeight: 'bold',
            color: 'black'
        }
    },
    inputpass: {
        width: '22vw',
        '& label': {
            fontWeight: 'bold',
            color: 'black'
        }
    },
    forgotpass: {
        margin: '0',
        textDecoration: 'underline',
        fontSize: '13px',
        color: 'grey',
        '&:hover': {
            color: 'blue',
            cursor: 'pointer'
        }
    },
    loginbutton: {
        border: '1px solid lightgrey',
        backgroundColor: 'white',
        padding: '10px 50px 10px 50px',
        marginTop: '30px',
        borderRadius: '50px',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'lightblue',
            color: 'white',
            cursor: 'pointer'
        }
    },
    footer: {
        borderTop: '1px solid lightgrey',
        paddingTop: '20px',
        marginTop: '58px',
        fontSize: '14px'
    },
    signup: {
        textDecoration: 'none',
        color: 'black',
        fontWeight: 'bold',
        '&:hover': {
            color: 'blue',
            cursor: 'pointer'
        }
    }
}));

const LogIn = ({history}) => {
    const style = useStyles();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const onChangeText = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const postInfo = async () => {
        try {
            const body = {
                username,
                password
            };
            const config = {
                'Content-Type': 'application.json'
            };
            let res = await axios.post('/users/login', body, config);
            if (res.data.success === true) {
                history.push(`/profile/${username}`);
            }
        } catch (err) {
            console.log('Something went wrong with logging in');
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
                    <div className={style.emailContainer}>
                        <TextField
                            label='Username'
                            name='username'
                            className={style.inputemail}
                            onChange={e => onChangeText(e)}
                        />
                    </div>
                    <div className={style.passContainer}>
                        <TextField
                            label='Password'
                            type='password'
                            name='password'
                            className={style.inputpass}
                            onChange={e => onChangeText(e)}
                        />
                    </div>
                    <p className={style.forgotpass}>Forgot your password?</p>
                    <button className={style.loginbutton} onClick={postInfo}>
                        Login
                    </button>
                    <p className={style.footer}>
                        Don't have an account?{' '}
                        <Link to='/signup' className={style.signup}>
                            Sign Up!
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
