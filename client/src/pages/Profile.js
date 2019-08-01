import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import face from './face.jpg';
import {Card, Typography} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import house from './house.png'

const useStyles = makeStyles(theme => ({
    header: {
        display: 'grid',
        gridTemplateColumns: '5fr 3fr 6fr 2.5fr 2.5fr 0fr 3fr',
        minHeight: '20vh',
        justifyItems: 'center',
        alignItems: 'center',
    },
    cornerIcon: {
        width: '50px',
        height: '50px',
        borderRadius: '50px',
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
        zIndex: '10',
    },
    placeholderHeader: {
        minHeight: '20vh',
        height: '20vh',
    },
    subHeader: {
        minHeight: '30vh',
        display: 'grid',
        gridTemplateColumns: '5fr 2fr 5fr',
        alignItems: 'center',
        justifyItems: 'center',
        borderBottom: '1px solid lightgrey',
    },
    subHeaderIcon: {
        width: '100px',
        height: '100px',
        borderRadius: '50px',
    },
    nameContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        justifyItems: 'center',
        alignItems: 'center',
    },
    profileName: {
        margin: '0',
        padding:'0',
    },
    profileFollowers: {
        margin: '0',
        padding:'0',
        paddingTop: '5px',
    },
    createBoard: {
        background: 'white',
        border: '1px solid lightgrey',
        borderRadius: '25px',
        padding: '10px 20px 10px 20px',
        fontWeight: 'bold',
        marginRight: '10px',
    },
    createPost: {
        background: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        padding: '10px 20px 10px 20px',
        fontWeight: 'bold',
    },
    tabSection: {
        minHeight: '25vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1.9fr',
        alignItems: 'center',
        justifyItems: 'center',
    },
    tab: {
        background: 'white',
        border: '1px solid lightgrey',
        borderRadius: '25px',
        padding: '10px 20px 10px 20px',
        fontWeight: 'bold',
        marginRight: '10px',
    },
    activeTab: {
        background: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        padding: '10px 20px 10px 20px',
        fontWeight: 'bold',
        marginRight: '10px',
    },
    activePanel: {
        display: 'grid',
        justifyItems: 'center',
        marginBottom: ' 50px',
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        justifyItems: 'center',
        gridGap: '20px',
    },
    card: {
        height: '40vh',
        width: '26vw',
    },
    cardImg: {
        height: '31vh',
    },
    cardHeader: {
        marginLeft: '20px',
    },
}))

const Profile = () => {
    const style =  useStyles()
    let [activePanel, toggle] = useState('board')
    return (
        <div>
            <div className={style.headerContainer}>
                <div className={style.header}>
                    <div>
                        <h3>Dream Home</h3>
                    </div>
                    <div>
                    </div>
                    <div>
                        <input className={style.headerSearch} placeholder="Search"></input>
                    </div>
                    <div>
                        <h5>Home</h5>
                    </div>
                    <div>
                        <h5>Following</h5>
                    </div>
                    <div>
                    </div>
                    <img className={style.cornerIcon} src={face} alt='' />
                </div>
                <div className={style.headerBottomBorder}>
                </div>
            </div>
            <div className={style.placeholderHeader}>
                placeholder
            </div>
            <div className={style.subHeader}>
                <div className={style.nameContainer}>
                    <img src={face} alt='' className={style.subHeaderIcon}/>
                    <div>
                        <h3 className={style.profileName}>Delores Jones</h3>
                        <h5 className={style.profileFollowers}>134 Followers | 280 Following</h5>
                    </div>
                </div>
                <div>
                </div>
                <div>
                    <button className={style.createBoard}>Create Board</button>
                    <button className={style.createPost}>Create Post</button>
                </div>
            </div>
            <div style={{display: activePanel === 'board' ? 'grid' : 'none'}}>
                <div className={style.tabSection}>
                    <div>
                        <button className={style.activeTab} onClick={() => toggle(activePanel = 'board')}>Boards</button>
                        <button className={style.tab} onClick={() => toggle(activePanel = 'post')}>My Posts</button>
                    </div>
                    <div>
                    </div>
                </div>
                <div className={style.activePanel}>
                    <div className={style.gridContainer}>
                    <Card className={style.card}>
                        <CardActionArea className={style.card}>
                            <CardMedia className={style.cardImg} image={house}/>
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
                            <CardMedia className={style.cardImg} image={house}/>
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
                            <CardMedia className={style.cardImg} image={house}/>
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
                            <CardMedia className={style.cardImg} image={house}/>
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
            <div style={{display: activePanel === 'post' ? 'grid' : 'none'}}>
                <div className={style.tabSection}>
                    <div>
                        <button className={style.tab} onClick={() => toggle(activePanel = 'board')}>Boards</button>
                        <button className={style.activeTab} onClick={() => toggle(activePanel = 'post')}>My Posts</button>
                    </div>
                    <div>
                    </div>
                </div>
                <div className={style.activePanel}>
                    <div className={style.gridContainer}>
                        <Card className={style.card}>
                            <CardActionArea className={style.card}>
                                <CardMedia className={style.cardImg} image={house}/>
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
    )
}

export default Profile;