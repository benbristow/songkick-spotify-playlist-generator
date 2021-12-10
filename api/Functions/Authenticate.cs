using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using SongkickSpotifyPlaylistGenerator.Services;
using SongkickSpotifyPlaylistGenerator.ViewModels;

namespace SongkickSpotifyPlaylistGenerator.Functions
{
    public class Authenticate
    {
        private readonly IAuthenticationService _authenticationService;

        public Authenticate(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [FunctionName(nameof(Authenticate))]
        [OpenApiOperation(nameof(Authenticate))]
        [OpenApiResponseWithBody(HttpStatusCode.OK, "application/json", typeof(AuthenticateViewModel))]
        public IActionResult Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req)
            => new OkObjectResult(new AuthenticateViewModel(_authenticationService.GetSpotifyAuthorizationUrl()));
    }
}