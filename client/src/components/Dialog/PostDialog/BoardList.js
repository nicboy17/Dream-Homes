import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

const BoardList = ({ boards, handleSelect, value }) => {
    const classes = useStyles();

    return (
        <form className={classes.root} autoComplete='off'>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor='board'>Boards</InputLabel>
                <Select
                    value={value}
                    onChange={e => handleSelect(e)}
                    inputProps={{
                        name: 'title',
                        id: 'board'
                    }}
                >
                    {boards.map((board, i) => {
                        return (
                            <MenuItem key={i} value={board}>
                                {board.title}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </form>
    );
};

export default BoardList;
