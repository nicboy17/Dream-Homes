import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Chip } from '@material-ui/core';

import _ from 'lodash';

import FormContent from './FormContent';
import FileUploader from './FileUploader';

class PostDialog extends React.Component {
    state = {
        title: '',
        description: '',
        destination: '',
        tag: '',
        tags: [],
        tagError: '',
        titleError: ''
    };

    onChangeText = e => {
        this.setState({ [e.target.id]: e.target.value });
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
        this.setState({
            files: fileItems.filter(fileItem => {
                if (fileItem.file.type.toString() === 'image/jpeg') {
                    return fileItem.file;
                }
                return false;
            })
        });
        console.log(this.state.files);
    };

    // Create post
    onCreatePress = () => {
        if (this.state.title.length < 3) {
            this.setState({ titleError: 'Title must be greater than 3 characters' });
        } else {
            this.setState({ titleError: '' });
            this.props.history.push('/');
        }
    };

    render() {
        return (
            <>
                <Dialog open={true} onClose={this.handleClose} aria-labelledby='form-dialog-title'>
                    <DialogTitle style = {{textAlign:'center'}} id='form-dialog-title'>Create a post</DialogTitle>
                    <DialogContent>
                        <FormContent
                            onChangeText={this.onChangeText}
                            titleError={this.state.titleError}
                            tagError={this.state.tagError}
                            onSubmitPress={this.onSubmitPress}
                            tag={this.state.tag}
                            title={this.state.title}
                            description = {this.state.description}
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
