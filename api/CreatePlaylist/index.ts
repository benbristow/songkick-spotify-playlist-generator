import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import { GenerateSpotifyPlaylistFromSongkickUser } from "../lib/playlistHelper";
import { DecodeSpotifyToken } from "../lib/tokenHelper";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    throw JSON.stringify(req.headers);

    const token = DecodeSpotifyToken(req.headers["Access-Token"]);
    const songkickUsername = req.body.username;

    const playlist = await GenerateSpotifyPlaylistFromSongkickUser(token, songkickUsername);

    context.res = {
        body: {
            playlistId: playlist.id
        }
    };
};

export default httpTrigger;
