import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import { theme } from './themes/theme';
import './App.css';

import Main from './pages/Main';
import SignUp from './pages/SignUp.js';
import Login from './components/Dialog/Login/Login';
import ProfilePage from './pages/Profile/ProfilePage.js';

import PostPage from './pages/Post/PostPage';
import { getToken } from './actions/userActions';

import PostInBoards from './pages/Profile/PostsInBoards';
import NavBar from './components/Navbar/Navbar';
import FollowingPage from './pages/Following/FollowingPage';

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
                            <Route exact path='/' component={withRouter(Main)} />
                            <Route exact path='/login' component={Login} />
                            <Route path='/posts/:id' component={PostPage} />
                            <Route path='/profile/:username/following' component={FollowingPage}/>
                            <Route
                                path='/profile/:username'
                                render={props => (
                                    <ProfilePage key={props.match.params.username} {...props} />
                                )}
                            />
                            <Route exact path='/signup' component={SignUp} />
                            <Route path='/board/:id' component={PostInBoards}/>
                        </Switch>
                    </div>
                </BrowserRouter>
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
