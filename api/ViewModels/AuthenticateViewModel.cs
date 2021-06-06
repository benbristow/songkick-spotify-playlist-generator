using System;

namespace SongkickSpotifyPlaylistGenerator.ViewModels
{
    public class AuthenticateViewModel
    {
        public AuthenticateViewModel(Uri uri)
        {
            Url = uri.ToString();
        }

        public string Url { get; }
    }
}