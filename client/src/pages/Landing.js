import React, { Component } from "react";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route, BrowserRouter } from "react-router-dom";

import LogIn from './LogIn.js'
import SignUp from './SignUp.js'
import Profile from './Profile.js'
import Ping from "./Ping";

const landinPageStyle = theme => ({
  landingContainer: {
    margin: theme.spacing.unit * 2
  }
});

class LandingPage extends Component {
  state = {
    placeholder: ''
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path='/login' component={LogIn}/>
          <Route exact path='/signup' component={SignUp}/>
          <Route path='/profile' component={Profile}/>
        </BrowserRouter>        
      </div>
    );
  }
}

export default withStyles(landinPageStyle)(LandingPage);
