import { getTopTracks } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    try {
        const response = await getTopTracks();

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch tracks' }, { status: response.status });
        }

        const { items } = await response.json();

        const tracks = items.slice(0, 5).map((track: any) => ({
            artist: track.artists.map((_artist: any) => _artist.name).join(', '),
            songUrl: track.external_urls.spotify,
            title: track.name,
            albumArt: track.album.images[0].url
        }));

        return NextResponse.json({ tracks }, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800'
            }
        });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
