import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Chip } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import _ from 'lodash';
import axios from 'axios';

import FormContent from './FormContent';
import FileUploader from './FileUploader';
import BoardList from './BoardList';

class PostDialog extends React.Component {
    state = {
        title: '',
        description: '',
        destination: '',
        tag: '',
        tags: [],
        tagError: '',
        titleError: '',
        selectedBoard: '',
        files: []
    };

    componentDidMount = async () => {
        try {
            const username = this.props.location.pathname.split('/')[2];
            let res = await axios.get(`/users/${username}`);
            if (res.data.user.boards) {
                return this.setState({ boards: res.data.user.boards });
            }
        } catch (err) {
            console.log('Something went wrong with fetching user API');
        }
    };

    onChangeText = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    //Board
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
        let filterFiles = fileItems.filter(
            fileItem => fileItem.file.type.toString() === 'image/jpeg'
        );
        this.setState({ files: filterFiles.map(filterFile => filterFile.file) });
    };

    // Create post
    onCreatePress = async () => {
        const username = this.props.location.pathname.split('/')[2];
        const { title, tags, files = '', description, destination } = this.state;
        if (this.state.title.length < 3) {
            this.setState({ titleError: 'Title must be greater than 3 characters' });
        } else {
            try {
                const formData = new FormData();
                formData.append('title', title);
                formData.append('tags', tags);
                formData.append('description', description);
                formData.append('link', destination);
                formData.append('image', files[0]);
                await axios({
                    url: `/users/${username}/posts`,
                    method: 'POST',
                    data: formData,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                this.props.history.push(`/profile/${username}`);
            } catch (err) {
                console.log('Something went wrong with creating a post');
            }
        }
    };

    render() {
        if (!Boolean(this.state.boards)) {
            return <CircularProgress color='secondary' />;
        }
        return (
            <>
                <Dialog open={true} onClose={this.handleClose} aria-labelledby='form-dialog-title'>
                    <DialogTitle style={{ textAlign: 'center' }} id='form-dialog-title'>
                        Create a post
                    </DialogTitle>
                    <DialogContent>
                        <BoardList
                            boards={this.state.boards}
                            handleSelect={this.handleSelectChange}
                            value={this.state.selectedBoard}
                        />
                        <FormContent
                            onChangeText={this.onChangeText}
                            titleError={this.state.titleError}
                            tagError={this.state.tagError}
                            onSubmitPress={this.onSubmitPress}
                            tag={this.state.tag}
                            title={this.state.title}
                            description={this.state.description}
                            destination={this.state.destination}
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
                </Dialog>
            </>
        );
    }
}

export default PostDialog;
