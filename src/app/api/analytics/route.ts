import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

export async function GET() {
  const propertyId = process.env.GA_PROPERTY_ID;
  const clientEmail = process.env.GA_CLIENT_EMAIL;
  // Handle newline characters in the private key from env variables
  const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!propertyId || !clientEmail || !privateKey) {
    return NextResponse.json({ 
      error: 'Google Analytics credentials not configured. Please check your environment variables.' 
    }, { status: 500 });
  }

  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
  });

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      metrics: [
        {
          name: 'screenPageViews',
        },
        {
          name: 'engagementRate',
        },
      ],
    });

    const rows = response.rows;
    if (rows && rows.length > 0) {
      const pageViews = rows[0].metricValues?.[0]?.value || '0';
      const engagementRate = rows[0].metricValues?.[1]?.value || '0';
      
      // Convert engagementRate to percentage string
      const engagementPercentage = (parseFloat(engagementRate) * 100).toFixed(1) + '%';

      return NextResponse.json({
        success: true,
        data: {
          pageViews,
          engagementRate: engagementPercentage,
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        pageViews: '0',
        engagementRate: '0%',
      }
    });

  } catch (error: any) {
    console.error('Error fetching analytics data:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
