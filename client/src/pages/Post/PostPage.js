import React from 'react';
import { withStyles } from '@material-ui/styles';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Post from './Post';
import MorePosts from './MorePosts';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getBoardsandPosts } from '../../actions/profile';
import { searchPosts, morePosts } from '../../actions/post';
import { addBoardPost } from '../../actions/board';

const styles = theme => ({
    post: {
        marginBottom: theme.spacing(4)
    },
    more: {
        marginTop: theme.spacing(4)
    },
    loading: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        right: '0',
        left: '0',
        margin: 'auto'
    }
});

class PostPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            board: '',
            disabled: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount () {
        this.props.morePosts(this.props.match.params.id);
        if (!this.props.post(this.props.match.params.id)) {
            this.props.searchPosts('', '');
        }
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        const { match } = this.props;
        if (match.params.id !== prevProps.match.params.id) {
            this.props.morePosts(this.props.match.params.id);
        }
    }

    handleChange (e) {
        const value = e.target.value;
        this.setState({ board: value,
            disabled: Boolean(value === '')
        });
    }

    save (e) {
        e.preventDefault();
        this.props.addBoardPost(this.state.board, this.props.match.params.id);
    }

    render () {
        const {
            classes,
            userStore: { authenticated, user },
            post,
            postStore: { morePosts },
            match
        } = this.props;

        if (!post(match.params.id)) {
            return (
                <div>
                    <CircularProgress className={classes.loading}/>
                </div>
            );
        }

        if (!post(match.params.id)) {
            return (
                <div>
                    <h1>No Post found</h1>
                </div>
            );
        }

        return (
            <div>
                <div className={classes.post}>
                    <Post
                        user={user}
                        id={match.params.id}
                        handleSave={this.save}
                        handleSelectBoard={this.handleChange}
                        value={this.state.board}
                        disabled={this.state.disabled}
                        post={post(this.props.match.params.id)}
                        boards={authenticated ? user.boards : []}
                        authenticated={authenticated}/>
                </div>
                <Divider variant={'middle'}/>
                <div className={classes.more}>
                    <MorePosts posts={morePosts} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userStore: state.UserStore,
    post: id => {
        if (state.PostStore.posts.length || state.UserStore.authenticated) {
            return state.PostStore.posts.find(post => id === post._id);
        }
    },
    postStore: state.PostStore
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            getBoardsandPosts,
            addBoardPost,
            searchPosts,
            morePosts
        },
        dispatch
    );
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(PostPage);
