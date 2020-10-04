import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import { getSpotifyToken } from "../lib/authenticationHelper";
import { createJwtToken } from "../lib/tokenHelper";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const spotifyToken = await getSpotifyToken(req.query.code);
    const jwtToken = createJwtToken(spotifyToken);

    context.res = {
        body: {
            redirectUrl: `${process.env.FRONTEND_URL}/?token=${jwtToken}`
        }
    };
};

export default httpTrigger;
