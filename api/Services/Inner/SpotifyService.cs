using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SongkickSpotifyPlaylistGenerator.Extensions;
using SpotifyAPI.Web;

namespace SongkickSpotifyPlaylistGenerator.Services.Inner
{
    public interface ISpotifyService
    {
        Uri GetAuthorizeUrl(Uri redirectUri);
        Task<string> GetAccessToken(string code, Uri redirectUri);
        Task<FullPlaylist> CreatePlaylistFromArtists(IEnumerable<string> artistNames, string playlistName, string accessToken);
    }

    public class SpotifyService : ISpotifyService
    {
        public Uri GetAuthorizeUrl(Uri redirectUri)
        {
            var loginRequest = new LoginRequest(redirectUri, Config.Spotify.ClientId, LoginRequest.ResponseType.Code)
            {
                Scope = new []
                {
                    Scopes.PlaylistReadPrivate,
                    Scopes.PlaylistModifyPublic,
                    Scopes.PlaylistModifyPrivate,
                    Scopes.UserReadPrivate
                }
            };

            return loginRequest.ToUri();
        }

        public async Task<string> GetAccessToken(string code, Uri redirectUri) {
            var token = await new OAuthClient()
                .RequestToken(new AuthorizationCodeTokenRequest(
                    Config.Spotify.ClientId, Config.Spotify.ClientSecret, code, redirectUri));

            return token.AccessToken;
        }

        public async Task<FullPlaylist> CreatePlaylistFromArtists(
            IEnumerable<string> artistNames, string playlistName, string accessToken)
        {
            var spotifyClient = new SpotifyClient(accessToken);

            var tracks = new List<FullTrack>();
            foreach (var artistName in artistNames)
            {
                var searchResponse = await spotifyClient.Search.Item(new SearchRequest(SearchRequest.Types.Track, $"artist:{artistName}"));
                tracks.AddRange(searchResponse.Tracks.Items!.Take(10));
            }

            var currentUser = await spotifyClient.UserProfile.Current();
            var playlist = await spotifyClient.Playlists.Create(currentUser.Id, new PlaylistCreateRequest(playlistName));

            foreach (var tracksChunk in tracks.Shuffle().Chunk(100))
            {
                await spotifyClient.Playlists.AddItems(playlist.Id!,
                    new PlaylistAddItemsRequest(tracksChunk.Select(x => x.Uri).ToList()));
            }

            return playlist;
        }
    }
}