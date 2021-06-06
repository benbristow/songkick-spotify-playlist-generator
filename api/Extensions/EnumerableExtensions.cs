using System;
using System.Collections.Generic;
using System.Linq;

namespace SongkickSpotifyPlaylistGenerator.Extensions
{
    public static class EnumerableExtensions
    {
        // https://stackoverflow.com/a/27919329
        public static IEnumerable<IEnumerable<T>> Chunk<T>(this IEnumerable<T> source, int chunkSize)
        {
            var chunkList = source.ToList();
            while (chunkList.Count > chunkSize)
            {
                yield return chunkList.GetRange(0, chunkSize);
                chunkList.RemoveRange(0, chunkSize);
            }

            yield return chunkList;
        }

        public static IEnumerable<T> Shuffle<T>(this IEnumerable<T> enumerable)
        {
            var r = new Random();
            return enumerable.OrderBy(x => r.Next()).ToList();
        }
    }
}