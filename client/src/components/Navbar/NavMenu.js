import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link, withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '0 1rem'
    },
    cornerIcon: {
        width: '50px',
        height: '50px',
        borderRadius: '50px'
    },
    menu: {
        marginTop: '4rem'
    }
}));

const NavMenu = ({ authenticated, user, handleLogOutClicked, history }) => {
    const [open, setMenu] = React.useState(null);
    const classes = useStyles();

    function handleClick (event) {
        setMenu(event.currentTarget);
    }

    function handleClose () {
        setMenu(null);
    }

    const onProfileClick = () => {
        history.push('/profile/' + user.username);
    };

    if (authenticated) {
        return (
            <div className={classes.root}>
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
                    <MenuItem onClick = {() => onProfileClick()}>
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
            </div>
        );
    } else {
        return (
            <div>
                <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
                    <Button
                        style={{
                            border: 'none',
                            padding: '0',
                            borderRadius: '7.5px'
                        }}>
                        Log In
                    </Button>
                </Link>
            </div>
        );
    }
};

export default withRouter(NavMenu);
