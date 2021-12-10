using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.OpenApi.Models;
using SongkickSpotifyPlaylistGenerator.BindingModels;
using SongkickSpotifyPlaylistGenerator.Extensions;
using SongkickSpotifyPlaylistGenerator.Services;
using SongkickSpotifyPlaylistGenerator.ViewModels;

namespace SongkickSpotifyPlaylistGenerator.Functions
{
    public class CreatePlaylist
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IPlaylistService _playlistService;

        public CreatePlaylist(
            IAuthenticationService authenticationService,
            IPlaylistService playlistService)
        {
            _authenticationService = authenticationService;
            _playlistService = playlistService;
        }

        [FunctionName(nameof(CreatePlaylist))]
        [OpenApiOperation(nameof(CreatePlaylist))]
        [OpenApiParameter("access-token", In = ParameterLocation.Header, Required = true, Type = typeof(string))]
        [OpenApiRequestBody("application/json", typeof(CreatePlaylistBindingModel))]
        [OpenApiResponseWithBody(HttpStatusCode.OK, "application/json", typeof(CreatedPlaylistViewModel))]
        [OpenApiResponseWithoutBody(HttpStatusCode.BadRequest)]
        public async Task<IActionResult> RunAsync(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req)
        {
            var spotifyToken = _authenticationService.GetSpotifyAccessTokenFromJwt(req.Headers["access-token"]);
            var bindingModel = await req.DeserializeBodyAsync<CreatePlaylistBindingModel>();

            if (string.IsNullOrWhiteSpace(bindingModel.Username))
            {
                return new BadRequestResult();
            }

            var playlistId = await _playlistService.CreateSpotifyPlaylist(bindingModel.Username, spotifyToken);

            return new OkObjectResult(new CreatedPlaylistViewModel(playlistId));
        }
    }
}