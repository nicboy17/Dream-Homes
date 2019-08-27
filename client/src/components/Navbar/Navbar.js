import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { makeStyles } from '@material-ui/styles';
import { Link, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { logout } from '../../actions/userActions';
import NavMenu from './NavMenu';
import NavSearch from './NavSearch';
import { searchPosts } from '../../actions/post';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    header: {
        display: 'grid',
        gridTemplateColumns: '4fr 2fr 6fr 6fr',
        minHeight: '16vh',
        justifyItems: 'center',
        alignItems: 'center'
    },
    headerBottomBorder: {
        minHeight: '5px',
        backgroundImage: 'linear-gradient(lightgrey, white)'
    },
    headerContainer: {
        position: 'fixed',
        background: 'white',
        zIndex: '10'
    },
    placeholderHeader: {
        minHeight: '16vh',
        height: '16vh'
    },
    clear: {
        cursor: 'pointer'
    }
}));

const Navbar = ({ userStore, logout, history, location, searchPosts }) => {
    const [search, setSearch] = React.useState('');
    const classes = useStyles();

    function handleLogOutClicked () {
        logout();
        history.replace('/');
    }

    function handleSearch (event) {
        event.preventDefault();
        // eslint-disable-next-line camelcase
        const { easy_filters = '' } = queryString.parse(location.search);
        if (userStore.authenticated) {
            searchPosts(search, easy_filters, userStore.user._id);
        } else {
            searchPosts(search, easy_filters, '');
        }
        history.push('/');
    }

    function handleSearchChange (event) {
        setSearch(event.target.value);
    }

    function clearSearch () {
        setSearch('');
    }

    function Following () {
        if (!userStore.authenticated) {
            return null;
        }

        return (
            <Link
                to={`/profile/${userStore.user.username}/following`}
                style={{
                    textDecoration: 'none'
                }}>
                <Button style={{
                    border: 'none',
                    padding: '0',
                    borderRadius: '7.5px'
                }}
                >
                    Following
                </Button>
            </Link>
        );
    }

    return (
        <div>
            <div className={classes.headerContainer}>
                <div className={classes.header}>
                    <div>
                        <h3>Dream Home</h3>
                    </div>
                    <div />
                    <NavSearch
                        search={search}
                        handleSearch={handleSearch}
                        handleChange={handleSearchChange}
                        clear={clearSearch}
                    />
                    <Grid
                        container
                        direction="row"
                        justify="space-evenly"
                        alignItems="center"
                    >
                        <Link to='/' style={{
                            textDecoration: 'none'
                        }}
                        >
                            <Button style={{
                                border: 'none',
                                padding: '0',
                                borderRadius: '7.5px'
                            }}
                            >
                                Home
                            </Button>
                        </Link>
                        {Following()}
                        <NavMenu
                            user={userStore.user}
                            handleLogOutClicked={handleLogOutClicked}
                            authenticated={userStore.authenticated}
                        />
                    </Grid>
                </div>
                <div className={classes.headerBottomBorder} />
            </div>
            <div className={classes.placeholderHeader}>placeholder</div>
        </div>
    );
};

const mapStateToProps = state => ({
    userStore: state.UserStore
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            logout,
            searchPosts
        },
        dispatch
    );
}

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Navbar);
