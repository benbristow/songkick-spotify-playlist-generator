using System;
using Newtonsoft.Json;

namespace SongkickSpotifyPlaylistGenerator.ViewModels
{
    public class AuthenticateViewModel
    {
        public AuthenticateViewModel(Uri uri)
        {
            Url = uri.ToString();
        }

        [JsonProperty]
        public string Url { get; }
    }
}