import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
    title: 'VoiceAgent AI - Command Center',
    description: 'AI-powered voice receptionist dashboard for small businesses.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
          <html lang="en" className="dark">
                <body className="flex min-h-screen w-full flex-col bg-[#111111]">{children}</body>
                <Analytics />
          </html>
        );
}</html>
