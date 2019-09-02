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
        width: '26vw',
        display: 'inline-block',
        margin: '0.75rem'
    },
    cardImg: {
        height: '32vh'
    },
    cardHeader: {
        paddingLeft: 10
    },
    boardPreview: {
        display: 'absolute',
        height: '25vh',
        width: '100%',
        overflow: 'hidden'
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

    return boards.length === 0 ? (
        <h2>There are no boards</h2>
    ) : (
        boards.map((board, i) => {
            return (
                <Card key={i} className={classes.card}>
                    <CardActionArea>
                        <Link to={{ pathname: `/board/${board._id}`, state: { board } }} className="boardLink">
                            <BoardPreview posts={board.posts} className={classes.boardPreview}/>
                        </Link>
                    </CardActionArea>
                    <CardActions disableSpacing>
                        <div>
                            <Typography variant="h6" className={classes.cardHeader}>{board.title}</Typography>
                            <Typography variant="body1" className={classes.cardHeader}>{board.posts.length} posts</Typography>
                        </div>
                        {deleteBoard(board._id)}
                    </CardActions>
                </Card>
            );
        })
    );
};

export default Boards;
