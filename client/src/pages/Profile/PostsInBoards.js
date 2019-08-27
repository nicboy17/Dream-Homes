import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { getBoardPosts } from '../../actions/boardActions';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import '../stylesheet/Board.css';

class PostInBoards extends Component {
    componentDidMount = () => {
        const { getBoardPosts, match } = this.props;
        getBoardPosts(match.params.id);
    };

    renderPosts = () => {
        const { history, match } = this.props;
        const board = this.props.board(match.params.id);
        const posts = _.isEmpty(board.posts)
            ? []
            : board.posts.map(post => {
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
        const { match } = this.props;
        const board = this.props.board(match.params.id);
        if (!board) {
            return <CircularProgress className="spinner" />;
        }
        return (
            <div>
                <h1 className="boardTitle">{board.title}</h1>
                <div className="grid">{this.renderPosts()}</div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    board: (id) => {
        if (state.ProfileStore.boards.length) {
            return state.ProfileStore.boards.find(board => board._id === id);
        }
        return false;
    }
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getBoardPosts
        },
        dispatch
    );
};

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(PostInBoards);
