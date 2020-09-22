import React, { Fragment } from 'react';

import { Button } from "./button";

export const SpotifyPlayer = ({ playlistId }) => {
    const openOnSpotify = () => {
        window.open(`https://open.spotify.com/playlist/${playlistId}`, '_blank');
    }

    return (
        <Fragment>
            <iframe title="Spotify Playlist" className="spotify-player" src={`https://open.spotify.com/embed/playlist/${playlistId}`}></iframe>
            <Button icon="spotify" theme="spotify" block onClick={openOnSpotify}>
                Open on Spotify
            </Button>
        </Fragment>
    );
}