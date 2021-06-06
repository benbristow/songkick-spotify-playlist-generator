using System;
using System.Collections.Generic;

namespace SongkickSpotifyPlaylistGenerator.Services.Inner.Responses
{
    public class SongkickCalendarResponse
    {
        public ResultsPage ResultsPage { get; set; }
    }

    public class ResultsPage
    {
        public string Status { get; set; }
        public Results Results { get; set; }
        public long PerPage { get; set; }
        public long Page { get; set; }
        public long TotalEntries { get; set; }
    }

    public class Results
    {
        public List<CalendarEntry> CalendarEntry { get; set; }
    }

    public class CalendarEntry
    {
        public Reason Reason { get; set; }
        public Event Event { get; set; }
        public string CreatedAt { get; set; }
    }

    public class Event
    {
        public long Id { get; set; }
        public string DisplayName { get; set; }
        public string Type { get; set; }
        public Uri Uri { get; set; }
        public string Status { get; set; }
        public double Popularity { get; set; }
        public Start Start { get; set; }
        public List<Performance> Performance { get; set; }
        public object AgeRestriction { get; set; }
        public bool FlaggedAsEnded { get; set; }
        public Venue Venue { get; set; }
        public Location Location { get; set; }
    }

    public class Location
    {
        public string City { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
    }

    public class Performance
    {
        public long Id { get; set; }
        public string DisplayName { get; set; }
        public string Billing { get; set; }
        public long BillingIndex { get; set; }
        public MetroArea Artist { get; set; }
    }

    public class MetroArea
    {
        public long Id { get; set; }
        public string DisplayName { get; set; }
        public Uri Uri { get; set; }
        public List<Identifier> Identifier { get; set; }
        public Country Country { get; set; }
    }

    public class Country
    {
        public string DisplayName { get; set; }
    }

    public class Identifier
    {
        public Guid Mbid { get; set; }
        public Uri Href { get; set; }
    }

    public class Start
    {
        public DateTimeOffset Date { get; set; }
        public string Datetime { get; set; }
        public DateTimeOffset Time { get; set; }
    }

    public class Venue
    {
        public long Id { get; set; }
        public string DisplayName { get; set; }
        public Uri Uri { get; set; }
        public MetroArea MetroArea { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
    }

    public class Reason
    {
        public string Attendance { get; set; }
    }
}