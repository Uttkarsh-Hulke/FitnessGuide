import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  TrendingUp, 
  Plus, 
  RefreshCw,
  History
} from 'lucide-react';
import LogMetricModal from './LogMetricModal';
import { getProgressLogs, getAssessmentHistory } from '../../services/api';

export default function ProgressTrackerView({ currentScore = 75, onSelectAssessment }) {
  const [logs, setLogs] = useState([]);
  const [assessmentHistory, setAssessmentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMetricTab, setActiveMetricTab] = useState('weight');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [logsData, historyData] = await Promise.all([
        getProgressLogs(),
        getAssessmentHistory()
      ]);
      setLogs(logsData || []);
      setAssessmentHistory(historyData || []);
    } catch (err) {
      console.warn('Error fetching progress data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNewLogAdded = (newLog) => {
    setLogs((prev) => [...prev, newLog]);
  };

  const chartData = logs.map((log) => {
    const d = new Date(log.date);
    const dateLabel = isNaN(d) ? 'Recent' : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return {
      date: dateLabel,
      weight: log.weightKg,
      score: log.wellnessScore || currentScore,
      exerciseMins: log.exerciseMinutes || 0,
      sleep: log.sleepHours || 7,
      water: log.waterIntakeLiters || 2
    };
  });

  return (
    <div className="space-y-6">
      
      {/* Top Action Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors duration-200 animate-reveal">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Progress & Analytics</h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track weight trends and adherence over time.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={fetchData}
            title="Refresh logs"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-200" />
            <span>Record Today's Entry</span>
          </button>
        </div>
      </div>

      {/* Interactive Charts Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6 transition-colors duration-200 animate-reveal">
        
        {/* Metric Selector Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveMetricTab('weight')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeMetricTab === 'weight'
                  ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Weight (kg)
            </button>

            <button
              onClick={() => setActiveMetricTab('wellness')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeMetricTab === 'wellness'
                  ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Wellness Score
            </button>

            <button
              onClick={() => setActiveMetricTab('exercise')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeMetricTab === 'exercise'
                  ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Exercise (min)
            </button>

            <button
              onClick={() => setActiveMetricTab('sleep')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeMetricTab === 'sleep'
                  ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Sleep (hours)
            </button>
          </div>

          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {chartData.length} records plotted
          </span>
        </div>

        {/* Recharts Canvas */}
        <div className="h-72 w-full pt-2">
          {chartData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-slate-400">
              No progress logs recorded yet. Click "Record Today's Entry" above to add your first data point.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              {activeMetricTab === 'weight' ? (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e120" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} domain={['auto', 'auto']} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#f8fafc' }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    name="Weight (kg)" 
                    stroke="#059669" 
                    strokeWidth={2.5} 
                    dot={{ r: 4, fill: '#059669' }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              ) : activeMetricTab === 'wellness' ? (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e120" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} domain={[40, 100]} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#f8fafc' }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    name="Wellness Score" 
                    stroke="#0d9488" 
                    strokeWidth={2.5} 
                    dot={{ r: 4, fill: '#0d9488' }} 
                  />
                </LineChart>
              ) : activeMetricTab === 'exercise' ? (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e120" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#f8fafc' }} 
                  />
                  <Bar 
                    dataKey="exerciseMins" 
                    name="Exercise (Minutes)" 
                    fill="#10b981" 
                    radius={[6, 6, 0, 0]} 
                  />
                </BarChart>
              ) : (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e120" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} domain={[4, 12]} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#f8fafc' }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sleep" 
                    name="Sleep (Hours)" 
                    stroke="#6366f1" 
                    strokeWidth={2.5} 
                    dot={{ r: 4, fill: '#6366f1' }} 
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Historical Assessments Section */}
      {assessmentHistory.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4 transition-colors duration-200 animate-reveal">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Assessment History</h3>
            </div>
            <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {assessmentHistory.length} Saved Profiles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {assessmentHistory.map((a, idx) => {
              const d = new Date(a.createdAt);
              return (
                <div
                  key={a._id || idx}
                  className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all flex flex-col justify-between space-y-2.5 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-base">{a.name}</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 text-sm">
                      Score: {a.wellnessScore?.totalScore || 75}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 font-medium">Goal: {a.primaryGoal}</p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-400">
                    <span>{isNaN(d) ? 'Recent' : d.toLocaleDateString()}</span>
                    {onSelectAssessment && (
                      <button
                        onClick={() => onSelectAssessment(a._id)}
                        className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        View Plan →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Log History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4 transition-colors duration-200 animate-reveal">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Recorded Daily Log Entries</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Weight</th>
                <th className="py-3 px-4">Exercise</th>
                <th className="py-3 px-4">Water</th>
                <th className="py-3 px-4">Sleep</th>
                <th className="py-3 px-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {logs.slice(-10).reverse().map((log, idx) => {
                const d = new Date(log.date);
                return (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      {isNaN(d) ? 'Today' : d.toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{log.weightKg} kg</td>
                    <td className="py-3 px-4 font-medium">
                      {log.exerciseMinutes > 0 ? `${log.exerciseMinutes} min (${log.exerciseType})` : 'Rest Day'}
                    </td>
                    <td className="py-3 px-4 font-medium">{log.waterIntakeLiters} L</td>
                    <td className="py-3 px-4 font-medium">{log.sleepHours} hrs</td>
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400 italic">{log.notes || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <LogMetricModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogged={handleNewLogAdded}
        defaultScore={currentScore}
      />

    </div>
  );
}
