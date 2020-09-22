import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import { generateSpotifyPlaylistFromSongkickUser } from "../lib/playlistHelper";
import { decodeSpotifyToken } from "../lib/tokenHelper";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const token = decodeSpotifyToken(req.headers.token);
    const songkickUsername = req.body.username;

    const playlist = await generateSpotifyPlaylistFromSongkickUser(token, songkickUsername);

    context.res = {
        body: {
            playlistId: playlist.id
        }
    };
};

export default httpTrigger;
