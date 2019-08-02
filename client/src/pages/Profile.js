import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import face from './face.jpg';
import { Card, Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import house from './house.png';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
const useStyles = makeStyles(theme => ({
    subHeader: {
        minHeight: '30vh',
        display: 'grid',
        gridTemplateColumns: '5fr 2fr 5fr',
        alignItems: 'center',
        justifyItems: 'center',
        borderBottom: '1px solid lightgrey'
    },
    subHeaderIcon: {
        width: '100px',
        height: '100px',
        borderRadius: '50px'
    },
    nameContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        justifyItems: 'center',
        alignItems: 'center'
    },
    profileName: {
        margin: '0',
        padding: '0'
    },
    profileFollowers: {
        margin: '0',
        padding: '0',
        paddingTop: '5px'
    },
    createBoard: {
        background: 'white',
        border: '1px solid lightgrey',
        borderRadius: '25px',
        padding: '10px 20px 10px 20px',
        fontWeight: 'bold',
        marginRight: '10px'
    },
    createPost: {
        background: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        padding: '10px 20px 10px 20px',
        fontWeight: 'bold'
    },
    tabSection: {
        minHeight: '25vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1.9fr',
        alignItems: 'center',
        justifyItems: 'center'
    },
    tab: {
        background: 'white',
        border: '1px solid lightgrey',
        borderRadius: '25px',
        padding: '10px 20px 10px 20px',
        fontWeight: 'bold',
        marginRight: '10px'
    },
    activeTab: {
        background: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        padding: '10px 20px 10px 20px',
        fontWeight: 'bold',
        marginRight: '10px'
    },
    activePanel: {
        display: 'grid',
        justifyItems: 'center',
        marginBottom: ' 50px'
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        justifyItems: 'center',
        gridGap: '20px'
    },
    card: {
        height: '40vh',
        width: '26vw'
    },
    cardImg: {
        height: '31vh'
    },
    cardHeader: {
        marginLeft: '20px'
    }
}));

const Profile = () => {
    const style = useStyles();
    let [activePanel, toggle] = useState('board');
    return (
        <div>
            <Navbar/>
            <div className={style.subHeader}>
                <div className={style.nameContainer}>
                    <img src={face} alt='' className={style.subHeaderIcon} />
                    <div>
                        <h3 className={style.profileName}>Delores Jones</h3>
                        <h5 className={style.profileFollowers}>134 Followers | 280 Following</h5>
                    </div>
                </div>
                <div />
                <div>
                    <Link to='/profile/:username/board/create'>
                        <button className={style.createBoard}>Create Board</button>
                    </Link>
                    <Link to='/profile/:username/post/create'>
                        <button className={style.createPost}>Create Post</button>
                    </Link>
                </div>
            </div>
            <div style={{ display: activePanel === 'board' ? 'grid' : 'none' }}>
                <div className={style.tabSection}>
                    <div>
                        <button
                            className={style.activeTab}
                            onClick={() => toggle((activePanel = 'board'))}
                        >
                            Boards
                        </button>
                        <button
                            className={style.tab}
                            onClick={() => toggle((activePanel = 'post'))}
                        >
                            My Posts
                        </button>
                    </div>
                    <div />
                </div>
                <div className={style.activePanel}>
                    <div className={style.gridContainer}>
                        <Card className={style.card}>
                            <CardActionArea className={style.card}>
                                <CardMedia className={style.cardImg} image={house} />
                                <Typography variant='h6' className={style.cardHeader}>
                                    House
                                </Typography>
                                <Typography variant='p' className={style.cardHeader}>
                                    80 posts
                                </Typography>
                            </CardActionArea>
                        </Card>
                        <Card className={style.card}>
                            <CardActionArea className={style.card}>
                                <CardMedia className={style.cardImg} image={house} />
                                <Typography variant='h6' className={style.cardHeader}>
                                    House
                                </Typography>
                                <Typography variant='p' className={style.cardHeader}>
                                    80 posts
                                </Typography>
                            </CardActionArea>
                        </Card>
                        <Card className={style.card}>
                            <CardActionArea className={style.card}>
                                <CardMedia className={style.cardImg} image={house} />
                                <Typography variant='h6' className={style.cardHeader}>
                                    House
                                </Typography>
                                <Typography variant='p' className={style.cardHeader}>
                                    80 posts
                                </Typography>
                            </CardActionArea>
                        </Card>
                        <Card className={style.card}>
                            <CardActionArea className={style.card}>
                                <CardMedia className={style.cardImg} image={house} />
                                <Typography variant='h6' className={style.cardHeader}>
                                    House
                                </Typography>
                                <Typography variant='p' className={style.cardHeader}>
                                    80 posts
                                </Typography>
                            </CardActionArea>
                        </Card>
                    </div>
                </div>
            </div>
            <div style={{ display: activePanel === 'post' ? 'grid' : 'none' }}>
                <div className={style.tabSection}>
                    <div>
                        <button
                            className={style.tab}
                            onClick={() => toggle((activePanel = 'board'))}
                        >
                            Boards
                        </button>
                        <button
                            className={style.activeTab}
                            onClick={() => toggle((activePanel = 'post'))}
                        >
                            My Posts
                        </button>
                    </div>
                    <div />
                </div>
                <div className={style.activePanel}>
                    <div className={style.gridContainer}>
                        <Card className={style.card}>
                            <CardActionArea className={style.card}>
                                <CardMedia className={style.cardImg} image={house} />
                                <Typography variant='h6' className={style.cardHeader}>
                                    House
                                </Typography>
                                <Typography variant='p' className={style.cardHeader}>
                                    80 posts
                                </Typography>
                            </CardActionArea>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
