import React, { useEffect, useState } from 'react';

function App() {
  const [stats, setStats] = useState({ total: 0, open: 0, investigating: 0, resolved: 0 });
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    // Fetch stats
    fetch('http://localhost:8000/api/dashboard')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));

    // Fetch incidents
    fetch('http://localhost:8000/api/incidents')
      .then(res => res.json())
      .then(data => setIncidents(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">INCIDENT DASHBOARD</h1>
          <p className="text-slate-400 mt-2">Automated CI/CD, Containerization, Kubernetes Deployment and Monitoring Platform</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg text-center transform hover:scale-105 transition">
            <h3 className="text-slate-400 font-semibold mb-2">Total</h3>
            <p className="text-4xl font-bold text-blue-400">{stats.total}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg text-center transform hover:scale-105 transition">
            <h3 className="text-slate-400 font-semibold mb-2">Open</h3>
            <p className="text-4xl font-bold text-red-400">{stats.open}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg text-center transform hover:scale-105 transition">
            <h3 className="text-slate-400 font-semibold mb-2">Investigating</h3>
            <p className="text-4xl font-bold text-yellow-400">{stats.investigating}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg text-center transform hover:scale-105 transition">
            <h3 className="text-slate-400 font-semibold mb-2">Resolved</h3>
            <p className="text-4xl font-bold text-green-400">{stats.resolved}</p>
          </div>
        </div>

        {/* Incidents List */}
        <div>
          <h2 className="text-2xl font-bold mb-6 border-b border-slate-700 pb-2">Recent Incidents</h2>
          <div className="space-y-4">
            {incidents.map((inc: any) => (
              <div key={inc.id} className="bg-slate-800 p-5 rounded-lg border border-slate-700 flex justify-between items-center shadow-md">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 text-xs font-bold rounded-md ${
                      inc.priority === 'CRITICAL' ? 'bg-red-900 text-red-300' :
                      inc.priority === 'HIGH' ? 'bg-orange-900 text-orange-300' :
                      'bg-blue-900 text-blue-300'
                    }`}>
                      {inc.priority}
                    </span>
                    <h4 className="text-lg font-semibold">{inc.title}</h4>
                  </div>
                  <p className="text-slate-400 text-sm">{inc.description}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${
                    inc.status === 'INVESTIGATING' ? 'border-yellow-500 text-yellow-500' :
                    inc.status === 'OPEN' ? 'border-red-500 text-red-500' :
                    'border-green-500 text-green-500'
                  }`}>
                    {inc.status}
                  </span>
                  <div className="mt-2 text-xs text-slate-500">{inc.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
