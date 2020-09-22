import { AzureFunction, Context, HttpRequest } from '@azure/functions';

import { getSpotifyAuthorizeUrl } from '../lib/authenticationHelper';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const authorizeUrl = getSpotifyAuthorizeUrl();

        context.res = {
            body: {
                url: authorizeUrl
            }
        }
    } catch (ex) {
        context.res = {
            body: {
                error: JSON.stringify(ex)
            }
        }
    }
};

export default httpTrigger;
