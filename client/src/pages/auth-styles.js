
export const styles = theme => ({
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
    passwordContainer: {
        height: '13vh',
        minWidth: '22vw'
    },
    inputEmail: {
        width: '22vw',
        '& label': {
            fontWeight: 'bold',
            color: 'black'
        }
    },
    inputPassword: {
        width: '22vw',
        '& label': {
            fontWeight: 'bold',
            color: 'black'
        }
    },
    forgotPassword: {
        margin: '0',
        textDecoration: 'underline',
        fontSize: '13px',
        color: 'grey',
        '&:hover': {
            color: 'blue',
            cursor: 'pointer'
        }
    },
    loginButton: {
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
    signUp: {
        textDecoration: 'none',
        color: 'black',
        fontWeight: 'bold',
        '&:hover': {
            color: 'blue',
            cursor: 'pointer'
        }
    }
});
