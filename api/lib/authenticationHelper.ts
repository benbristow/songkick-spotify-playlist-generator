import { OAuth2 } from 'oauth';

const redirect_uri = `${process.env.API_URL}/api/AuthenticateCallback`;

const spotifyOauthProvider = new OAuth2(
  process.env.SPOTIFY_CLIENT_ID,
  process.env.SPOTIFY_CLIENT_SECRET,
  'https://accounts.spotify.com/',
  'authorize',
  'api/token'
);

export const getSpotifyAuthorizeUrl = (): string => {
  return spotifyOauthProvider.getAuthorizeUrl({
    scope: 'playlist-read-private playlist-modify-public playlist-modify-private user-read-private',
    redirect_uri,
    response_type: 'code',
    state: false,
    show_dialog: true
  });
}

export const getSpotifyToken = (code: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    spotifyOauthProvider.getOAuthAccessToken(code, { grant_type: 'authorization_code', redirect_uri }, (_data, token) => {
      if (token) {
        resolve(token);
        return;
      }

      reject();
    });
  });
}