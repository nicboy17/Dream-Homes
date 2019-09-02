import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
        paddingBottom: 0,
        margin: '0 auto'
    },
    avatar: {
        display: 'inline-block',
        height: 50,
        width: 50
    },
    user: {
        display: 'inline-block',
        width: '75%'
    },
    name: {
        float: 'right',
        width: '100%',
        fontSize: 18,
        textAlign: 'center',
        verticalAlign: 'center'
    }
}));

const Users = ({ users, history }) => {
    const classes = useStyles();

    const User = user => {
        return (
            <Card className={classes.card} key={user._id} onClick={() => history.push(`/profile/${user.username}`)}>
                <CardActionArea>
                    <CardContent>
                        <Avatar src={user.profile} className={classes.avatar}/>
                        <div className={classes.user}>
                            <p className={classes.name}>{user.name} - ({user.username})</p>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    };

    if (!users) {
        return null;
    } else if (!users.length) {
        return <h2>There are no users</h2>;
    }

    return users.map(user => User(user));
};

export default Users;
