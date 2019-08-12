import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'block',
        padding: theme.spacing(2)
    }
}));

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
    const classes = useStyles();

    return (
        <form className={classes.root}>
            <TextField
                autoFocus
                fullWidth
                margin='dense'
                id='title'
                label={'Title'}
                placeholder='Add your title'
                type='title'
                onChange={e => onChangeText(e)}
                value={title}
                helperText={titleError}
                error={Boolean(titleError)}
            />

            <TextField
                fullWidth
                margin='dense'
                id='description'
                label={'Description'}
                placeholder='Tell everyone what your post is about'
                type='text'
                multiline
                onChange={e => onChangeText(e)}
                value={description}
            />

            <TextField
                fullWidth
                margin='dense'
                id='link'
                label={'Link'}
                placeholder='Add a destination link'
                type='text'
                onChange={e => onChangeText(e)}
                value={link}
            />

            <TextField
                fullWidth
                margin='dense'
                id='tag'
                type='text'
                label={'Tags'}
                placeholder='tags'
                value={tag}
                onChange={e => onChangeText(e)}
                onKeyPress={e => onSubmitPress(e)}
                error={Boolean(tagError)}
                helperText={tagError}
            />
        </form>
    );
};

export default FormContent;
