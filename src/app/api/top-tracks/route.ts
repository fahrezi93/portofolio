import { getTopTracks } from '@/lib/lastfm';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Force dynamic for real-time data or let it cache if preferred

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limitParam = searchParams.get('limit') || '10';
        const limit = parseInt(limitParam, 10);

        // Fetch top tracks for the last month
        const data = await getTopTracks('1month', limit);
        const topTracksApi = data?.toptracks?.track || [];

        const formattedTracks = topTracksApi.map((track: any) => {
            const artistName = track.artist?.name || track.artist?.['#text'];

            // Get highest resolution image available
            let albumArt = track.image?.find((img: any) => img.size === 'extralarge')?.['#text'] ||
                track.image?.find((img: any) => img.size === 'large')?.['#text'] || '';

            // Filter out Last.fm default placeholder (star image)
            if (albumArt.includes('2a96cbd8b46e442fc41c2b')) {
                albumArt = '';
            }

            return {
                artist: artistName,
                songUrl: `https://open.spotify.com/search/${encodeURIComponent(`${artistName} ${track.name}`)}`,
                title: track.name,
                albumArt: albumArt,
                playcount: track.playcount || '0'
            };
        });

        return NextResponse.json({
            topTracks: formattedTracks
        }, {
            headers: {
                // Cache for 1 hour since top tracks don't change as rapidly as now playing
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
            }
        });
    } catch (error) {
        console.error('Error fetching Last.fm top tracks:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
