import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TRZSlideOver from "@/components/TRZSlideOver";
import { mockScanData } from "@/data/mockData";

const statusDot = (s: string) => {
  if (s === "clean" || s === "done") return "bg-tz-safe";
  if (s === "danger") return "bg-tz-danger";
  if (s === "warn") return "bg-tz-warn";
  return "bg-tz-text-muted";
};

const severityClass = (s: string) => {
  if (s === "CRITICAL" || s === "HIGH") return "badge-critical";
  if (s === "MEDIUM") return "badge-medium";
  return "badge-low";
};

const ScanResult = () => {
  const [trzOpen, setTrzOpen] = useState(false);
  const [selectedTrz, setSelectedTrz] = useState<string | null>(null);
  const data = mockScanData;

  const openTrz = (id: string) => {
    setSelectedTrz(id);
    setTrzOpen(true);
  };

  return (
    <div className="min-h-screen bg-tz-bg dot-grid relative">
      <div className="absolute top-0 left-0 right-0 h-[400px] z-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,82,82,0.12) 0%, transparent 60%)" }} />
      <Navbar />

      <div className="relative z-10 max-w-[860px] mx-auto px-6 pt-24 pb-20">
        {/* Verdict Banner */}
        <div className="glass-card-static p-8 md:p-12 mb-6" style={{ borderBottom: "1px solid rgba(255,82,82,0.2)" }}>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <p className="font-space text-[11px] text-tz-text-muted uppercase tracking-wider">Scan Complete · {data.filename}</p>
              <motion.h1 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }} className="font-syne font-extrabold text-5xl text-tz-danger mt-3">
                DANGEROUS
              </motion.h1>
              <p className="font-inter text-base text-tz-text-secondary leading-relaxed mt-4 max-w-[580px]">{data.ai_explanation}</p>
            </div>
            <div className="flex flex-col items-center shrink-0">
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ border: "2px solid hsl(var(--danger))", background: "rgba(255,82,82,0.08)" }}>
                <span className="font-space font-bold text-4xl text-tz-danger">{data.risk_score}</span>
              </div>
              <span className="font-inter text-xs text-tz-text-muted mt-2">Risk Score</span>
              <div className="glass-pill flex items-center gap-2 px-3 py-1 mt-3 cursor-pointer" onClick={() => navigator.clipboard.writeText(data.hash)}>
                <span className="font-space text-[11px] text-tz-text-muted">{data.hash.slice(0, 12)}...</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-tz-text-muted"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Layer Summary */}
        <div className="flex flex-wrap gap-2 mb-6">
          {data.layer_summary.map((l) => (
            <div key={l.layer} className="glass-pill flex items-center gap-2 px-3 py-1.5">
              <span className="accent-pill font-space text-[10px] px-1.5 py-0.5">{l.layer}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${statusDot(l.status)}`} />
              <span className="font-space text-[11px] text-tz-text-muted">{l.message}</span>
            </div>
          ))}
        </div>

        {/* VT Contrast */}
        <div className="glass-card-static p-6 mb-8" style={{ borderLeft: "3px solid hsl(var(--warn))" }}>
          <p className="font-inter text-sm text-tz-text-secondary leading-relaxed">
            ⚠ VirusTotal shows 0/70 engines flagged this file as malicious. TraceZ detected DANGEROUS via Layer 6 SDK fingerprinting and Layer 7 similarity analysis. Signature-based scanners cannot catch renamed malware variants.
          </p>
        </div>

        {/* Findings */}
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-inter font-semibold text-lg text-tz-text-primary">Findings</h2>
          <span className="accent-pill font-space text-[11px] px-2 py-0.5">{data.findings.length}</span>
        </div>

        <div className="space-y-4 mb-12">
          {data.findings.map((f, i) => (
            <motion.div key={f.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`glass-card-static p-5 md:p-6 ${f.severity === "MEDIUM" ? "border-l-warn" : "border-l-danger"}`}>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`font-space text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full ${severityClass(f.severity)}`}>{f.severity}</span>
                <span className="glass-pill font-space text-[10px] text-tz-text-muted px-2.5 py-1">{f.layer}</span>
                <span className="font-inter font-semibold text-[15px] text-tz-text-primary">{f.title}</span>
                {f.trzId && (
                  <button onClick={() => openTrz(f.trzId!)} className="accent-pill font-space text-xs px-2.5 py-1 cursor-pointer hover:bg-tz-accent/20 transition-colors ml-auto">
                    {f.trzId}
                  </button>
                )}
              </div>
              <p className="font-inter text-sm text-tz-text-secondary leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <button className="h-11 px-6 font-inter text-sm text-tz-text-secondary border border-border rounded-lg hover:border-tz-text-muted transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            Download PDF Report
          </button>
          <Link to="/trz-database" className="h-11 px-6 font-inter text-sm text-tz-text-secondary border border-border rounded-lg hover:border-tz-text-muted transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
            View in TRZ Database
          </Link>
          <Link to="/" className="h-11 px-6 font-syne font-bold text-sm text-tz-bg rounded-lg flex items-center gap-2" style={{ background: "linear-gradient(135deg, #00E5FF, #0098C7)" }}>
            Scan Another File
          </Link>
        </div>
      </div>

      <Footer />
      <TRZSlideOver open={trzOpen} onClose={() => setTrzOpen(false)} trzId={selectedTrz} />
    </div>
  );
};

export default ScanResult;
