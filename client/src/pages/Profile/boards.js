import React from 'react';
import { Link } from 'react-router-dom';
import { Card, makeStyles, Typography } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import BoardPreview from '../../components/Posts/BoardPreview';
import DeleteButton from '../../components/Buttons/DeleteButton';

const useStyles = makeStyles(theme => ({
    root: {},
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
        display: 'grid',
        height: '25vh',
        overflow: 'hidden'
    }
}));

const Boards = ({ boards }) => {
    const classes = useStyles();

    return boards.length === 0 ? (
        <h2>There are no boards</h2>
    ) : (
        boards.map((board, i) => {
            return (
                <Card key={i} className={classes.card}>
                    <Link
                        to={{ pathname: `/board/${board._id}`, state: { board } }}
                        className="boardLink"
                    >
                        <CardActionArea>
                            <BoardPreview posts={board.posts} className={classes.boardPreview}/>
                        </CardActionArea>
                    </Link>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr'
                        }}
                    >
                        <div>
                            <Typography variant="h6" className={classes.cardHeader}>
                                {board.title}
                            </Typography>
                            <Typography variant="body1" className={classes.cardHeader}>
                                {board.posts.length} posts
                            </Typography>
                        </div>
                        <div
                            style={{
                                display: 'grid',
                                alignContent: 'center',
                                justifyContent: 'end'
                            }}
                        >
                            <DeleteButton item="boards" id={board._id} title={board.title} />
                        </div>
                    </div>
                </Card>
            );
        })
    );
};

export default Boards;
