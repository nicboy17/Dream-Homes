import React from 'react';
import { withStyles } from '@material-ui/styles';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Post from './Post';
import MorePosts from './MorePosts';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { respond } from '../../actions/user';
import SnackBar from '../../components/SnackBar/SnackBar';
import { getBoardsandPosts } from '../../actions/profile';
import { searchPosts } from '../../actions/post';
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
            id: '',
            board: '',
            disabled: true,
            snackBar: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.snackBarClose = this.snackBarClose.bind(this);
    }

    componentDidMount () {
        const id = this.props.match.params.id;
        this.setState({ id });
        if (!this.props.post(id)) {
            this.props.searchPosts('', '');
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
        this.props.addBoardPost(this.state.board, this.state.id);
        this.setState({ snackBar: true });
    }

    snackBarClose (event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ snackBar: false });
        this.props.dispatch(respond());
    }

    ServerResponse = () => {
        if (this.props.userStore.success) {
            return (
                <SnackBar message={'Post Added to Board'} variant={'success'} open={this.state.snackBar}
                    onClose={this.snackBarClose} duration={1250}/>
            );
        } else if (this.props.userStore.error) {
            return (
                <SnackBar message={'Post Addition failed'} variant={'error'}
                    open={this.state.snackBar} onClose={this.snackBarClose} duration={2000}/>
            );
        }

        return null;
    };

    render () {
        const {
            classes,
            userStore: { authenticated, user },
            post,
            morePosts,
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
                <this.ServerResponse />
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
    morePosts: state.PostStore.morePosts
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            getBoardsandPosts,
            addBoardPost,
            searchPosts,
            dispatch
        },
        dispatch
    );
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(PostPage);
