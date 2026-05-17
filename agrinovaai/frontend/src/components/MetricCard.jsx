import { motion } from "framer-motion";

export default function MetricCard({ icon: Icon, label, value, note }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="glass premium-border rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-white/55">{label}</p>
          <p className="mt-2 font-display text-3xl font-bold">{value}</p>
          <p className="mt-2 text-xs text-nova-200">{note}</p>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-nova-400/15 text-nova-200">{Icon && <Icon size={22} />}</div>
      </div>
    </motion.div>
  );
}
