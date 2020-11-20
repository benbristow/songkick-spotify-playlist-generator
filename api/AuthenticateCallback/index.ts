import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import StatusCode from "status-code-enum";

import { GetSpotifyToken } from "../lib/authenticationHelper";
import { CreateJwtToken } from "../lib/tokenHelper";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const spotifyToken = await GetSpotifyToken(req.query._code);
    const jwtToken = CreateJwtToken(spotifyToken);

    context.res = {
        status: StatusCode.RedirectFound,
        headers: {
            location: `${process.env.FRONTEND_URL}/?token=${jwtToken}`
        }
    };
};

export default httpTrigger;
