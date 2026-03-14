import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { layerSteps, privacyLogLines } from "@/data/mockData";

type LayerStatus = "waiting" | "running" | "complete";

const ScanProgress = () => {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState<LayerStatus[]>(layerSteps.map(() => "waiting"));
  const [times, setTimes] = useState<(number | null)[]>(layerSteps.map(() => null));
  const [privacyLines, setPrivacyLines] = useState<string[]>([]);
  const started = useRef(false);

  const completedCount = statuses.filter((s) => s === "complete").length;

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // Run layers sequentially for visual effect (L1 -> L2 -> ... -> L7)
    // But spec says L5 runs last, so we reorder: L1,L2,L3,L4,L6,L7,L5
    const order = [0, 1, 2, 3, 5, 6, 4]; // indices
    let cumulativeDelay = 0;

    order.forEach((idx, seqIdx) => {
      const layer = layerSteps[idx];
      // Start running
      setTimeout(() => {
        setStatuses((prev) => { const n = [...prev]; n[idx] = "running"; return n; });
      }, cumulativeDelay);

      // Complete
      setTimeout(() => {
        setStatuses((prev) => { const n = [...prev]; n[idx] = "complete"; return n; });
        setTimes((prev) => { const n = [...prev]; n[idx] = layer.delay / 1000; return n; });
      }, cumulativeDelay + layer.delay);

      cumulativeDelay += layer.delay;

      // Add privacy lines at intervals
      if (seqIdx < privacyLogLines.length) {
        setTimeout(() => {
          setPrivacyLines((prev) => [...prev, privacyLogLines[seqIdx]]);
        }, cumulativeDelay - layer.delay + 600);
      }
    });

    // Navigate after all done + 800ms
    setTimeout(() => {
      navigate("/result/demo-dangerous");
    }, cumulativeDelay + 800);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-tz-bg dot-grid relative">
      <div className="glow-cyan absolute w-[500px] h-[500px] top-[-100px] left-1/2 -translate-x-1/2 z-0" />
      <Navbar />

      <div className="relative z-10 max-w-[720px] mx-auto px-6 pt-28 pb-20">
        {/* Top status */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-space text-sm text-tz-accent">WhatsApp_Mod_v2.apk</span>
          <div className="flex items-center gap-2">
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-tz-accent" />
            <span className="font-inter text-sm text-tz-text-muted">Analyzing...</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[3px] rounded-full mb-2" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #00E5FF, #0098C7)" }} animate={{ width: `${(completedCount / 7) * 100}%` }} transition={{ duration: 0.5, ease: "easeOut" }} />
        </div>
        <p className="font-space text-[11px] text-tz-text-muted mb-8">Layer {completedCount} of 7 complete</p>

        {/* Layer panel */}
        <div className="glass-card-static overflow-hidden">
          {layerSteps.map((layer, i) => (
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
                  {statuses[i] === "running" ? layer.runMsg : statuses[i] === "complete" ? layer.doneMsg : "Waiting..."}
                </p>
              </div>
              {times[i] !== null && <span className="font-space text-xs text-tz-text-muted shrink-0">{times[i]}s</span>}
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
              </div>
            </motion.div>
          ))}
        </div>

        {/* Privacy Log */}
        <div className="glass-card-static mt-6 p-6">
          <span className="font-space text-[10px] text-tz-text-muted uppercase tracking-wider">Privacy Log</span>
          <div className="mt-3 space-y-2">
            {privacyLines.map((line, i) => (
              <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 0.7, x: 0 }} transition={{ duration: 0.3 }} className="font-space text-xs text-tz-accent">
                {line}
              </motion.p>
            ))}
            {privacyLines.length < privacyLogLines.length && (
              <span className="typewriter-cursor font-space text-xs" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanProgress;
