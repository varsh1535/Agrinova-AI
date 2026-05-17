import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, CloudSun, LineChart, Mic, ShieldCheck, Sprout } from "lucide-react";

const features = [
  { icon: Bot, title: "AI Disease Detection", text: "Crop scans return disease, confidence, severity, and treatment guidance." },
  { icon: Mic, title: "Multilingual Voice", text: "Kannada, Hindi, and English guidance for hands-free field support." },
  { icon: CloudSun, title: "Weather Intelligence", text: "Live weather, rainfall risk, and crop-specific farming advice." },
  { icon: LineChart, title: "Yield Analytics", text: "Admin dashboards expose disease trends, activity, and risk hotspots." },
  { icon: ShieldCheck, title: "Secure Platform", text: "JWT authentication, encrypted passwords, role-aware workflows." },
  { icon: Sprout, title: "Input Recommendations", text: "Fertilizer, seed, pesticide, and prevention actions after every scan." },
];

export default function Landing() {
  return (
    <div className="overflow-hidden">
      <nav className="fixed left-1/2 top-4 z-40 flex w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-2xl">
        <a href="#home" className="flex items-center gap-2 font-display font-bold"><Sprout className="text-nova-400" /> AgriNova AI</a>
        <div className="hidden items-center gap-6 text-sm text-white/75 md:flex">
          <a href="#home">Home</a><a href="#features">Features</a><Link to="/analytics">Dashboard</Link><Link to="/community">Community</Link><Link to="/login">Login</Link>
        </div>
        <Link to="/signup" className="rounded-full bg-nova-400 px-4 py-2 text-sm font-bold text-nova-950">Get Started</Link>
      </nav>

      <section id="home" className="relative min-h-screen">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80">
          <source src="https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-[#03190f]/70 to-[#03190f]" />
        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 pt-28">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-nova-400/40 bg-nova-400/10 px-4 py-2 text-sm text-nova-200">AI-powered precision agriculture ecosystem</p>
            <h1 className="font-display text-6xl font-extrabold leading-tight md:text-8xl">AgriNova AI</h1>
            <p className="mt-4 font-display text-3xl font-bold text-nova-200 md:text-5xl">Scan. Predict. Grow.</p>
            <p className="mt-6 max-w-2xl text-lg text-white/72">A venture-grade regional farming platform that combines crop disease vision AI, weather intelligence, voice guidance, market data, and community knowledge.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-nova-400 px-6 py-3 font-bold text-nova-950 shadow-glow">Get Started <ArrowRight size={18} /></Link>
              <a href="#features" className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white/80 hover:bg-white/10">Explore Platform</a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-nova-300">Product modules</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Built for the field and the control room</h2>
          </div>
          <p className="max-w-lg text-white/58">Every screen is designed for repeated use by farmers, agronomists, and regional admins.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="glass rounded-2xl p-6">
              <feature.icon className="text-nova-300" />
              <h3 className="mt-5 font-display text-xl font-bold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/58">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:grid-cols-3">
        {[["31%", "Crop loss reduction"], ["18K+", "Farmers supported"], ["2.4M", "AI predictions simulated"]].map(([value, label]) => (
          <div key={label} className="glass rounded-2xl p-8 text-center">
            <p className="font-display text-5xl font-bold text-nova-200">{value}</p>
            <p className="mt-3 text-white/60">{label}</p>
          </div>
        ))}
      </section>

      <footer className="mx-auto max-w-6xl px-4 py-12 text-sm text-white/50">
        <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p>© 2026 AgriNova AI. Precision agriculture for resilient regions.</p>
          <div className="flex gap-4"><a>LinkedIn</a><a>X</a><a>GitHub</a><a>Community</a></div>
        </div>
      </footer>
    </div>
  );
}
