using System;
using System.Threading.Tasks;
using SongkickSpotifyPlaylistGenerator.Services.Inner;

namespace SongkickSpotifyPlaylistGenerator.Services
{
    public interface IPlaylistService
    {
        Task<string> CreateSpotifyPlaylist(string songkickUsername, string spotifyAccessToken);
    }

    public class PlaylistService : IPlaylistService
    {
        private readonly ISongkickService _songkickService;
        private readonly ISpotifyService _spotifyService;

        public PlaylistService(
            ISongkickService songkickService,
            ISpotifyService spotifyService) {
            _songkickService = songkickService;
            _spotifyService = spotifyService;
        }

        public async Task<string> CreateSpotifyPlaylist(string songkickUsername, string spotifyAccessToken)
        {
            var artists = await _songkickService.GetArtistsForUserAsync(songkickUsername);

            var playlist = await _spotifyService.CreatePlaylistFromArtists(
                artists,
                $"{songkickUsername}'s Songkick Playlist ({DateTime.Now.ToShortDateString()})",
                spotifyAccessToken);

            return playlist.Id;
        }
    }
}