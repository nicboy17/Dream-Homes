import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';

const FormContent = ({
    onChangeText,
    onSubmitPress,
    titleError,
    tagError,
    title,
    tag,
    link,
    description
}) => {
    return (
        <Fragment>
            <TextField
                autoFocus
                margin='dense'
                id='title'
                placeholder='Add your title'
                type='title'
                fullWidth
                onChange={e => onChangeText(e)}
                value={title}
                helperText={titleError}
                error={Boolean(titleError)}
            />

            <TextField
                margin='dense'
                id='description'
                placeholder='Tell everyone what your post is about'
                type='text'
                multiline
                fullWidth
                onChange={e => onChangeText(e)}
                value={description}
            />

            <TextField
                margin='dense'
                id='link'
                placeholder='Add a destination link'
                type='text'
                fullWidth
                onChange={e => onChangeText(e)}
                value={link}
            />

            <TextField
                margin='dense'
                id='tag'
                label='Tags'
                type='text'
                fullWidth
                value={tag}
                onChange={e => onChangeText(e)}
                onKeyPress={e => onSubmitPress(e)}
                error={Boolean(tagError)}
                helperText={tagError}
            />
        </Fragment>
    );
};

export default FormContent;
