using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using SongkickSpotifyPlaylistGenerator;
using SongkickSpotifyPlaylistGenerator.Services;
using SongkickSpotifyPlaylistGenerator.Services.Inner;

[assembly: FunctionsStartup(typeof(Startup))]
namespace SongkickSpotifyPlaylistGenerator
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddTransient<ISongkickService, SongkickService>();
            builder.Services.AddTransient<ISpotifyService, SpotifyService>();

            builder.Services.AddTransient<IAuthenticationService, AuthenticationService>();
            builder.Services.AddTransient<IPlaylistService, PlaylistService>();
        }
    }
}