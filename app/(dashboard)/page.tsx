import { Phone, PhoneIncoming, Clock, Zap, Mic } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
    return (
          <div className="space-y-8">
                <div className="flex items-center justify-between">
                        <div>
                                  <h1 className="text-3xl font-bold tracking-tight text-white">Voice Agent Command Center</h1>h1>
                                  <p className="text-zinc-500 mt-1">Real-time overview of your AI receptionist</p>p>
                        </div>div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
                                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                  <span className="text-green-400 text-sm font-medium">Agent Online</span>span>
                        </div>div>
                </div>div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="glass-card rounded-2xl p-6">
                                  <div className="flex items-center justify-between mb-4"><Phone className="h-5 w-5 text-red-500" /><span className="text-xs text-zinc-500">Today</span>span></div>div>
                                  <p className="text-3xl font-bold text-white">0</p>p>
                                  <p className="text-sm text-zinc-500 mt-1">Total Calls</p>p>
                        </div>div>
                        <div className="glass-card rounded-2xl p-6">
                                  <div className="flex items-center justify-between mb-4"><PhoneIncoming className="h-5 w-5 text-blue-500" /><span className="text-xs text-zinc-500">Active</span>span></div>div>
                                  <p className="text-3xl font-bold text-white">0</p>p>
                                  <p className="text-sm text-zinc-500 mt-1">Live Calls Now</p>p>
                        </div>div>
                        <div className="glass-card rounded-2xl p-6">
                                  <div className="flex items-center justify-between mb-4"><Clock className="h-5 w-5 text-amber-500" /><span className="text-xs text-zinc-500">Average</span>span></div>div>
                                  <p className="text-3xl font-bold text-white">--</p>p>
                                  <p className="text-sm text-zinc-500 mt-1">Avg Call Duration</p>p>
                        </div>div>
                        <div className="glass-card rounded-2xl p-6">
                                  <div className="flex items-center justify-between mb-4"><Zap className="h-5 w-5 text-purple-500" /><span className="text-xs text-zinc-500">Industries</span>span></div>div>
                  <p className="text-3xl font-bold text-white">10</p>p>
                                  <p className="text-sm text-zinc-500 mt-1">Active Personas</p>p>
                        </div>div>
                </div>div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
                                  <h2 className="text-lg font-semibold text-white mb-4">Recent Calls</h2>h2>
                                  <div className="text-center py-12">
                                              <Phone className="h-12 w-12 text-zinc-700 mx-auto mb-3" />
                                              <p className="text-zinc-500">No calls recorded yet</p>p>
                                              <p className="text-zinc-600 text-sm mt-1">Call (423) 556-3838 to test your AI receptionist</p>p>
                                  </div>div>
                        </div>div>
                        <div className="glass-card rounded-2xl p-6">
                                  <h2 className="text-lg font-semibold text-white mb-4">Quick Controls</h2>h2>
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                                                  <div className="flex items-center gap-3"><Mic className="h-4 w-4 text-green-500" /><span className="text-sm text-white">Voice Agent</span>span></div>div>
                                                  <div className="w-10 h-6 bg-green-500 rounded-full flex items-center justify-end px-1"><div className="w-4 h-4 bg-white rounded-full" /></div>div>
                                    </div>div>
                                              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                                                            <div className="flex items-center gap-3"><Clock className="h-4 w-4 text-amber-500" /><span className="text-sm text-white">Business Hours</span>span></div>div>
                                                            <span className="text-xs text-zinc-500">24/7</span>span>
                                              </div>div>
                                              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                                                            <div className="flex items-center gap-3"><Zap className="h-4 w-4 text-purple-500" /><span className="text-sm text-white">AI Model</span>span></div>
                                                            <span className="text-xs text-zinc-500">Gemini 2.0</span>span>
                                              </div>
                                  </div>div>
                                  <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                              <p className="text-red-400 text-sm font-medium">Phone Number</p>p>
                                              <p className="text-white text-lg font-mono mt-1">(423) 556-3838</p>
                                  </div>div>
                        </div>div>
                </div>div>
          </div>div>
        );
}</div>
