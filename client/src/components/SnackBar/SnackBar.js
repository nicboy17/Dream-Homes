import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { close } from '../../actions/snackbar';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};

const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.main
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: theme.spacing(1)
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    }
}));

function SnackBar ({ snackBarStore, close }) {
    const classes = useStyles();
    const Icon = variantIcon[snackBarStore.variant];

    if (!snackBarStore.message) {
        return null;
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            open={snackBarStore.open}
            autoHideDuration={snackBarStore.duration}
            onClose={close}
        >
            <SnackbarContent
                className={classes[snackBarStore.variant]}
                aria-describedby="snackbar"
                message={
                    <span id="snackbar" className={classes.message}>
                        <Icon className={classes.icon} />
                        {snackBarStore.message}
                    </span>
                }
                action={[
                    <IconButton key="close" aria-label="close" color="inherit" onClick={close}>
                        <CloseIcon className={classes.icon} />
                    </IconButton>
                ]}
            />
        </Snackbar>
    );
}

const mapStateToProps = state => ({
    snackBarStore: state.SnackBarStore
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            close
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);
