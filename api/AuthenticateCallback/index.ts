import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import StatusCode from "status-code-enum";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // const spotifyToken = await getSpotifyToken(req.query.code);
    // const jwtToken = createJwtToken(spotifyToken);

    context.res = {
        status: StatusCode.RedirectFound,
        headers: {
            location: 'https://www.google.com/'
        }
    }
};

export default httpTrigger;
