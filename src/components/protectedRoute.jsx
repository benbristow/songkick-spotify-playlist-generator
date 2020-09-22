import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, active, fallbackPath, ...rest }) => {
    return (
        <Route {...rest} render={
            props => {
                if (!active) {
                    return <Redirect to={fallbackPath} />;
                }

                return <Component {...rest} {...props} />
            }
        } />
    )
}