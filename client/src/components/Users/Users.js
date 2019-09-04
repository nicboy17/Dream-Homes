import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        width: 300,
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        padding: '1rem'
    },
    avatar: {
        display: 'inline-block',
        height: 50,
        width: 50
    },
    user: {
        display: 'block',
        width: '100%'
    },
    name: {
        float: 'right',
        width: '100%',
        fontSize: 18,
        textAlign: 'center',
        verticalAlign: 'center',
        textDecoration: 'none',
        color: 'black'
    }
}));

const Users = ({ users }) => {
    const classes = useStyles();

    const User = user => {
        return (
            <ListItem alignItems="flex-start" key={user._id} component={Link} to={`/profile/${user.username}`} className={classes.item}>
                <ListItemAvatar>
                    <Avatar src={user.profile} className={classes.avatar}/>
                </ListItemAvatar>
                <div className={classes.user}>
                    <p className={classes.name}>
                        {`${user.name} - (${user.username})`}
                    </p>
                </div>
            </ListItem>
        );
    };

    if (!users) {
        return null;
    } else if (!users.length) {
        return <h2>No users</h2>;
    }

    return (
        <List className={classes.root}>
            {users.map(user => User(user))}
        </List>
    );
};

export default Users;
