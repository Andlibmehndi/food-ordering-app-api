// Libraries
import React from 'react';
import {  BrowserRouter as Router,
    Switch,
    Route } from 'react-router-dom';
// components
import Home from '../Components/Home';
import NotFound from '../Components/NotFound';
import { Login } from "../Components/Login";


const Routes = (props) => (
    <Router>
        <Switch>
        <Route exact path="/" component={Login} />
        <Route path='/restaurant' component={Home} />
        <Route path="*" component={NotFound} />
        </Switch>
    </Router>
);

export default Routes;
