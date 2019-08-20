import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    cornerIcon: {
        width: '50px',
        height: '50px',
        borderRadius: '50px'
    },
    menu: {
        marginTop: '4rem'
    }
}));

const NavMenu = ({ authenticated, user, handleLogOutClicked }) => {
    const [open, setMenu] = React.useState(null);
    const classes = useStyles();

    function handleClick (event) {
        setMenu(event.currentTarget);
    }

    function handleClose () {
        setMenu(null);
    }

    if (authenticated) {
        return (
            <>
                <Avatar
                    className={classes.cornerIcon}
                    src={user.profile}
                    onClick={handleClick}
                />
                <Menu
                    id='simple-menu'
                    anchorEl={open}
                    keepMounted
                    open={Boolean(open)}
                    onClose={handleClose}
                    className={classes.menu}
                >
                    <MenuItem component={Link} to={'/profile/' + user.username}>
                        Profile
                    </MenuItem>
                    <MenuItem component={Link} to={'/profile/' + user.username + '/interest-quiz'}>
                        Interest Quiz
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        to='/'
                        onClick={handleLogOutClicked}
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
};

export default NavMenu;
