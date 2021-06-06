using Newtonsoft.Json;

namespace SongkickSpotifyPlaylistGenerator.ViewModels
{
    public class CreatedPlaylistViewModel
    {
        public CreatedPlaylistViewModel(string playlistId)
        {
            PlaylistId = playlistId;
        }

        [JsonProperty]
        public string PlaylistId { get; }
    }
}