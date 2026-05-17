import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sprout, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "farmer", language: "en-IN", region: "Bengaluru Rural", crops: "Tomato, Paddy" });
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    try {
      await signup({ ...form, crops: form.crops.split(",").map((crop) => crop.trim()).filter(Boolean) });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-4 py-10">
      <motion.form onSubmit={submit} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="glass premium-border w-full max-w-2xl rounded-3xl p-7">
        <Link to="/" className="mb-7 flex items-center gap-3 font-display text-2xl font-bold"><Sprout className="text-nova-300" /> AgriNova AI</Link>
        <h1 className="font-display text-3xl font-bold">Create your farm intelligence account</h1>
        {error && <p className="mt-4 rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-100">{error}</p>}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Input label="Full name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} required />
          <Input label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required />
          <Input label="Password" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} required />
          <Input label="Region" value={form.region} onChange={(value) => setForm({ ...form, region: value })} />
          <label className="text-sm text-white/70">Role<select className="mt-2 w-full rounded-2xl border border-white/10 bg-[#082116] px-4 py-3 outline-none" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="farmer">Farmer</option><option value="admin">Admin</option></select></label>
          <label className="text-sm text-white/70">Voice language<select className="mt-2 w-full rounded-2xl border border-white/10 bg-[#082116] px-4 py-3 outline-none" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })}><option value="en-IN">English</option><option value="hi-IN">Hindi</option><option value="kn-IN">Kannada</option></select></label>
          <div className="md:col-span-2"><Input label="Crops" value={form.crops} onChange={(value) => setForm({ ...form, crops: value })} /></div>
        </div>
        <button disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-nova-400 px-4 py-3 font-bold text-nova-950 disabled:opacity-60"><UserPlus size={18} /> {loading ? "Creating..." : "Create Account"}</button>
        <p className="mt-5 text-center text-sm text-white/55">Already registered? <Link className="font-semibold text-nova-200" to="/login">Login</Link></p>
      </motion.form>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", required }) {
  return <label className="text-sm text-white/70">{label}<input className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none focus:border-nova-300" type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} /></label>;
}
