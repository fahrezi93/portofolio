import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    const GITHUB_USERNAME = 'fahrezi93';

    try {
        // Fetch user stats
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!userRes.ok) {
            return NextResponse.json({ error: 'GitHub API error' }, { status: userRes.status });
        }

        const userData = await userRes.json();

        // Fetch repositories
        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=10`, {
            next: { revalidate: 3600 }
        });

        const reposData = await reposRes.json();

        return NextResponse.json({
            user: userData,
            repos: Array.isArray(reposData) ? reposData.slice(0, 6) : []
        });
    } catch (error) {
        console.error('GitHub API error:', error);

        // Fallback data to ensure section is never empty
        return NextResponse.json({
            user: {
                public_repos: 15,
                followers: 12,
                following: 5,
                created_at: "2022-01-01T00:00:00Z",
                bio: "Front-End Developer | UI/UX Enthusiast",
                location: "Indonesia",
                company: "Student",
                login: GITHUB_USERNAME
            },
            repos: []
        });
    }
}
