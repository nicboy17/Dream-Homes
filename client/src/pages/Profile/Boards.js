import React from 'react';
import { Link } from 'react-router-dom';
import { Card, makeStyles, Typography } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import BoardPreview from '../../components/Posts/BoardPreview';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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
        display: 'block',
        width: '50%',
        paddingLeft: '1rem'
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
    boardPreview: {
        display: 'absolute',
        height: '25vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#F5F5F5'
    },
    deleteIconContainer: {
        marginLeft: 'auto',
        marginRight: 10,
        backgroundColor: 'grey'
    },
    deleteIcon: {
        color: 'white'
    }
}));

const Boards = ({ boards, deleteHandle = false }) => {
    const classes = useStyles();

    const deleteBoard = (board) => {
        if (!deleteHandle) {
            return null;
        }

        return (
            <IconButton size="medium" onClick={() => deleteHandle(board)} className={classes.deleteIconContainer}>
                <DeleteIcon className={classes.deleteIcon} />
            </IconButton>
        );
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
                    <CardActions disableSpacing>
                        <div className={classes.summary}>
                            <Typography variant="h6" className={classes.cardHeader}>{board.title}</Typography>
                            <Typography variant="body1" className={classes.posts}>{board.posts.length} posts</Typography>
                        </div>
                        {deleteBoard(board._id)}
                    </CardActions>
                </Card>
            );
        })
    );
};

export default Boards;
