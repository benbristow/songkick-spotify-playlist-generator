import { chunk } from "lodash";

import SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

export const getArtistTopTracks = async (token: string, artistName: string) => {
    spotifyApi.setAccessToken(token);

    const results = await spotifyApi.searchTracks(`artist:${artistName}`);

    return results.body.tracks.items.slice(0, 10);
}

export const createPlaylist = async (token: string, tracks: SpotifyApi.TrackObjectFull[]): Promise<SpotifyApi.CreatePlaylistResponse> => {
    spotifyApi.setAccessToken(token);

    const meResponse = await spotifyApi.getMe();

    const playlistResponse = await spotifyApi.createPlaylist(meResponse.body.id, `${meResponse.body.display_name}'s Songkick Playlist`);

    for(const trackUriChunk of chunk(tracks.map(t => t.uri), 10)) {
        await spotifyApi.addTracksToPlaylist(playlistResponse.body.id, trackUriChunk);
    }

    return playlistResponse.body;
}