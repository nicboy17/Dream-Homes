import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheet/Profile.css';
import { Card, Typography } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import BoardPreview from '../../components/Posts/BoardPreview';
import DeleteButton from '../../components/Buttons/DeleteButton';

const Boards = ({ boards }) => {
    return boards.length === 0 ? (
        <h2>There are no boards</h2>
    ) : (
        boards.map((board, i) => {
            return (
                <Card key={i} className="card">
                    <Link
                        to={{ pathname: `/board/${board._id}`, state: { board } }}
                        className="boardLink"
                    >
                        <CardActionArea>
                            <BoardPreview posts={board.posts} className='boardPreview'/>
                        </CardActionArea>
                    </Link>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr'
                        }}
                    >
                        <div>
                            <Typography variant="h6" className="cardHeader">
                                {board.title}
                            </Typography>
                            <Typography variant="body1" className="cardHeader">
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
