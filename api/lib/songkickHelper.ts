import axios from 'axios';

import { ISongkickCalendarResponse, ISongkickCalendarEntry } from "./models/ISongkickCalendarResponse";

const apiKey = process.env.SONGKICK_API_KEY;

const axiosInstance = axios.create({
    baseURL: 'https://api.songkick.com/api/3.0'
})

export const getUserCalendar = async (username: string): Promise<ISongkickCalendarEntry[]> => {
    const response = await axiosInstance.get<ISongkickCalendarResponse>(`/users/${username}/calendar.json`, {
        params: {
            apikey: apiKey,
            username,
            reason: 'attendance',
            per_page: 50
        }
    });

    return response.data.resultsPage.results.calendarEntry;
}