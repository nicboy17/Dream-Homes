import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { theme } from './themes/theme';
import './App.css';

import Main from './pages/Main';
import ProfilePage from './pages/Profile/ProfilePage.js';
import FollowingPage from './pages/Follow/FollowingPage';
import FollowersPage from './pages/Follow/FollowersPage';

import PostPage from './pages/Post/PostPage';
import { getToken } from './actions/user';

import BoardPage from './pages/Profile/BoardPage';
import NavBar from './components/Navbar/Navbar';
import Confirm from './components/Dialog/Confirm';
import SnackBar from './components/SnackBar/SnackBar';

class App extends Component {
    constructor (props) {
        super(props);
        this.props.getToken();
    }

    render () {
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <NavBar />
                    <div>
                        <Switch>
                            <Route exact path='/' component={Main} />
                            <Route path='/login' component={Main} />
                            <Route path='/signup' component={Main} />
                            <Route path='/posts/:id' component={PostPage} />
                            <Route path='/profile/:username/following' component={FollowingPage}/>
                            <Route path='/profile/:username/followers' component={FollowersPage}/>
                            <Route path='/profile/:username' component={ProfilePage}/>
                            <Route path='/board/:id' component={BoardPage}/>
                        </Switch>
                    </div>
                </BrowserRouter>
                <Confirm/>
                <SnackBar/>
            </MuiThemeProvider>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            getToken
        },
        dispatch
    );
}

export default connect(
    null,
    mapDispatchToProps
)(App);
