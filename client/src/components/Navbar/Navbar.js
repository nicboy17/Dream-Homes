import React from 'react';
import { makeStyles } from '@material-ui/styles';
import face from '../../pages/face.jpg';

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
    }
}));

const Profile = () => {
    const style = useStyles();
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
                        <h5>Home</h5>
                    </div>
                    <div>
                        <h5>Following</h5>
                    </div>
                    <div />
                    <img className={style.cornerIcon} src={face} alt='' />
                </div>
                <div className={style.headerBottomBorder} />
            </div>
            <div className={style.placeholderHeader}>placeholder</div>
        </div>
    );
};

export default Profile;
