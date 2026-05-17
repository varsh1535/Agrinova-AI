import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, ImagePlus, ScanLine, Sparkles } from "lucide-react";
import AppShell from "../components/AppShell";
import { api, assetUrl } from "../lib/api";

const diseaseVisuals = {
  rice: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1200&q=80",
  tomato: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1200&q=80",
  maize: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1200&q=80",
  default: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
};

const causeImages = [
  "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
];

export default function ScanCrop() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  const pickFile = (selected) => {
    const next = selected?.[0];
    if (!next) return;
    setFile(next);
    setPreview(URL.createObjectURL(next));
    setResult(null);
  };

  const submit = async () => {
    if (!file) return;
    const form = new FormData();
    form.append("image", file);
    form.append("crop", "Regional crop");
    setScanning(true);
    try {
      const { data } = await api.post("/scans", form);
      setResult(data.scan);
    } finally {
      setScanning(false);
    }
  };

  return (
    <AppShell>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="glass rounded-3xl p-6">
          <h1 className="font-display text-3xl font-bold">AI Crop Scan</h1>
          <p className="mt-2 text-white/58">
            Upload a leaf or canopy image. The AI service returns disease, confidence, severity, treatment, pesticide, seed, and prevention advice.
          </p>
          <div className="mt-6 grid min-h-[380px] place-items-center overflow-hidden rounded-3xl border border-dashed border-nova-300/40 bg-black/20 scan-grid">
            {preview ? (
              <img src={preview} alt="Selected crop" className="h-full max-h-[420px] w-full object-cover" />
            ) : (
              <div className="text-center text-white/60">
                <ImagePlus className="mx-auto mb-4 text-nova-300" size={48} />
                Drop or select crop image
              </div>
            )}
          </div>
          <input ref={inputRef} className="hidden" type="file" accept="image/*" capture="environment" onChange={(e) => pickFile(e.target.files)} />
          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={() => inputRef.current?.click()} className="flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 font-semibold hover:bg-white/10">
              <Camera size={18} /> Upload / Capture
            </button>
            <button onClick={submit} disabled={!file || scanning} className="flex items-center gap-2 rounded-2xl bg-nova-400 px-5 py-3 font-bold text-nova-950 disabled:opacity-50">
              <ScanLine size={18} /> {scanning ? "Scanning..." : "Run AI Scan"}
            </button>
          </div>
        </section>

        <section className="glass rounded-3xl p-6">
          <h2 className="font-display text-2xl font-bold">Disease Analysis</h2>
          {scanning && (
            <div className="mt-8 grid h-[420px] place-items-center rounded-3xl bg-nova-400/5 scan-grid">
              <div className="orb grid h-40 w-40 place-items-center rounded-full bg-nova-400/20">
                <Sparkles className="text-nova-200" size={52} />
              </div>
            </div>
          )}
          {!scanning && !result && <div className="mt-8 rounded-3xl bg-white/5 p-8 text-white/55">Scan results will appear here with confidence bars and treatment intelligence.</div>}
          {result && <ResultPanel result={result} />}
        </section>
      </div>
    </AppShell>
  );
}

function ResultPanel({ result }) {
  const diseaseKey = String(result.diseaseName || "").toLowerCase();
  const fallbackImage = diseaseKey.includes("rice")
    ? diseaseVisuals.rice
    : diseaseKey.includes("tomato")
      ? diseaseVisuals.tomato
      : diseaseKey.includes("maize")
        ? diseaseVisuals.maize
        : diseaseVisuals.default;
  const resultImage = result.imageUrl ? assetUrl(result.imageUrl) : fallbackImage;
  const causeCards = [
    {
      title: "Likely Cause",
      image: causeImages[0],
      value: result.severity === "High" ? "High humidity, infected residue, and rapid leaf wetness can accelerate disease spread." : "Moisture stress, dense canopy, or nutrient imbalance may be contributing to the symptoms.",
    },
    {
      title: "Field Condition",
      image: causeImages[1],
      value: "Scout lower leaves, check drainage, and compare symptoms across sunny and shaded parts of the plot.",
    },
    {
      title: "Next Best Action",
      image: causeImages[2],
      value: result.treatment || "Isolate affected plants, improve airflow, and follow local extension guidance before spraying.",
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
      <img
        src={resultImage}
        onError={(event) => {
          event.currentTarget.src = fallbackImage;
        }}
        alt={`${result.diseaseName || "Crop"} scan result`}
        className="h-56 w-full rounded-3xl object-cover"
      />
      <div className="rounded-3xl bg-white/10 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-white/50">Detected condition</p>
            <h3 className="font-display text-3xl font-bold">{result.diseaseName}</h3>
          </div>
          <span className="rounded-full bg-nova-400 px-4 py-2 font-bold text-nova-950">{result.confidence}% confidence</span>
        </div>
        <div className="mt-5 h-3 rounded-full bg-white/10">
          <div className="h-3 rounded-full bg-nova-400" style={{ width: `${result.confidence}%` }} />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {causeCards.map((card) => (
          <div key={card.title} className="overflow-hidden rounded-2xl bg-white/10">
            <img src={card.image} alt={card.title} className="h-28 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-nova-200">{card.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/70">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Info title="Severity" value={result.severity} />
        <Info title="Pesticide" value={result.pesticideRecommendation} />
        <Info title="Seed Recommendation" value={result.seedRecommendation} />
        <Info title="Treatment" value={result.treatment} />
      </div>
      <div className="rounded-3xl bg-nova-400/10 p-5">
        <h4 className="font-semibold text-nova-100">Prevention Tips</h4>
        <ul className="mt-3 space-y-2 text-sm text-white/70">{result.preventionTips?.map((tip) => <li key={tip}>- {tip}</li>)}</ul>
      </div>
    </motion.div>
  );
}

function Info({ title, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-white/40">{title}</p>
      <p className="mt-2 text-sm text-white/78">{value}</p>
    </div>
  );
}
