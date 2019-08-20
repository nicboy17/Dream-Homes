import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    headerSearch: {
        width: '35vw',
        minHeight: '40px',
        borderRadius: '50px',
        border: '1px solid lightgrey',
        paddingLeft: '15px',
        outline: 'none',
        '&::before': {
            display: 'none'
        },
        '&::after': {
            display: 'none'
        },
        '& > input': {
            textAlign: 'left',
            '&::placeholder': {
                color: 'black',
                opacity: 0.7
            }
        }
    },
    close: {
        marginRight: 8
    }
}));

const NavSearch = ({ search, handleSearch, handleChange, clear }) => {
    const classes = useStyles();

    return (
        <form onSubmit={handleSearch} noValidate>
            <Input
                className={classes.headerSearch}
                placeholder='Search'
                value={search}
                onChange={handleChange}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon fontSize={'small'}/>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end" className={classes.close} onClick={clear}>
                        <CloseIcon fontSize={'small'}/>
                    </InputAdornment>
                }
            />
        </form>
    );
};

export default NavSearch;
