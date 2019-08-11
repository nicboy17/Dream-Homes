import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import house from '../../assets/house.png';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        justifyItems: 'center',
        gridGap: '20px',
        marginTop: theme.spacing(2)
    },
    card: {
        paddingBottom: '1vh',
        height: '30vh',
        width: '24vw'
    },
    cardImg: {
        height: '24vh'
    },
    cardHeader: {
        marginLeft: '20px'
    }
}));

const Boards = ({ boards }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                !boards || !boards.length
                    ? <h2>You have not added any boards yet.</h2>
                    : boards.map((board, i) => {
                        return <Card key={i} className={classes.card}>
                            <CardActionArea className={classes.card}>
                                <CardMedia className={classes.cardImg} image={house}/>
                                <Typography variant='h6' className={classes.cardHeader}>
                                    {board.title}
                                </Typography>
                                <Typography variant='body1' className={classes.cardHeader}>
                                    {board.posts.length} posts
                                </Typography>
                            </CardActionArea>
                        </Card>;
                    })
            }
        </div>
    );
};

export default Boards;
