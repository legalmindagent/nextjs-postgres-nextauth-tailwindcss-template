import { Phone } from 'lucide-react';

export default function CallsPage() {
    return (
          <div className="space-y-8">
                <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Call Logs</h1>
                        <p className="text-zinc-500 mt-1">View all incoming calls handled by your AI receptionist</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="glass-card rounded-2xl p-5"><p className="text-zinc-500 text-sm">Total Calls</p><p className="text-2xl font-bold text-white mt-1">0</p></div>
                        <div className="glass-card rounded-2xl p-5"><p className="text-zinc-500 text-sm">Answered</p><p className="text-2xl font-bold text-green-400 mt-1">0</p></div>
                        <div className="glass-card rounded-2xl p-5"><p className="text-zinc-500 text-sm">Missed</p><p className="text-2xl font-bold text-red-400 mt-1">0</p></div>
                        <div className="glass-card rounded-2xl p-5"><p className="text-zinc-500 text-sm">Avg Duration</p><p className="text-2xl font-bold text-white mt-1">--</p></div>
                </div>
                <div className="glass-card rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-white/10 flex items-center justify-between">
                                  <h2 className="text-lg font-semibold text-white">All Calls</h2>
                                  <select className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none">
                                              <option>Last 7 days</option><option>Last 30 days</option><option>All time</option>
                                  </select>
                        </div>
                        <div className="px-4 py-3 grid grid-cols-6 text-xs text-zinc-500 font-medium uppercase tracking-wider border-b border-white/5">
                                  <span>Status</span><span>Caller</span><span>Industry</span><span>Duration</span><span>Time</span><span>Actions</span>
                        </div>
                        <div className="text-center py-16">
                                  <Phone className="h-16 w-16 text-zinc-800 mx-auto mb-4" />
                                  <p className="text-zinc-500 text-lg">No calls yet</p>
                                  <p className="text-zinc-600 text-sm mt-2">When someone calls (423) 556-3838, call logs will appear here</p>
                        </div>
                </div>
          </div>
        );
}</div>
