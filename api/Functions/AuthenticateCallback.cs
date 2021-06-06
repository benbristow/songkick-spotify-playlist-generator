using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using SongkickSpotifyPlaylistGenerator.Services;

namespace SongkickSpotifyPlaylistGenerator.Functions
{
    public class AuthenticateCallback
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticateCallback(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [FunctionName(nameof(AuthenticateCallback))]
        public async Task<IActionResult> RunAsync(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req)
        {
            var accessToken = await _authenticationService.GetSpotifyAccessTokenAsync(req.Query["_code"]);

            var jwtToken = _authenticationService.CreateJwtToken(accessToken);

            return new RedirectResult($"{Config.Urls.FrontendUrl}/?token={jwtToken}");
        }
    }
}