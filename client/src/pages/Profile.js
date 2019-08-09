import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import face from '../assets/face.jpg';
import { Card, Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import house from '../assets/house.png';
import { Link, Route } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import InterestQuizDialog from '../components/Dialog/InterestQuizDialog/QuizDialog';
import PostDialog from '../components/Dialog/PostDialog/PostDialog';
import BoardDialog from '../components/Dialog/BoardDialog/BoardDialog';

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
    gridContainer1: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        justifyItems: 'center',
        gridGap: '20px'
    },
    card: {
        paddingBottom: '1vh',
        height: '40vh',
        width: '26vw'
    },
    cardImg: {
        height: '32vh'
    },
    cardHeader: {
        marginLeft: '20px'
    },
    postContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
        justifyItems: 'center',
        gridGap: '10px'
    },
    postContainer1: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        justifyItems: 'center',
        gridGap: '10px'
    },
    postImg: {
        width: '16vw',
        minHeight: '50vh'
    },
    postLink: {
        fontSize: '16px',
        textAlign: 'center',
        padding: '0',
        margin: '0'
    }
}));

// eslint-disable-next-line react/prop-types
const Profile = ({ location }) => {
    const style = useStyles();
    const username = location.pathname.split('/')[2];

    let [activePanel, toggle] = useState('board');
    let [boards, setBoards] = useState([

    ]);
    let [posts, setPosts] = useState([

    ]);

    useEffect(() => {
        fetch(`users/${username}`)
            .then(response => response.json())
            .then(data => setBoards((boards = data['user']['boards'])))
            .then(data => setPosts((posts = data['user']['posts'])));
    });

    return (
        <div>
            <Navbar />
            <Route path='/profile/:username/interest-quiz' component={InterestQuizDialog} />
            <Route path='/profile/:username/post/create' component={PostDialog} />
            <Route path='/profile/:username/board/create' component={BoardDialog} />
            <div className={style.subHeader}>
                <div className={style.nameContainer}>
                    <img src={face} alt='' className={style.subHeaderIcon} />
                    <div>
                        <h3 className={style.profileName}>{username}</h3>
                        <h5 className={style.profileFollowers}>134 Followers | 280 Following</h5>
                    </div>
                </div>
                <div />
                <div>
                    <Link to={`/profile/${username}/board/create`}>
                        <button className={style.createBoard}>Create Board</button>
                    </Link>
                    <Link to={`/profile/${username}/post/create`}>
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
                    <div className={boards.length === 0 ? style.gridContainer1 : style.gridContainer}>
                        {
                            boards.length === 0
                                ? <h2>You have not added any boards yet.</h2>
                                : boards.map((board, i) => {
                                    return <Card key={board['title']} className={style.card}>
                                        <CardActionArea className={style.card}>
                                            <CardMedia className={style.cardImg} image={house} />
                                            <Typography variant='h6' className={style.cardHeader}>
                                                {board['title']}
                                            </Typography>
                                            <Typography variant='p' className={style.cardHeader}>
                                                {board['posts'].length} posts
                                            </Typography>
                                        </CardActionArea>
                                    </Card>;
                                })
                        }
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
                    <div className={posts.length === 0 ? style.postContainer1 : style.postContainer}>
                        {
                            posts.length === 0
                                ? <h2>You have not added any posts yet.</h2>
                                : posts.map((post, i) => {
                                    return <Card key={post['title']} className={style.post}>
                                        <CardActionArea className={style.post}>
                                            <CardMedia className={style.postImg} image={post['image']}>
                                                <p className={style.postLink}>
                                                    {post['link']}
                                                </p>
                                            </CardMedia>
                                        </CardActionArea>
                                    </Card>;
                                })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
