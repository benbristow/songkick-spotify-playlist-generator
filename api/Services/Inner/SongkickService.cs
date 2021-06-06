using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using SongkickSpotifyPlaylistGenerator.Services.Inner.Responses;

namespace SongkickSpotifyPlaylistGenerator.Services.Inner
{
    public interface ISongkickService
    {
        Task<IEnumerable<string>> GetArtistsForUserAsync(string username);
    }

    public class SongkickService : ISongkickService
    {
        private readonly HttpClient _httpClient = new HttpClient()
        {
            BaseAddress = new Uri("https://api.songkick.com/api/3.0/")
        };

        public async Task<IEnumerable<string>> GetArtistsForUserAsync(string username)
        {
            var responseJson = await _httpClient.GetStringAsync($"users/{username}/calendar.json?apikey={Config.Songkick.ApiKey}&reason=attendance&per_page=50");
            var response = JsonConvert.DeserializeObject<SongkickCalendarResponse>(responseJson);

            return response!.ResultsPage.Results.CalendarEntry
                .Where(x => x.Reason.Attendance == "im_going")
                .SelectMany(x => x.Event.Performance)
                .Select(x => x.Artist.DisplayName);
        }
    }
}