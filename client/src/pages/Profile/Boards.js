import React from 'react';
import { Link } from 'react-router-dom';
import { Card, makeStyles, Typography } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import BoardPreview from '../../components/Posts/BoardPreview';
import MoreMenu from '../../components/Menu/Menu';

const useStyles = makeStyles(theme => ({
    card: {
        height: '33vh',
        width: '24vw',
        display: 'inline-block',
        margin: '0.75rem'
    },
    cardImg: {
        height: '32vh'
    },
    summary: {
        display: 'inline-block',
        paddingLeft: '1rem',
        margin: 0
    },
    cardHeader: {
        display: 'block',
        fontWeight: 'light'
    },
    posts: {
        display: 'block',
        color: 'gray',
        fontSize: 14
    },
    action: {
        height: '5rem',
        padding: '0.4rem'
    },
    boardPreview: {
        display: 'absolute',
        height: '25vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#F5F5F5'
    },
    deleteIconContainer: {
        display: 'inline-block',
        float: 'right',
        margin: 'auto 0'
    }
}));

const Boards = ({ boards, deleteHandle, menuVisible }) => {
    const classes = useStyles();

    const boardMenu = (board) => {
        if (!menuVisible) {
            return null;
        }

        return <MoreMenu icon={'hort'} remove={() => deleteHandle(board)} edit={() => deleteHandle(board)} menuStyle={classes.deleteIconContainer}/>;
    };

    return !boards.length ? (
        <h2>There are no boards</h2>
    ) : (
        boards.map((board, i) => {
            return (
                <Card key={i} className={classes.card} raised={true}>
                    <CardActionArea>
                        <Link to={{ pathname: `/board/${board._id}`, state: { board } }} className="boardLink">
                            <BoardPreview posts={board.posts} className={classes.boardPreview}/>
                        </Link>
                    </CardActionArea>
                    <div className={classes.action}>
                        <div className={classes.summary}>
                            <Typography variant="h6" className={classes.cardHeader}>{board.title}</Typography>
                            <Typography variant="body1" className={classes.posts}>{board.posts.length} posts</Typography>
                        </div>
                        {boardMenu(board._id)}
                    </div>
                </Card>
            );
        })
    );
};

export default Boards;
