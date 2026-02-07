import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from "next/font/google";
import './globals.css';
import { AdminProvider } from "@/context/admin-context";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/language-context";
import { LoadingProvider } from "@/context/loading-context";
import AppLoading from "@/components/app-loading";

export const metadata: Metadata = {
  title: 'Mohammad Fahrezi - Portofolio Fullstack Developer & Graphic Designer',
  description: "Mohammad Fahrezi's Portfolio. A Computer Science student at Sriwijaya University focused on Fullstack Development and Graphic Design. Building modern and intuitive web applications.",
  keywords: ['Mohammad Fahrezi', 'Portfolio Mohammad Fahrezi', 'Fullstack Developer', 'Graphic Designer', 'React', 'Next.js', 'TypeScript', 'Web Developer', 'Universitas Sriwijaya', 'Portfolio Mohammad Fahrezi'],
  authors: [{ name: 'Mohammad Fahrezi' }],
  creator: 'Mohammad Fahrezi',
  publisher: 'Mohammad Fahrezi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.fahrezi.tech'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.fahrezi.tech',
    title: 'Mohammad Fahrezi - Portfolio Fullstack Developer & Graphic Designer',
    description: "Mohammad Fahrezi's Portfolio. A Computer Science student at Sriwijaya University focused on Fullstack Development and Graphic Design.",
    siteName: 'Mohammad Fahrezi Portfolio',
    images: [
      {
        url: '/images/thumbnail-porto.png',
        width: 1200,
        height: 630,
        alt: 'Mohammad Fahrezi Portfolio - Fullstack Developer & Graphic Designer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammad Fahrezi - Portfolio Fullstack Developer & Graphic Designer',
    description: "Mohammad Fahrezi's Portfolio. A Computer Science student focused on Fullstack Development and Graphic Design.",
    images: ['/images/thumbnail-porto.png'],
    creator: '@fahrezi93',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
        <meta name="google-site-verification" content="_mZK8Y9n3es-OvV7qgyAu4k7mWtxKJDJBeKQ9FOarQ0" />

        {/* Preconnect to Supabase for faster image loading */}
        <link rel="preconnect" href="https://njenjctrbcqpgeosoiob.supabase.co" />
        <link rel="dns-prefetch" href="https://njenjctrbcqpgeosoiob.supabase.co" />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PMN9QPFH');
            `,
          }}
        />

        {/* Google Analytics (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TYY6QMXHLF"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TYY6QMXHLF');
            `,
          }}
        />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/thumbnail-porto.png" />
        <meta property="og:image" content="/images/thumbnail-porto.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:image" content="/images/thumbnail-porto.png" />
        <meta name="twitter:image:alt" content="Mohammad Fahrezi Portofolio - Front-End Developer & Graphic Designer" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Mohammad Fahrezi",
                "jobTitle": "Fullstack Developer & Graphic Designer",
                "description": "Mohammad Fahrezi's Portfolio. A Computer Science student at Sriwijaya University focused on Fullstack Development and Graphic Design",
                "url": "https://www.fahrezi.tech",
                "sameAs": [
                  "https://github.com/fahrezi93",
                  "https://linkedin.com/in/mohammad-fahrezi",
                  "https://instagram.com/moh.fahrezi"
                ],
                "alumniOf": {
                  "@type": "EducationalOrganization",
                  "name": "Sriwijaya University"
                },
                "knowsAbout": [
                  "Fullstack Development",
                  "Graphic Design",
                  "React",
                  "Next.js",
                  "TypeScript",
                  "JavaScript",
                  "HTML",
                  "CSS",
                  "Node.js",
                  "Express.js",
                  "Python",
                  "Git",
                  "Figma",
                  "Web Development"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Mohammad Fahrezi Portfolio",
                "url": "https://www.fahrezi.tech",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.fahrezi.tech/?s={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            ])
          }}
        />
      </head>
      <body className="font-body antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PMN9QPFH"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <AdminProvider>
          <LanguageProvider>
            <LoadingProvider>
              <AppLoading>
                {children}
              </AppLoading>
            </LoadingProvider>
          </LanguageProvider>
        </AdminProvider>
        <Toaster />
      </body>
    </html>
  );
}