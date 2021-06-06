using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using SongkickSpotifyPlaylistGenerator.Services.Inner;

namespace SongkickSpotifyPlaylistGenerator.Services
{
    public interface IAuthenticationService
    {
        Uri GetSpotifyAuthorizationUrl();
        Task<string> GetSpotifyAccessTokenAsync(string code);
        string CreateJwtToken(string accessToken);
        string GetSpotifyAccessTokenFromJwt(string token);
    }

    public class AuthenticationService : IAuthenticationService
    {
        private readonly ISpotifyService _spotifyService;
        private static Uri RedirectUri => new Uri($"{Config.Urls.ApiUrl}/api/Callback");

        private static SigningCredentials JwtSigningCredentials => new SigningCredentials(
            new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Config.SecretKey)),
            SecurityAlgorithms.HmacSha256Signature);

        public AuthenticationService(ISpotifyService spotifyService)
        {
            _spotifyService = spotifyService;
        }

        public Uri GetSpotifyAuthorizationUrl() =>
            _spotifyService.GetAuthorizeUrl(RedirectUri);

        public Task<string> GetSpotifyAccessTokenAsync(string code) =>
            _spotifyService.GetAccessToken(code, RedirectUri);

        public string CreateJwtToken(string accessToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(new SecurityTokenDescriptor
            {
                Expires = DateTime.Now.AddHours(1),
                Issuer = Config.Urls.ApiUrl,
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("SpotifyToken", accessToken)
                }),
                SigningCredentials = JwtSigningCredentials
            });

            return tokenHandler.WriteToken(token);
        }

        public string GetSpotifyAccessTokenFromJwt(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var claims = tokenHandler.ValidateToken(
                token,
                new TokenValidationParameters()
                {
                    IssuerSigningKey = JwtSigningCredentials.Key,
                    ValidIssuer = Config.Urls.ApiUrl,
                    ValidateAudience = false
                },
                out _);

            return claims.FindFirst(x => x.Type == "SpotifyToken").Value;
        }
    }
}