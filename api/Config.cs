using System;

namespace SongkickSpotifyPlaylistGenerator
{
    public static class Config
    {
        public static class Songkick
        {
            public static string ApiKey = Environment.GetEnvironmentVariable("SONGKICK_API_KEY");
        }

        public static class Spotify
        {
            public static string ClientId => Environment.GetEnvironmentVariable("SPOTIFY_CLIENT_ID");
            public static string ClientSecret => Environment.GetEnvironmentVariable("SPOTIFY_CLIENT_SECRET");
        }

        public static class Urls
        {
            public static string ApiUrl => Environment.GetEnvironmentVariable("API_URL");
            public static string FrontendUrl => Environment.GetEnvironmentVariable("FRONTEND_URL");
        }

        public static string SecretKey => Environment.GetEnvironmentVariable("SECRET_KEY");
    }
}