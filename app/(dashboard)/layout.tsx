import Link from 'next/link';
import { Home, Phone, Settings, BarChart3, Mic, Bot } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import Providers from './providers';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
          <Providers>
                <main className="flex min-h-screen w-full bg-[#111111]">
                        <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r border-white/10 bg-black sm:flex">
                                  <nav className="flex flex-col items-center gap-6 px-2 py-6">
                                              <Link href="/" className="group flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-lg">V</Link>
                                              <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-all" title="Dashboard"><Home className="h-5 w-5" /></Link>
                                              <Link href="/calls" className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-all" title="Call Logs"><Phone className="h-5 w-5" /></Link>
                                              <Link href="/analytics" className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-all" title="Analytics"><BarChart3 className="h-5 w-5" /></Link>
                                              <Link href="/voice-settings" className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-all" title="Voice Agent"><Mic className="h-5 w-5" /></Link>
                                               <Link href="/agent" className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 hover:text-sky-400 hover:bg-sky-400/10 transition-all" title="JARVIS Agent"><Bot className="h-5 w-5" /></Link>
                                  </nav>
                                  <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-6">
                                              <Link href="/settings" className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-all" title="Settings"><Settings className="h-5 w-5" /></Link>
                                  </nav>
                        </aside>
                        <div className="flex flex-1 flex-col sm:pl-16">
                                  <main className="flex-1 p-6">{children}</main>
                        </div>
                        <Analytics />
                </main>
          </Providers>
        );
}</Providers>
