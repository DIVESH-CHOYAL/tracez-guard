import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } } };

const mockResult = {
  verdict: "DANGEROUS" as const,
  risk_score: 87,
  filename: "WhatsApp_Mod_v2.apk",
  explanation: "This file contains a known spyware SDK that silently reads SMS messages and sends them to a server in Eastern Europe. Do not install this application.",
  findings: [
    { layer: "L6", severity: "CRITICAL" as const, title: "XLoader Spyware SDK Detected", description: "XposedSpy SDK found as 'com.xload3r.agent'. AI similarity engine matched this to known XLoader spyware at 91.3% cosine similarity." },
    { layer: "L2", severity: "HIGH" as const, title: "SMS Exfiltration Combo Rule Triggered", description: "All three conditions met: XLoader SDK present, READ_SMS + SEND_SMS permissions declared, SmsManager.sendTextMessage() called in bytecode." },
    { layer: "L3", severity: "HIGH" as const, title: "Unexpected Network Calls in Sandbox", description: "During sandbox testing, the APK made 5 outbound HTTPS calls to 103.145.21.87:443 — a Romanian IP with no legitimate app reason." },
  ],
  layers: [
    { id: "L1", name: "Hash Check", status: "clean" },
    { id: "L2", name: "Static Scan", status: "danger" },
    { id: "L3", name: "AI Sandbox", status: "danger" },
    { id: "L4", name: "URL Intel", status: "clean" },
    { id: "L5", name: "AI Verdict", status: "done" },
    { id: "L6", name: "SDK Scan", status: "danger" },
    { id: "L7", name: "Similarity", status: "danger" },
  ],
};

const verdictConfig: Record<string, { color: string; bg: string; border: string; glow: string; icon: string; bannerBg: string; bannerBorder: string; bannerText: string }> = {
  DANGEROUS: { color: "text-tz-danger", bg: "rgba(255,82,82,0.08)", border: "border-tz-danger", glow: "rgba(255,82,82,0.12)", icon: "⚠", bannerBg: "rgba(255,82,82,0.1)", bannerBorder: "border-tz-danger", bannerText: "Do not install or open this file" },
  SUSPICIOUS: { color: "text-tz-warn", bg: "rgba(255,171,0,0.08)", border: "border-tz-warn", glow: "rgba(255,171,0,0.12)", icon: "⚠", bannerBg: "rgba(255,171,0,0.1)", bannerBorder: "border-tz-warn", bannerText: "Do not install or open this file" },
  SAFE: { color: "text-tz-safe", bg: "rgba(0,230,118,0.08)", border: "border-tz-safe", glow: "rgba(0,230,118,0.12)", icon: "✓", bannerBg: "rgba(0,230,118,0.1)", bannerBorder: "border-tz-safe", bannerText: "No threats detected" },
};

const severityClass = (s: string) => {
  if (s === "CRITICAL" || s === "HIGH") return "badge-critical";
  if (s === "MEDIUM") return "badge-medium";
  return "badge-low";
};

const statusDot = (s: string) => {
  if (s === "danger") return "bg-tz-danger";
  if (s === "clean" || s === "done") return "bg-tz-safe";
  return "bg-tz-warn";
};

const ScanResults = () => {
  const { scanId } = useParams();
  const navigate = useNavigate();
  const config = verdictConfig[mockResult.verdict];

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="min-h-screen bg-tz-bg dot-grid relative">
      <div className="glow-cyan absolute w-[500px] h-[500px] top-[-100px] left-1/2 -translate-x-1/2 z-0" />
      <Navbar />

      <div className="relative z-10 max-w-[860px] mx-auto px-6 pt-28 pb-20">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-static p-4 mb-6 flex items-center gap-3"
          style={{ background: config.bannerBg, borderColor: mockResult.verdict === "SAFE" ? "rgba(0,230,118,0.3)" : "rgba(255,82,82,0.3)" }}
        >
          <span className={`text-lg ${config.color}`}>{config.icon}</span>
          <span className={`font-inter font-medium text-sm ${config.color}`}>{config.bannerText}</span>
        </motion.div>

        {/* Verdict Header */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="glass-card-static p-8 md:p-10 mb-6"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${config.glow} 0%, transparent 60%)` }}
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <p className="font-space text-[11px] text-tz-text-muted uppercase tracking-wider mb-2">
                Scan Complete · {mockResult.filename}
              </p>
              <motion.p
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`font-syne font-extrabold text-4xl md:text-5xl ${config.color} mb-4`}
              >
                {mockResult.verdict}
              </motion.p>
              <p className="font-inter text-sm text-tz-text-secondary leading-relaxed max-w-[580px]">
                {mockResult.explanation}
              </p>
            </div>

            <div className="flex flex-col items-center shrink-0">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center ${config.border} border-2`}
                style={{ background: config.bg }}
              >
                <span className={`font-space font-bold text-4xl ${config.color}`}>{mockResult.risk_score}</span>
              </div>
              <span className="font-inter text-xs text-tz-text-muted mt-2">Risk Score</span>

              {/* Progress bar */}
              <div className="w-24 h-1.5 rounded-full mt-3" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${mockResult.risk_score}%`,
                    background: mockResult.verdict === "DANGEROUS" ? "hsl(var(--danger))" : mockResult.verdict === "SAFE" ? "hsl(var(--safe))" : "hsl(var(--warn))",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Layer Summary */}
        <div className="flex flex-wrap gap-2 mb-8">
          {mockResult.layers.map((l) => (
            <div key={l.id} className="glass-pill flex items-center gap-2 px-3 py-1.5">
              <span className="font-space text-[11px] text-tz-accent">{l.id}</span>
              <div className={`w-1.5 h-1.5 rounded-full ${statusDot(l.status)}`} />
              <span className="font-inter text-[11px] text-tz-text-muted">{l.name}</span>
            </div>
          ))}
        </div>

        {/* Findings */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="font-inter font-semibold text-lg text-tz-text-primary">Findings</h3>
            <span className="accent-pill font-space text-xs px-2 py-0.5">{mockResult.findings.length}</span>
          </div>

          <div className="space-y-4">
            {mockResult.findings.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-static p-5 border-l-danger"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`${severityClass(f.severity)} font-space text-[10px] uppercase px-2 py-0.5 rounded-full`}>
                    {f.severity}
                  </span>
                  <span className="glass-pill font-space text-[10px] text-tz-text-muted px-2 py-0.5">{f.layer}</span>
                  <span className="font-inter font-semibold text-sm text-tz-text-primary">{f.title}</span>
                </div>
                <p className="font-inter text-sm text-tz-text-secondary leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button onClick={copyLink} className="h-11 px-6 font-inter text-sm text-tz-text-secondary border border-border rounded-lg hover:border-tz-text-muted transition-colors flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
            Share Result
          </button>
          <button onClick={() => navigate("/")} className="h-11 px-6 font-syne font-bold text-sm text-tz-bg rounded-lg" style={{ background: "linear-gradient(135deg, #00E5FF, #0098C7)" }}>
            Scan Another File
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ScanResults;
