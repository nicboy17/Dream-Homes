import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';

import { theme } from './themes/theme';
import Landing from './pages/Landing.js';

import './App.css';

import PostDialog from './components/Dialog/PostDialog/PostDialog';
import BoardDialog from './components/Dialog/BoardDialog/BoardDialog';
import EditPicUserDialog from './components/Dialog/EditPicUserDialog/EditPicUserDialog';

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Route path='/login' component={Landing} />
                <Route path='/profile/:username/post/create' component={PostDialog} />
                <Route path='/profile/:username/board/create' component={BoardDialog} />
                <Route path='/profile/:username/edit' component={EditPicUserDialog} />
                <Route path='/' component={Landing} />
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default App;
