import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import queryString from 'query-string';

import { authenticated, setJwtToken } from "./helpers/authenticationHelper";

import { Footer } from './components/footer';
import Navbar from "./components/navbar";
import { ProtectedRoute } from "./components/protectedRoute";
import { CreatePage } from "./pages/create";
import { HomePage } from "./pages/home";

const App = () => {
    const query = queryString.parse(window.location.search);
    if (query.token) {
        setJwtToken(query.token);
        window.location.search = '';
    }

    return (
        <Fragment>
            <div className="site-content">
                <Router>
                    <Navbar/>
                    <Switch>
                        <ProtectedRoute path="/create" fallbackPath="/" active={authenticated()} component={CreatePage} />
                        <ProtectedRoute path="/" fallbackPath="/create" active={!authenticated()} component={HomePage} />
                    </Switch>
                </Router>
            </div>

            <Footer/>
        </Fragment>
    );
}

export default App;