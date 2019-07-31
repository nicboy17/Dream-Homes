import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";

import "./App.css";

import PostDialog from './components/Dialog/PostDialog/PostDialog'
import BoardDialog from "./components/Dialog/BoardDialog/BoardDialog";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path = "/profile/:username/post/create" component = {PostDialog}/>
        <Route path = "/profile/:username/board/create" component = {BoardDialog}/>
        <Route path="/" component={LandingPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
