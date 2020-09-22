import React, { Fragment, useState } from 'react';

import { createPlaylist } from "../apiClient";
import { isUndefinedOrNullOrEmpty } from "../helpers/generalHelper";

import { Button } from "../components/button";
import { showError } from "../helpers/messageHelper";
import { SpotifyPlayer } from "../components/spotifyPlayer";

export const CreatePage = () => {
    const [state, setState] = useState({
        loading: false,
        username: null,
        playlist: null
    });

    const onUsernameChange = (event) => {
        setState({ ...state, username: event.currentTarget.value });
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        setState({ ...state, loading: true });

        try {
            const playlist = await createPlaylist(state.username);
            setState({ ...state, loading: false, playlist: playlist.data });
        } catch (ex) {
            showError('Unable to create playlist');
            setState({ ...state, loading: false });
            throw ex;
        }
    }

    return (
        <div className="page page--create">
            <div className="container">
                <div className="card mb-3">
                    <div className="card-body">
                        {!state.playlist && (
                            <Fragment>
                                <h3>Create a playlist</h3>

                                <form className="form" onSubmit={onSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Your Songkick username</label>
                                        <input className="form-control" name="username" id="username" type="text" onChange={onUsernameChange} placeholder="Enter your Songkick username"/>
                                    </div>

                                    <Button type="submit" theme="primary" disabled={isUndefinedOrNullOrEmpty(state.username)} loading={state.loading} block>
                                        Create Playlist
                                    </Button>
                                </form>
                            </Fragment>
                        )}

                        {state.playlist && (
                            <SpotifyPlayer playlistId={state.playlist.playlistId}></SpotifyPlayer>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
