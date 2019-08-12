import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogActions, DialogTitle } from '../components';
import { Chip } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
// import CircularProgress from '@material-ui/core/CircularProgress';

import _ from 'lodash';

import FormContent from './FormContent';
import FileUploader from './FileUploader';
import { bindActionCreators } from 'redux';
import { getBoardsandPosts, addPost, respond } from '../../../actions/userActions';
import SnackBar from '../../SnackBar/SnackBar';
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
            files: [],
            snackBar: false
        };

        this.snackBarClose = this.snackBarClose.bind(this);
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
            this.setState({ snackBar: true });
        }
    };

    onCloseClick = () => {
        this.props.history.push(`/profile/${this.state.username}`);
    };

    snackBarClose (event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ snackBar: false });
        if (this.props.userStore.success) {
            this.onCloseClick();
        }
        this.props.dispatch(respond());
    }

    ServerResponse = () => {
        if (this.props.userStore.success) {
            return (
                <SnackBar message={'Post Created'} variant={'success'} open={this.state.snackBar}
                    onClose={this.snackBarClose} duration={1000}/>
            );
        } else if (this.props.userStore.error) {
            return (
                <SnackBar message={'Post Creation failed'} variant={'error'}
                    open={this.state.snackBar} onClose={this.snackBarClose} duration={1500}/>
            );
        }

        return null;
    };

    render () {
        return (
            <div>
                <Dialog
                    open={true}
                    onClose={this.handleClose}
                    aria-labelledby='form-dialog-title'
                    onClick={() => this.onCloseClick()}
                    maxWidth={'md'}

                >
                    <div onClick={e => e.stopPropagation()}>
                        <DialogTitle style={{ textAlign: 'center' }} id='dialog-title' title={'Create a post'} onClose={() => this.onCloseClick()}/>
                        <DialogContent>
                            <Grid container direction="row" justify="space-between" alignItems="center">
                                <Grid item xs={6}>
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
                                </Grid>
                                <Grid item xs={6}>
                                    <FileUploader
                                        onUploadImages={this.onUploadImages}
                                        files={this.state.files}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.onCreatePress} color='primary' style={{ margin: '1rem auto' }}>Create</Button>
                        </DialogActions>
                    </div>
                </Dialog>
                <this.ServerResponse />
            </div>
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
            addPost,
            dispatch
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDialog);
