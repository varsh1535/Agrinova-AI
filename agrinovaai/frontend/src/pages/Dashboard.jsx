import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Bot, CloudSun, Coins, FileText, MessageSquare, ScanLine, Sprout } from "lucide-react";
import AppShell from "../components/AppShell";
import MetricCard from "../components/MetricCard";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

const actions = [
  { to: "/scan", title: "Scan Crop", icon: ScanLine, text: "Upload or capture crop image" },
  { to: "/voice", title: "Voice AI", icon: Bot, text: "Ask in Kannada, Hindi, English" },
  { to: "/dashboard", title: "Mandi Prices", icon: Coins, text: "Regional market movement" },
  { to: "/dashboard", title: "Weather Alerts", icon: AlertTriangle, text: "Rainfall and spray windows" },
  { to: "/dashboard", title: "Govt Schemes", icon: FileText, text: "Subsidy and insurance guidance" },
  { to: "/community", title: "Community", icon: MessageSquare, text: "Share tips with farmers" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [weather, setWeather] = useState(null);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    api.get("/intelligence/weather").then(({ data }) => setWeather(data.weather)).catch(() => {});
    api.get("/intelligence/market").then(({ data }) => setPrices(data.prices)).catch(() => {});
  }, []);

  return (
    <AppShell>
      <section className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-7">
          <p className="text-sm uppercase tracking-[0.24em] text-nova-300">Good morning</p>
          <h1 className="mt-3 font-display text-4xl font-bold">Hi {user?.name?.split(" ")[0] || "Farmer"}, your fields look ready for action.</h1>
          <p className="mt-4 max-w-2xl text-white/60">AgriNova is monitoring disease pressure, rainfall probability, market price changes, and community reports across your region.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <MetricCard icon={Sprout} label="Crop Health" value="84%" note="Stable this week" />
            <MetricCard icon={ScanLine} label="AI Scans" value="128" note="22 high-confidence alerts" />
            <MetricCard icon={CloudSun} label="Rain Risk" value={`${weather?.rainfallChance || 42}%`} note={weather?.condition || "Partly cloudy"} />
          </div>
        </motion.div>

        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between"><h2 className="font-display text-2xl font-bold">Weather</h2><CloudSun className="text-nova-200" /></div>
          <p className="mt-6 font-display text-6xl font-bold">{weather?.temperature || 27}°C</p>
          <p className="mt-2 capitalize text-white/65">{weather?.city || "Bengaluru"} · {weather?.condition || "Partly cloudy"}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-white/10 p-4">Humidity<br /><b>{weather?.humidity || 68}%</b></div>
            <div className="rounded-2xl bg-white/10 p-4">Wind<br /><b>{weather?.wind || 11} km/h</b></div>
          </div>
          <p className="mt-5 rounded-2xl bg-nova-400/10 p-4 text-sm text-nova-100">{weather?.advisory}</p>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((action, index) => (
          <motion.div key={action.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
            <Link to={action.to} className="glass block rounded-2xl p-5 transition hover:-translate-y-1 hover:border-nova-300/30">
              <action.icon className="text-nova-300" />
              <h3 className="mt-5 font-display text-xl font-bold">{action.title}</h3>
              <p className="mt-2 text-sm text-white/55">{action.text}</p>
            </Link>
          </motion.div>
        ))}
      </section>

      <section className="mt-6 glass rounded-3xl p-6">
        <h2 className="font-display text-2xl font-bold">Live Mandi Prices</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {prices.map((item) => (
            <div key={item.crop} className="rounded-2xl bg-white/10 p-4">
              <p className="font-semibold">{item.crop}</p>
              <p className="mt-1 text-xs text-white/50">{item.mandi}</p>
              <p className="mt-3 text-2xl font-bold">₹{item.price}</p>
              <p className={`text-sm ${item.trend.startsWith("+") ? "text-nova-200" : "text-red-200"}`}>{item.trend}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
