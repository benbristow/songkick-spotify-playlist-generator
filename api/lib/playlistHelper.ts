import { flatten, uniqBy, shuffle } from 'lodash';

import { getUserCalendar } from "./songkickHelper";
import { getArtistTopTracks, createPlaylist } from "./spotifyApiHelper";

export const generateSpotifyPlaylistFromSongkickUser = async (spotifyToken: string, songkickUsername: string): Promise<SpotifyApi.CreatePlaylistResponse> => {
    const songkickCalendar = await getUserCalendar(songkickUsername);

    let artists = flatten(songkickCalendar.map(e => e.event.performance.map(p => p.artist)));
    artists = uniqBy(artists, a => a.id || a.displayName);

    let tracks: SpotifyApi.TrackObjectFull[] = [];
    for (const artist of artists) {
        const artistTopTracks = await getArtistTopTracks(spotifyToken, artist.displayName);
        tracks = [...artistTopTracks, ...tracks];
    }

    const playlist = await createPlaylist(spotifyToken, shuffle(tracks));

    return playlist;
}
