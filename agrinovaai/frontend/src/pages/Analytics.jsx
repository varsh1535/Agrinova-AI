import { useEffect, useState } from "react";
import { Activity, AlertCircle, BarChart3, Leaf, Users } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import AppShell from "../components/AppShell";
import MetricCard from "../components/MetricCard";
import { api } from "../lib/api";

const colors = ["#31d972", "#facc15", "#fb7185", "#60a5fa"];

export default function Analytics() {
  const [data, setData] = useState(null);
  useEffect(() => { api.get("/dashboard/overview").then(({ data }) => setData(data)).catch(() => {}); }, []);
  const kpis = data?.kpis || { cropHealth: 84, activeFarmers: 1240, aiPredictions: 3918, riskReduction: 31 };

  return (
    <AppShell>
      <h1 className="font-display text-4xl font-bold">Analytics Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={Leaf} label="Crop Health" value={`${kpis.cropHealth}%`} note="Region weighted score" />
        <MetricCard icon={Users} label="Farmers" value={kpis.activeFarmers} note="Active this month" />
        <MetricCard icon={Activity} label="AI Predictions" value={kpis.aiPredictions} note="Disease scans processed" />
        <MetricCard icon={AlertCircle} label="Risk Reduced" value={`${kpis.riskReduction}%`} note="Projected loss reduction" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel title="Yield Prediction vs Risk">
          <ResponsiveContainer width="100%" height={300}><AreaChart data={data?.yieldTrend || []}><defs><linearGradient id="yield" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#31d972" stopOpacity={0.65}/><stop offset="95%" stopColor="#31d972" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="rgba(255,255,255,0.08)" /><XAxis dataKey="month" stroke="#ffffff70" /><YAxis stroke="#ffffff70" /><Tooltip contentStyle={{ background: "#061f15", border: "1px solid rgba(255,255,255,.12)" }} /><Area type="monotone" dataKey="yield" stroke="#31d972" fill="url(#yield)" /><Area type="monotone" dataKey="risk" stroke="#fb7185" fill="transparent" /></AreaChart></ResponsiveContainer>
        </Panel>
        <Panel title="Disease Analytics">
          <ResponsiveContainer width="100%" height={300}><BarChart data={data?.diseaseAnalytics || []}><CartesianGrid stroke="rgba(255,255,255,0.08)" /><XAxis dataKey="_id" stroke="#ffffff70" tick={{ fontSize: 11 }} /><YAxis stroke="#ffffff70" /><Tooltip contentStyle={{ background: "#061f15", border: "1px solid rgba(255,255,255,.12)" }} /><Bar dataKey="count" fill="#31d972" radius={[8,8,0,0]} /></BarChart></ResponsiveContainer>
        </Panel>
        <Panel title="Severity Mix">
          <ResponsiveContainer width="100%" height={280}><PieChart><Pie data={data?.severityMix || []} dataKey="value" nameKey="_id" outerRadius={100} label>{(data?.severityMix || []).map((_, index) => <Cell key={index} fill={colors[index % colors.length]} />)}</Pie><Tooltip contentStyle={{ background: "#061f15", border: "1px solid rgba(255,255,255,.12)" }} /></PieChart></ResponsiveContainer>
        </Panel>
        <Panel title="Disease Heatmap">
          <div className="grid gap-3">{(data?.heatmap || []).map((item) => <div key={item.region} className="rounded-2xl bg-white/10 p-4"><div className="flex justify-between"><b>{item.region}</b><span>{item.risk}% risk</span></div><div className="mt-3 h-3 rounded-full bg-white/10"><div className="h-3 rounded-full bg-nova-400" style={{ width: `${item.risk}%` }} /></div><p className="mt-2 text-sm text-white/50">{item.crop}</p></div>)}</div>
        </Panel>
      </div>
    </AppShell>
  );
}

function Panel({ title, children }) {
  return <section className="glass rounded-3xl p-6"><div className="mb-5 flex items-center gap-2"><BarChart3 className="text-nova-300" size={20} /><h2 className="font-display text-xl font-bold">{title}</h2></div>{children}</section>;
}
