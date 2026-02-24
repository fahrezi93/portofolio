const API_KEY = process.env.LASTFM_API_KEY;
const USERNAME = process.env.NEXT_PUBLIC_LASTFM_USERNAME;
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

export const getRecentTracks = async (limit = 1) => {
    const query = new URLSearchParams({
        method: 'user.getrecenttracks',
        user: USERNAME as string,
        api_key: API_KEY as string,
        format: 'json',
        limit: limit.toString(),
    });

    const response = await fetch(`${BASE_URL}?${query.toString()}`, { cache: 'no-store' });
    return response.json();
};

export const getTopTracks = async (period = '1month', limit = 10) => {
    const query = new URLSearchParams({
        method: 'user.gettoptracks',
        user: USERNAME as string,
        api_key: API_KEY as string,
        format: 'json',
        period: period,
        limit: limit.toString(),
    });

    const response = await fetch(`${BASE_URL}?${query.toString()}`, { cache: 'no-store' });
    return response.json();
};
