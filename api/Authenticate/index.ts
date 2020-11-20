import { AzureFunction, Context, HttpRequest } from '@azure/functions';

import { GetSpotifyAuthorizeUrl } from '../lib/authenticationHelper';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const authorizeUrl = GetSpotifyAuthorizeUrl();

    context.res = {
        body: {
            url: authorizeUrl
        }
    }
};

export default httpTrigger;
