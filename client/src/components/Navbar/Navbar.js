/* eslint-disable space-before-function-paren */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { makeStyles } from '@material-ui/styles';
import { Link, withRouter } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import face from '../../assets/face.jpg';
import { logout } from '../../actions/userActions';

const useStyles = makeStyles(theme => ({
    header: {
        display: 'grid',
        gridTemplateColumns: '5fr 3fr 6fr 2.5fr 2.5fr 0fr 3fr',
        minHeight: '6rem',
        justifyItems: 'center',
        alignItems: 'center'
    },
    cornerIcon: {
        width: '50px',
        height: '50px',
        borderRadius: '50px'
    },
    headerSearch: {
        width: '35vw',
        minHeight: '40px',
        borderRadius: '50px',
        border: '1px solid lightgrey',
        paddingLeft: '15px'
    },
    headerBottomBorder: {
        minHeight: '5px',
        backgroundImage: 'linear-gradient(lightgrey, white)'
    },
    headerContainer: {
        position: 'fixed',
        background: 'white',
        zIndex: '10'
    },
    placeholderHeader: {
        minHeight: '14vh',
        height: '14vh'
    },
    menu: {
        marginTop: '4rem'
    }
}));

const Navbar = ({ userStore, logout, history }) => {
    const [open, setMenu] = React.useState(null);

    const style = useStyles();

    function handleClick(event) {
        setMenu(event.currentTarget);
    }

    function handleClose() {
        setMenu(null);
    }

    function handleLogOutClicked() {
        logout();
        history.push('/');
        window.location.reload();
    }

    function loggedInMenu() {
        if (userStore.authenticated) {
            return (
            <>
                <div onClick={handleClick}>
                    <img className={style.cornerIcon} src={face} alt='' />
                </div>
                <Menu
                    id='simple-menu'
                    anchorEl={open}
                    keepMounted
                    open={Boolean(open)}
                    onClose={handleClose}
                    className={style.menu}
                >
                    <MenuItem component={Link} to={'/profile/' + userStore.user.username}>
                        Profile
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        to='/'
                        onClick={() => handleLogOutClicked()}
                    >
                        Logout
                    </MenuItem>
                </Menu>
            </>
            );
        } else {
            return (
                <>
                <h5>
                    <Link to='/login'>Log In</Link>
                </h5>
                </>
            );
        }
    }

    return (
        <div>
            <div className={style.headerContainer}>
                <div className={style.header}>
                    <div>
                        <h3>Dream Home</h3>
                    </div>
                    <div />
                    <div>
                        <input className={style.headerSearch} placeholder='Search' />
                    </div>
                    <div>
                        <h5>
                            <Link to='/'>Home</Link>
                        </h5>
                    </div>
                    <div>
                        <h5>Following</h5>
                    </div>
                    <div />
                    {loggedInMenu()}
                </div>
                <div className={style.headerBottomBorder} />
            </div>
            <div className={style.placeholderHeader}>placeholder</div>
        </div>
    );
};

const mapStateToProps = state => ({
    userStore: state.UserStore
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            logout
        },
        dispatch
    );
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Navbar);
