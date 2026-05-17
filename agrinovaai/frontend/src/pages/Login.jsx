import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogIn, Sprout } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "farmer@agrinova.ai", password: "password123" });
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Create an account or check credentials.");
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-4 py-10">
      <motion.form onSubmit={submit} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glass premium-border w-full max-w-md rounded-3xl p-7">
        <Link to="/" className="mb-7 flex items-center gap-3 font-display text-2xl font-bold"><Sprout className="text-nova-300" /> AgriNova AI</Link>
        <h1 className="font-display text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-white/58">Log in to access crop scans, weather intelligence, and farmer insights.</p>
        {error && <p className="mt-4 rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-100">{error}</p>}
        <label className="mt-6 block text-sm text-white/70">Email</label>
        <input className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none focus:border-nova-300" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" required />
        <label className="mt-4 block text-sm text-white/70">Password</label>
        <input className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none focus:border-nova-300" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" required />
        <button disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-nova-400 px-4 py-3 font-bold text-nova-950 disabled:opacity-60"><LogIn size={18} /> {loading ? "Signing in..." : "Login"}</button>
        <p className="mt-5 text-center text-sm text-white/55">New here? <Link className="font-semibold text-nova-200" to="/signup">Create account</Link></p>
      </motion.form>
    </div>
  );
}
