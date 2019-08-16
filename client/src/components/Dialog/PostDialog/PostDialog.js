import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Chip } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
// import CircularProgress from '@material-ui/core/CircularProgress';

import _ from 'lodash';

import FormContent from './FormContent';
import FileUploader from './FileUploader';
import { bindActionCreators } from 'redux';
import { getBoardsandPosts, addPost } from '../../../actions/profileActions';
// import BoardList from './BoardList';

class PostDialog extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            link: '',
            tag: '',
            tags: [],
            tagError: '',
            titleError: '',
            board: '',
            image: '',
            files: []
        };
    }

    componentDidMount = async () => {
        const username = this.props.match.params.username;
        if (!this.props.userStore.boards) {
            getBoardsandPosts(username);
        }
        this.setState({ username });
    };

    onChangeText = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    // Board
    handleSelectChange = e => {
        this.setState({ selectedBoard: e.target.value });
        console.log(this.state.selectedBoard);
    };

    // Create a tag
    onSubmitPress = e => {
        if (e.which === 13) {
            if (_.includes(_.lowerCase(this.state.tags), _.lowerCase(this.state.tag))) {
                this.setState({ tagError: 'Can not have duplicate tags' });
            } else {
                this.setState({
                    tags: [...this.state.tags, this.state.tag.trim()],
                    tag: '',
                    tagError: ''
                });
            }
        }
    };

    renderTags = () => {
        return (
            <>
                {this.state.tags.map((tag, i) => {
                    return <Chip key={i} label={tag} onDelete={() => this.onDeleteTag(tag)} />;
                })}
            </>
        );
    };

    onDeleteTag = tag => {
        this.setState({ tags: _.without(this.state.tags, tag) });
    };

    // File pond , handle image upload
    onUploadImages = fileItems => {
        const filterFiles = fileItems.filter(
            fileItem => fileItem.file.type.toString() === 'image/jpeg'
        );
        this.setState({ image: filterFiles.map(filterFile => filterFile.file)[0] });
    };

    // Create post
    onCreatePress = async () => {
        if (this.state.title.length < 3) {
            this.setState({ titleError: 'Title must be greater than 3 characters' });
        } else {
            this.props.addPost(this.state, this.state.username);
            this.onCloseClick();
        }
    };

    onCloseClick = () => {
        this.props.history.push(`/profile/${this.state.username}`);
    };

    render () {
        // Redirect user to profile if not authorized
        const { userStore, match: { params } } = this.props;
        if (userStore.authenticated) {
            if (userStore.user.username !== params.username) {
                const redirect = `/profile/${params.username}`;
                return <Redirect to ={redirect}/>;
            }
        }

        return (
            <Dialog
                open={true}
                onClose={this.handleClose}
                aria-labelledby='form-dialog-title'
                onClick={() => this.onCloseClick()}

            >
                <div onClick={e => e.stopPropagation()}>
                    <DialogTitle style={{ textAlign: 'center' }} id='form-dialog-title'>
                            Create a post
                    </DialogTitle>
                    <DialogContent>
                        <FormContent
                            onChangeText={this.onChangeText}
                            titleError={this.state.titleError}
                            tagError={this.state.tagError}
                            onSubmitPress={this.onSubmitPress}
                            tag={this.state.tag}
                            title={this.state.title}
                            description={this.state.description}
                            link={this.state.link}
                        />
                        {this.renderTags()}
                    </DialogContent>
                    <DialogContent>
                        <FileUploader
                            onUploadImages={this.onUploadImages}
                            files={this.state.files}
                        />
                    </DialogContent>
                    <DialogContent />
                    <DialogActions>
                        <Button onClick={this.onCreatePress} color='primary'>
                                Create
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        );
    }
}

const mapStateToProps = state => ({
    userStore: state.UserStore
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            getBoardsandPosts,
            addPost
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDialog);
