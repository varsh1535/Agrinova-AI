import { Link, NavLink, useNavigate } from "react-router-dom";
import { BarChart3, Bot, Camera, Home, LogOut, MessageSquare, Sprout } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const nav = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/scan", label: "Scan", icon: Camera },
  { to: "/voice", label: "Voice AI", icon: Bot },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/community", label: "Community", icon: MessageSquare },
];

export default function AppShell({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <aside className="fixed left-0 top-0 z-30 hidden h-full w-72 border-r border-white/10 bg-[#03190f]/85 px-5 py-6 backdrop-blur-2xl lg:block">
        <Link to="/dashboard" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-nova-400 text-nova-950 shadow-glow"><Sprout /></span>
          <div>
            <p className="font-display text-xl font-bold">AgriNova AI</p>
            <p className="text-xs text-white/50">Precision intelligence</p>
          </div>
        </Link>
        <nav className="mt-10 space-y-2">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${isActive ? "bg-nova-400 text-nova-950" : "text-white/70 hover:bg-white/10 hover:text-white"}`
              }
            >
              <item.icon size={18} /> {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="absolute bottom-6 left-5 right-5 flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/70 transition hover:bg-white/10"
        >
          <LogOut size={17} /> Logout
        </button>
      </aside>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#03190f]/80 px-4 py-3 backdrop-blur-2xl lg:ml-72">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="font-display text-lg font-bold lg:hidden">AgriNova AI</Link>
          <div className="hidden text-sm text-white/60 lg:block">Regional farming command center</div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs capitalize text-white/50">{user?.role} · {user?.region}</p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-nova-400 font-bold text-nova-950">{user?.name?.[0] || "A"}</div>
          </div>
        </div>
        <nav className="mt-3 flex gap-2 overflow-x-auto lg:hidden">
          {nav.map((item) => <NavLink key={item.to} to={item.to} className="shrink-0 rounded-full bg-white/10 px-3 py-2 text-xs text-white/80">{item.label}</NavLink>)}
        </nav>
      </header>

      <main className="px-4 py-6 lg:ml-72 lg:px-8">{children}</main>
    </div>
  );
}
