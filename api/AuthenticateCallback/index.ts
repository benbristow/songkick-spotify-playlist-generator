import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import StatusCode from "status-code-enum";

import { getSpotifyToken } from "../lib/authenticationHelper";
import { createJwtToken } from "../lib/tokenHelper";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const spotifyToken = await getSpotifyToken(req.query.code);
    const jwtToken = createJwtToken(spotifyToken);

    context.res = {
        status: StatusCode.RedirectFound,
        headers: {
            location: `${process.env.FRONTEND_URL}/?token=${jwtToken}`
        }
    };
};

export default httpTrigger;
