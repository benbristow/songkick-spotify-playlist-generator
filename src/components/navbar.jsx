import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { deleteJwtToken, authenticated } from "../helpers/authenticationHelper";

import { Button } from "./button";

const Navbar = () => {
    const [loading, setLoading] = useState(false);
    const isAuthenticated = authenticated();

    const logout = () => {
        setLoading(true);
        deleteJwtToken();
        window.location.reload();
    }

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Songkick Spotify Playlist Generator</Link>
                { (isAuthenticated || loading) &&
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Button theme="primary" onClick={logout} loading={loading}>Logout</Button>
                        </li>
                    </ul>
                }
            </div>
        </nav>
    );
}

export default withRouter(Navbar);