import React, { useState } from 'react';

import { getAuthenticateUrl } from "../apiClient";
import { showError } from "../helpers/messageHelper";
import { authenticated } from '../helpers/authenticationHelper';
import { Button } from '../components/button';

export const HomePage = () => {
  const [loading, setLoading] = useState(false);

  if (authenticated()) {
    window.location.reload();
    return null;
  }

  const startAuth = async () => {
    setLoading(true);

    try {
      const authenticateUrl = await getAuthenticateUrl();
      window.location.href = authenticateUrl;
    } catch {
      showError('Unable to get Spotify authentication URL. Please check your connection and try again');
      setLoading(false);
    }
  };

  return (
    <div className="page page--home">
      <div>
        <h1 className="display-4">Your pre-gig warm-up just got started</h1>
        <p className="lead">
          Auto-magically generate a Spotify Playlist with songs from bands of your upcoming gigs via your Songkick calendar
        </p>
        <div className="alert alert-danger">
          Currently broken due to Azure updates. See <a href="https://github.com/Azure/static-web-apps/issues/165" target="_blank" rel="noopener noreferrer">GitHub</a> for more info.
        </div>
        <Button theme="spotify" icon="spotify" size="lg" loading={loading} onClick={startAuth}>Login with Spotify</Button>
      </div>
    </div>
  );
};