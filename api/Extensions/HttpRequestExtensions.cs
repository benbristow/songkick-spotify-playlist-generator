using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace SongkickSpotifyPlaylistGenerator.Extensions
{
    public static class HttpRequestExtensions
    {
        public static async Task<T> DeserializeBodyAsync<T>(this HttpRequest request)
        {
            var requestString = await new StreamReader(request.Body).ReadToEndAsync();
            return JsonConvert.DeserializeObject<T>(requestString);
        }
    }
}