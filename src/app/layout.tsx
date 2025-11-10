import type {Metadata} from 'next';
import { Plus_Jakarta_Sans } from "next/font/google";
import './globals.css';
import { AdminProvider } from "@/context/admin-context";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/language-context";
import AppLoading from "@/components/app-loading";

export const metadata: Metadata = {
  title: 'Mohammad Fahrezi - Fullstack Developer & UI/UX Designer',
  description: 'Passionate Computer Science student at Sriwijaya University specializing in Front-End Development and UI/UX Design. Creating modern, intuitive web applications with cutting-edge technologies.',
  keywords: ['Mohammad Fahrezi', 'Fullstack Developer', 'UI/UX Designer', 'React', 'Next.js', 'TypeScript', 'Web Developer', 'Sriwijaya University', 'Portfolio'],
  authors: [{ name: 'Mohammad Fahrezi' }],
  creator: 'Mohammad Fahrezi',
  publisher: 'Mohammad Fahrezi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.fahrezidev.my.id'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://www.fahrezidev.my.id',
    title: 'Mohammad Fahrezi - Fullstack Developer & UI/UX Designer',
    description: 'Passionate Computer Science student at Sriwijaya University specializing in Front-End Development and UI/UX Design. Creating modern, intuitive web applications with cutting-edge technologies.',
    siteName: 'Mohammad Fahrezi Portfolio',
    images: [
      {
        url: '/images/thumbnail-porto.png',
        width: 1200,
        height: 630,
        alt: 'Mohammad Fahrezi Portfolio - Fullstack Developer & UI/UX Designer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammad Fahrezi - Fullstack Developer & UI/UX Designer',
    description: 'Passionate Computer Science student specializing in Front-End Development and UI/UX Design.',
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Y9VMP58QGN"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Y9VMP58QGN');
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
        <meta name="twitter:image:alt" content="Mohammad Fahrezi Portfolio - Front-End Developer & UI/UX Designer" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mohammad Fahrezi",
              "jobTitle": "Fullstack Developer & UI/UX Designer",
              "description": "Passionate Computer Science student at Sriwijaya University specializing in Fullstack Development and UI/UX Design",
              "url": "https://www.fahrezidev.my.id",
              "sameAs": [
                "https://github.com/fahrezi93",
                "https://linkedin.com/in/fahrezi93",
                "https://instagram.com/moh.fahrezi"
              ],  
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Sriwijaya University"
              },
              "knowsAbout": [
                "Fullstack Development",
                "UI/UX Design",
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
            })
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
            <AppLoading>
              {children}
            </AppLoading>
          </LanguageProvider>
        </AdminProvider>
        <Toaster />
      </body>
    </html>
  );
}