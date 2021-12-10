using Newtonsoft.Json;

namespace SongkickSpotifyPlaylistGenerator.BindingModels
{
    public class CreatePlaylistBindingModel
    {
        [JsonProperty(Required = Required.Always)]
        public string Username { get; init; }
    }
}