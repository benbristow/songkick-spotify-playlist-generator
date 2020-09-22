import { AzureFunction, Context, HttpRequest } from '@azure/functions';

import { getSpotifyAuthorizeUrl } from '../lib/authenticationHelper';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const authorizeUrl = getSpotifyAuthorizeUrl();

    context.res = {
        body: {
            url: authorizeUrl
        }
    }
};

export default httpTrigger;
