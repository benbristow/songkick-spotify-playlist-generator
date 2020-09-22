export interface ISongkickIdentifier {
    mbid: string;
    href: string;
}

export interface ISongkickArtist {
    id: number;
    displayName: string;
    uri: string;
    identifier: ISongkickIdentifier[];
}

export interface ISongkickPerformance {
    id: number;
    displayName: string;
    billing: string;
    billingIndex: number;
    artist: ISongkickArtist;
}

export interface ISongkickDateTime {
    date: string;
    datetime: Date;
    time: string;
}

export interface ISongkickCountry {
    displayName: string;
}

export interface ISongkickMetroArea {
    id: number;
    displayName: string;
    country: ISongkickCountry;
    uri: string;
}

export interface ISongkickLocation {
    city: string;
    lat: number;
    lng: number;
}

export interface ISongkickVenue {
    id: number;
    displayName: string;
    uri: string;
    metroArea: ISongkickMetroArea;
    lat: number;
    lng: number;
}

export interface ISongkickSeries {
    displayName: String;
}

export interface ISongkickEvent {
    id: number;
    displayName: string;
    type: string;
    uri: string;
    status: string;
    popularity: number;
    start: ISongkickDateTime;
    performance: ISongkickPerformance[];
    ageRestriction: unknown;
    flaggedAsEnded: boolean;
    venue: ISongkickVenue;
    location: ISongkickLocation;
    end: ISongkickDateTime;
    series: ISongkickSeries;
}

export interface ISongkickReason {
    attendance: string;
}

export interface ISongkickCalendarEntry {
    reason: ISongkickReason;
    event: ISongkickEvent;
    createdAt: Date;
}

export interface ISongkickCalendarResult {
    calendarEntry: ISongkickCalendarEntry[];
}

export interface ISongkickCalendarResultsPage {
    status: string;
    results: ISongkickCalendarResult;
}

export interface ISongkickCalendarResponse {
    resultsPage: ISongkickCalendarResultsPage;
}