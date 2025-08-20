import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/language-context";

export const metadata: Metadata = {
  title: 'Mohammad Fahrezi - Front-End Developer & UI/UX Designer',
  description: 'Passionate Computer Science student at Sriwijaya University specializing in Front-End Development and UI/UX Design. Creating modern, intuitive web applications with cutting-edge technologies.',
  keywords: ['Mohammad Fahrezi', 'Front-End Developer', 'UI/UX Designer', 'React', 'Next.js', 'TypeScript', 'Web Developer', 'Sriwijaya University', 'Portfolio'],
  authors: [{ name: 'Mohammad Fahrezi' }],
  creator: 'Mohammad Fahrezi',
  publisher: 'Mohammad Fahrezi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fahrezi-portofolio.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fahrezi-portofolio.vercel.app',
    title: 'Mohammad Fahrezi - Front-End Developer & UI/UX Designer',
    description: 'Passionate Computer Science student at Sriwijaya University specializing in Front-End Development and UI/UX Design. Creating modern, intuitive web applications with cutting-edge technologies.',
    siteName: 'Mohammad Fahrezi Portfolio',
    images: [
      {
        url: '/images/fahrezi_white_logo.png',
        width: 1200,
        height: 630,
        alt: 'Mohammad Fahrezi - Front-End Developer & UI/UX Designer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammad Fahrezi - Front-End Developer & UI/UX Designer',
    description: 'Passionate Computer Science student specializing in Front-End Development and UI/UX Design.',
    images: ['/images/fahrezi_white_logo.png'],
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
  verification: {
    google: 'your-google-verification-code',
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/fahrezi_white_logo.png" />
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
              "jobTitle": "Front-End Developer & UI/UX Designer",
              "description": "Passionate Computer Science student at Sriwijaya University specializing in Front-End Development and UI/UX Design",
              "url": "https://fahrezi-portfolio.netlify.app",
              "sameAs": [
                "https://github.com/fahrezi93",
                "https://linkedin.com/in/fahrezi93"
              ],
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Sriwijaya University"
              },
              "knowsAbout": [
                "Front-End Development",
                "UI/UX Design",
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Web Development"
              ]
            })
          }}
        />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Toaster />
      </body>
    </html>
  );
}