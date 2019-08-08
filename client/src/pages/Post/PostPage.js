import React from 'react';
import { withStyles } from '@material-ui/styles';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import Post from './Post';
import MorePosts from './MorePosts';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    post: {
        marginBottom: theme.spacing(4),
    },
    more: {
        marginTop: theme.spacing(4),
    }
});

class PostPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            board: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value});
    }

    save(e) {
        e.preventDefault();
        console.log(this.state.board);
    }

    render() {
        const { classes } = this.props;

        if(!this.props.post(this.props.match.params.id)) {
            return (
                <div>
                    <h1>No Post found</h1>
                </div>
            );
        }

        return(
            <div>
                <Navbar/>
                <div className={classes.post}>
                    <Post handleSave={this.save}
                        handleSelectBoard={this.handleChange}
                        value={this.state.board}
                        post={this.props.post(this.props.match.params.id)}
                        boards={this.props.userStore.boards}/>
                </div>
                <Divider component={'hr'}/>
                <div className={classes.more}>
                    <MorePosts posts={this.props.morePosts} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userStore: state.UserStore,
    post: (id) => {
        return state.PostStore.posts.find((post) => {return id === post._id;});
    },
    morePosts: state.PostStore.morePosts
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {

        },
        dispatch
    );
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(PostPage);