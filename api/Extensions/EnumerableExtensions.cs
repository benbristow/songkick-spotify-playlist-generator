using System;
using System.Collections.Generic;
using System.Linq;

namespace SongkickSpotifyPlaylistGenerator.Extensions
{
    public static class EnumerableExtensions
    {
        public static IEnumerable<T> Shuffle<T>(this IEnumerable<T> enumerable)
        {
            var r = new Random();
            return enumerable.OrderBy(x => r.Next()).ToList();
        }
    }
}