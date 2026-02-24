import { getRecentTracks } from '@/lib/lastfm';
import { NextResponse } from 'next/server';

// export const runtime = 'edge'; // Optional: Use edge if compatible, otherwise default to node
export const dynamic = 'force-dynamic'; // Force dynamic for real-time data

export async function GET() {
    try {
        const data = await getRecentTracks(6); // Fetch 6 tracks (1 now playing + 5 history)
        const recentTracks = data?.recenttracks?.track || [];

        // Process Now Playing is the first track
        const firstTrack = recentTracks[0];
        const isPlaying = firstTrack?.['@attr']?.nowplaying === 'true';

        const artistName = firstTrack?.artist?.['#text'] || firstTrack?.artist?.name;
        const nowEnded = {
            isPlaying,
            artist: artistName,
            songUrl: `https://open.spotify.com/search/${encodeURIComponent(`${artistName} ${firstTrack?.name}`)}`,
            title: firstTrack?.name,
            albumArt: firstTrack?.image?.find((img: any) => img.size === 'large')?.['#text'] || '',
        };

        // Process History (slice differently depending on if playing)
        // If playing, track[0] is current. play history is [1..5]
        // If not playing, track[0] is last played. play history is [0..4] or [1..5]? 
        // Usually recenttracks includes the current playing one as the first item.
        // We want to show the *previous* songs in the list.
        // So we take tracks 1 to 5.
        const historyTracks = recentTracks.slice(1, 6).map((track: any) => {
            const artistName = track.artist['#text'] || track.artist.name;
            return {
                artist: artistName,
                songUrl: `https://open.spotify.com/search/${encodeURIComponent(`${artistName} ${track.name}`)}`,
                title: track.name,
                albumArt: track.image.find((img: any) => img.size === 'large')?.['#text'] || '',
                playcount: '0' // Not available in recent tracks
            };
        });

        return NextResponse.json({
            nowPlaying: nowEnded,
            recentTracks: historyTracks
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=0, no-store'
            }
        });
    } catch (error) {
        console.error('Error fetching Last.fm data:', error);
        // Debugging: Check if keys are loaded
        if (!process.env.LASTFM_API_KEY) console.error("LASTFM_API_KEY is missing!");
        if (!process.env.NEXT_PUBLIC_LASTFM_USERNAME) console.error("NEXT_PUBLIC_LASTFM_USERNAME is missing!");

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
