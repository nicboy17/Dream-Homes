import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ProfileTabs from './ProfileTabs';

import ProfileHeader from './ProfileHeader';


const ProfileStyle = theme => ({
    root: {
        margin: theme.spacing(2)
    },
    body: {
        margin: theme.spacing(5)
    },
    tabs: {
    }
});

class Profile extends Component{
    render(){
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <ProfileHeader/>
                <Divider variant={'middle'}/>
                <div className={classes.body}>
                    <ProfileTabs />
                </div>
            </div>
        );
    }
}

export default withStyles(ProfileStyle)(Profile);
