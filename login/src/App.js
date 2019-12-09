import React, { Component } from 'react';
import './App.css';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
//import Component_Layout from './components/shared/component_Layout'
import Component_SignIn from './Login/login'
import test from './Login/test'
import testUser from './Login/testUser'
import newUser from './Login/crud'
import dashboard from './DashBoard/dashBoard'
//import component_TopS from './components/shared/component_TopS'

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    NavLink
} from 'react-router-dom';

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
const theme = createMuiTheme({
    palette:
    {
        primary: teal,
    },
    typography: { useNextVariants: true },
    direction: 'rtl'
});



class App extends Component
{
    render()
    {
        return (
            <MuiThemeProvider theme={theme}>
            <div className="App">
                <Router >
                    <div>
                        <Switch>

                            <div>

                                <Route exact path="/" render={() => (<Redirect to="/0gNnxvTpuM6vZOujEl11cIelo24jvhrbMJI0Ra1WKE0" />)} />
                                <Route exact={true} path="/0gNnxvTpuM6vZOujEl11cIelo24jvhrbMJI0Ra1WKE0" component={Component_SignIn} />

                                <Route path="/rAVu7p94Q79t4IQCE2mlzxU" component={test} />
                                <Route path="/rUVu7p94Q79t4IQCE2mlzxU" component={testUser} />
                                    
                            </div>

                        </Switch>
                    </div>
                </Router>
                </div>
                </MuiThemeProvider>
        );
    }
}

export default App;

