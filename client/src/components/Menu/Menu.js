import React from 'react';
import Fab from '@material-ui/core/Fab';
import MoreHortIcon from '@material-ui/icons/MoreHoriz';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const MoreMenu = ({ icon, edit, remove, menuStyle }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={menuStyle}>
            <Fab size="small" color="secondary" aria-label="add" onClick={handleClick}>
                {icon === 'hort' ? <MoreHortIcon /> : <MoreVertIcon />}
            </Fab>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {/* <MenuItem onClick={edit}>Edit</MenuItem> */}
                <MenuItem onClick={remove}>Delete</MenuItem>
            </Menu>
        </div>
    );
};

export default MoreMenu;
