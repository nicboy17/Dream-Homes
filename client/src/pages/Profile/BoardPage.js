import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { getBoardPosts, removePost } from '../../actions/board';
import { withRouter } from 'react-router-dom';

import '../stylesheet/Board.css';
import Posts from '../../components/Posts/Posts';

class BoardPage extends Component {
    componentDidMount = () => {
        const { getBoardPosts, match } = this.props;
        getBoardPosts(match.params.id);
    };

    render () {
        const { match, history, removeVisible, removePost } = this.props;
        const board = this.props.board(match.params.id);
        if (!board) {
            return <CircularProgress className="spinner" />;
        }
        return (
            <div>
                <div className="boardHeader">
                    <h1 className="boardTitle">{board.title}</h1>
                    <IconButton aria-label="close" className="boardClose" onClick={() => history.goBack()} href={''}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Posts posts={board.posts} deleteHandle={removeVisible ? (post) => removePost(this.props.match.params.id, post) : false} board={board._id}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    removeVisible: state.UserStore.authenticated && state.ProfileStore.user._id === state.UserStore.user._id,
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
            getBoardPosts,
            removePost
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
)(BoardPage);
