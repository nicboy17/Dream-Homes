import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchBoardPosts } from '../actions/boardActions';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import './stylesheet/Board.css';

class PostInBoards extends Component {
    componentDidMount = () => {
        const { fetchBoardPosts, match } = this.props;
        fetchBoardPosts(match.params.id);
    };

    renderPosts = () => {
        const {
            boardStore: { board },
            history
        } = this.props;
        const posts = board.posts.map(post => {
            return (
                <Tooltip
                    title={
                        <div>
                            <h1>{post.title}</h1>
                            <p>{post.description}</p>
                        </div>
                    }
                    key={post._id}
                >
                    <img
                        src={post.image}
                        alt=""
                        className="postImg"
                        onClick={() => history.push(`/posts/${post._id}`)}
                    />
                </Tooltip>
            );
        });
        return board.posts.length === 0 ? (
            <h2
                style={{
                    textAlign: 'center'
                }}
            >
                You have no posts in this board :(
            </h2>
        ) : (
            <Masonry elementType={'div'} options={{ fitWidth: true, gutter: 15 }}>
                {posts}
            </Masonry>
        );
    };

    render () {
        const {
            boardStore: { loading, board }
        } = this.props;
        if (loading || _.isEmpty(board)) {
            return <CircularProgress className="spinner" />;
        }
        console.log(this.props.boardStore);
        return (
            <div>
                <h1 className="boardTitle">{board.title}</h1>
                <div className="grid">{this.renderPosts()}</div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    boardStore: state.BoardStore
});

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        { fetchBoardPosts }
    )
)(PostInBoards);
