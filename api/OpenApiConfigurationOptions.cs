using System.Collections.Generic;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Abstractions;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
using Microsoft.OpenApi.Models;

namespace SongkickSpotifyPlaylistGenerator
{
    public class OpenApiConfigurationOptions : IOpenApiConfigurationOptions
    {
        public OpenApiInfo Info { get; set; } = new()
        {
            Title = "Songkick Spotify Playlist Generator API"
        };

        public List<OpenApiServer> Servers { get; set; } = new();
        public OpenApiVersionType OpenApiVersion { get; set; } = OpenApiVersionType.V2;
        public bool IncludeRequestingHostName { get; set; }
        public bool ForceHttp { get; set; }
        public bool ForceHttps { get; set; }
    }
}