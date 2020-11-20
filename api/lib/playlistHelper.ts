import { flatten, uniqBy, shuffle } from 'lodash';

import { GetUserCalendar } from "./songkickHelper";
import { GetArtistTopTracks, CreatePlaylist } from "./spotifyApiHelper";

export const GenerateSpotifyPlaylistFromSongkickUser = async (spotifyToken: string, songkickUsername: string): Promise<SpotifyApi.CreatePlaylistResponse> => {
    const songkickCalendar = await GetUserCalendar(songkickUsername);

    let artists = flatten(songkickCalendar.map(e => e.event.performance.map(p => p.artist)));
    artists = uniqBy(artists, a => a.id || a.displayName);

    let tracks: SpotifyApi.TrackObjectFull[] = [];
    for (const artist of artists) {
        const artistTopTracks = await GetArtistTopTracks(spotifyToken, artist.displayName);
        tracks = [...artistTopTracks, ...tracks];
    }

    const playlist = await CreatePlaylist(spotifyToken, shuffle(tracks));

    return playlist;
}
