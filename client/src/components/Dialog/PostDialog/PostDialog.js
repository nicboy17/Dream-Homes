import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogActions, DialogTitle } from '../components';
import { Chip } from '@material-ui/core';
import FormContent from './FormContent';
import FileUploader from './FileUploader';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getBoardsandPosts } from '../../../actions/profile';
import { addPost } from '../../../actions/post';
import BoardList from './BoardList';
import '../../../pages/stylesheet/Dialog.css';

class PostDialog extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            descriptionError: '',
            link: '',
            linkError: '',
            tag: '',
            tags: [],
            tagError: '',
            titleError: '',
            board: '',
            image: '',
            imageError: ''
        };

        this.onCreate = this.onCreate.bind(this);
    }

    componentDidMount = async () => {
        const username = this.props.match.params.username;
        if (!this.props.userStore.boards) {
            getBoardsandPosts(username);
        }
        this.setState({ username });
    };

    changeTitle = e => {
        this.setState({ [e.target.id]: e.target.value, [`${e.target.id}Error`]: '' });
    };

    changeBoard = e => {
        this.setState({ board: e.target.value });
    };

    createTag = e => {
        const { tags, tag } = this.state;
        if (e.which === 13) {
            if (tags.includes(tag)) {
                this.setState({ tagError: 'Can not have duplicate tags' });
            } else if (tag.length > 15) {
                this.setState({ tagError: 'Tags cannot be more than 15 characters' });
            } else {
                this.setState({
                    tags: [...tags, tag.trim()],
                    tag: '',
                    tagError: ''
                });
            }
        }
    };

    Tags = () => {
        return this.state.tags.map((tag, i) => {
            return (
                <Chip
                    key={i}
                    label={tag}
                    onDelete={() => this.onDeleteTag(tag)}
                    style={{ margin: 2 }}
                    size="small"
                    variant="outlined"
                    className="chip"
                />
            );
        });
    };

    onDeleteTag = del => {
        this.setState({ tags: this.state.tags.filter(tag => tag !== del) });
    };

    onUploadImages = fileItems => {
        const filterFiles = fileItems.filter(
            fileItem => fileItem.file.type.toString() === 'image/jpeg'
        );
        this.setState({ image: filterFiles.map(filterFile => filterFile.file)[0] });
    };

    renderSmallText = () => {
        if (!this.state.image) {
            return (
                <div className="smallText">
                    <div style={{ textAlign: 'center', fontSize: 14 }}>
                        Use high-quality jpg files <br /> less than 32mb
                    </div>
                </div>
            );
        }
    };

    onCreate = (e) => {
        const { image, title, link, description, titleError, linkError, descriptionError } = this.state;
        e.preventDefault();
        if (image.length < 1) {
            this.setState({ imageError: 'Please include at least one image' });
        }
        if (title.length < 3 || title.length > 15) {
            this.setState({ titleError: 'Must be at least 3 or less than 15 characters' });
        }
        if (link.length < 3 || link.length > 15) {
            this.setState({ linkError: 'Must be at least 3 or less than 15 characters' });
        }
        if (description.length < 3 || description.length > 200) {
            this.setState({ descriptionError: 'Must be at least 3 to 200 characters' });
        } else if (image.length > 0 && !titleError && !linkError && !descriptionError) {
            this.props.addPost(this.state, this.state.username);
        }
    };

    onCloseClick = () => {
        this.props.history.push(`/profile/${this.state.username}`);
    };

    render () {
        const { userStore, match: { params } } = this.props;

        if (userStore.authenticated && userStore.user.username !== params.username) {
            return <Redirect to={`/profile/${params.username}`} />;
        }

        return (
            <Dialog
                open={true}
                onClose={this.handleClose}
                aria-labelledby='form-dialog-title'
                onClick={() => this.onCloseClick()}
                maxWidth={'sm'}

            >
                <div onClick={e => e.stopPropagation()}>
                    <DialogTitle style={{ textAlign: 'center' }} id='dialog-title' title={'Create a post'} onClose={() => this.onCloseClick()}/>
                    <div className="container">
                        <div className="splitContainer">
                            <DialogContent>
                                <BoardList
                                    className="boardList"
                                    boards={userStore.user.boards}
                                    handleSelect={this.changeBoard}
                                    value={this.state.board}
                                />
                                <FormContent
                                    onChangeText={this.changeTitle}
                                    titleError={this.state.titleError}
                                    tagError={this.state.tagError}
                                    linkError={this.state.linkError}
                                    descriptionError={this.state.descriptionError}
                                    onSubmitPress={this.createTag}
                                    tag={this.state.tag}
                                    title={this.state.title}
                                    description={this.state.description}
                                    link={this.state.link}
                                />
                                <this.Tags/>
                            </DialogContent>
                        </div>
                        <div className="splitContainer">
                            <DialogContent>
                                <div className="fileUpload" onClick={() => {}}>
                                    <FileUploader
                                        onUploadImages={this.onUploadImages}
                                        files={this.state.image}
                                    />
                                    {this.renderSmallText()}
                                </div>
                            </DialogContent>
                            <DialogContent />
                        </div>
                    </div>
                </div>
                <DialogActions>
                    <Button onClick={this.onCreate} color='primary' style={{ margin: '1rem auto' }}>Create</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = state => ({
    userStore: state.UserStore,
    profileStore: state.ProfileStore,
    snackBarStore: state.SnackBarStore
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
