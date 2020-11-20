import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'

const PrivateRoute = ({user:{isAuthenticated},component: Component, ...rest}) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            isAuthenticated ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

const mapStateToProps = state=>{
    return {
        user:state.user
    }
}

export default connect(mapStateToProps)(PrivateRoute);