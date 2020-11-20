import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import queryString from 'query-string';

import { IsAuthenticated, SetJwtToken } from "./helpers/authenticationHelper";

import { Footer } from './components/footer';
import Navbar from "./components/navbar";
import { ProtectedRoute } from "./components/protectedRoute";
import { CreatePage } from "./pages/create";
import { HomePage } from "./pages/home";

const App = () => {
    const query = queryString.parse(window.location.search);
    if (query.token) {
        SetJwtToken(query.token);
        window.location.search = '';
    }

    return (
        <Fragment>
            <div className="site-content">
                <Router>
                    <Navbar/>
                    <Switch>
                        <ProtectedRoute path="/create" fallbackPath="/" active={IsAuthenticated()} component={CreatePage} />
                        <ProtectedRoute path="/" fallbackPath="/create" active={!IsAuthenticated()} component={HomePage} />
                    </Switch>
                </Router>
            </div>

            <Footer/>
        </Fragment>
    );
}

export default App;