import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

type LayerStatus = "waiting" | "running" | "complete" | "flagged";

const layers = [
  { id: "L1", name: "Hash Check", delay: 1100, runMsg: "Sending SHA-256 fingerprint to VirusTotal, MalwareBazaar...", verdict: "clean" },
  { id: "L2", name: "Static Scan", delay: 2400, runMsg: "Unpacking APK · Reading AndroidManifest.xml...", verdict: "suspicious" },
  { id: "L3", name: "AI Sandbox", delay: 3800, runMsg: "Launching in isolated Docker environment...", verdict: "suspicious" },
  { id: "L4", name: "URL Intel", delay: 1900, runMsg: "Tracing redirect chain · Querying WHOIS...", verdict: "clean" },
  { id: "L5", name: "AI Verdict", delay: 4100, runMsg: "Aggregating all layer signals · Writing explanation...", verdict: "clean" },
  { id: "L6", name: "SDK Scan", delay: 2800, runMsg: "Extracting class namespaces · Matching threat database...", verdict: "suspicious" },
  { id: "L7", name: "Similarity", delay: 3200, runMsg: "Generating AI embedding vector · Cosine similarity search...", verdict: "suspicious" },
];

const layerTimes = [1100, 2400, 3800, 1900, 4100, 2800, 3200];

const ScanProgress = () => {
  const { scanId } = useParams();
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState<LayerStatus[]>(layers.map(() => "waiting"));
  const [times, setTimes] = useState<(number | null)[]>(layers.map(() => null));
  const [statusText, setStatusText] = useState("Initializing scan...");
  const started = useRef(false);

  const completedCount = statuses.filter((s) => s === "complete" || s === "flagged").length;

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // Mock SSE: run layers sequentially with L5 last
    const order = [0, 1, 2, 3, 5, 6, 4];
    let cumDelay = 0;

    order.forEach((idx) => {
      const layer = layers[idx];
      setTimeout(() => {
        setStatuses((prev) => { const n = [...prev]; n[idx] = "running"; return n; });
        setStatusText(layer.runMsg);
      }, cumDelay);

      setTimeout(() => {
        const isFlagged = layer.verdict === "suspicious";
        setStatuses((prev) => { const n = [...prev]; n[idx] = isFlagged ? "flagged" : "complete"; return n; });
        setTimes((prev) => { const n = [...prev]; n[idx] = layerTimes[idx]; return n; });
      }, cumDelay + layer.delay);

      cumDelay += layer.delay;
    });

    setTimeout(() => {
      navigate(`/scan/${scanId}/results`);
    }, cumDelay + 800);
  }, [navigate, scanId]);

  return (
    <div className="min-h-screen bg-tz-bg dot-grid relative">
      <div className="glow-cyan absolute w-[500px] h-[500px] top-[-100px] left-1/2 -translate-x-1/2 z-0" />
      <Navbar />

      <div className="relative z-10 max-w-[720px] mx-auto px-6 pt-28 pb-20">
        {/* Scan ID */}
        <p className="font-space text-xs text-tz-text-muted mb-2">Scan ID: {scanId}</p>

        {/* Status text */}
        <div className="flex items-center gap-2 mb-6">
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-tz-accent" />
          <span className="font-inter text-sm text-tz-text-secondary">{statusText}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[3px] rounded-full mb-2" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #00E5FF, #0098C7)" }}
            animate={{ width: `${(completedCount / 7) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <p className="font-space text-[11px] text-tz-text-muted mb-8">Layer {completedCount} of 7 complete</p>

        {/* Layer rows */}
        <div className="glass-card-static overflow-hidden">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.15 }}
              className="flex items-center h-16 px-6 gap-4"
              style={{ borderBottom: i < 6 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
            >
              <span className="accent-pill font-space font-semibold text-xs px-2 py-0.5 shrink-0">{layer.id}</span>
              <div className="flex-1 min-w-0">
                <span className="font-inter font-medium text-sm text-tz-text-primary">{layer.name}</span>
                <p className="font-inter text-[13px] text-tz-text-muted truncate">
                  {statuses[i] === "running" ? layer.runMsg : statuses[i] === "complete" ? "Clean" : statuses[i] === "flagged" ? "Suspicious" : "Waiting..."}
                </p>
              </div>
              {times[i] !== null && <span className="font-space text-xs text-tz-text-muted shrink-0">{times[i]}ms</span>}
              <div className="shrink-0">
                {statuses[i] === "waiting" && <div className="w-5 h-5 rounded-full border border-tz-text-muted/30" />}
                {statuses[i] === "running" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" className="animate-spin-arc">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(0,229,255,0.3)" strokeWidth="2" />
                    <path d="M12 2a10 10 0 019.95 9" fill="none" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
                {statuses[i] === "complete" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="rgba(0,230,118,0.15)"/><path d="M9 12l2 2 4-4" stroke="#00E676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
                {statuses[i] === "flagged" && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="rgba(255,82,82,0.15)"/><path d="M15 9l-6 6M9 9l6 6" stroke="#FF5252" strokeWidth="2" strokeLinecap="round"/></svg>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScanProgress;
