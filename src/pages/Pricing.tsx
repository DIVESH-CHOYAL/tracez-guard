import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const freeFeatures = [
  { text: "5 scans per day", included: true },
  { text: "Hash scan (L1)", included: true },
  { text: "Basic verdict (SAFE / DANGEROUS only)", included: true },
  { text: "Last 3 scans in history", included: true },
  { text: "TRZ database browser (read-only)", included: true },
  { text: "URL credibility check", included: true },
  { text: "Full 7-layer analysis", included: false },
  { text: "Permission breakdown", included: false },
  { text: "SDK fingerprinting (L6)", included: false },
  { text: "AI similarity engine (L7)", included: false },
  { text: "PDF report download", included: false },
  { text: "Sandbox results (L3)", included: false },
];

const proFeatures = [
  "Unlimited scans", "Full 7-layer analysis", "Complete permission breakdown",
  "SDK fingerprinting + combo rules (L6)", "AI similarity engine (L7)", "AI sandbox results (L3)",
  "Typosquat detection (L4)", "Full scan history", "PDF report download",
  "Priority scan queue", "TRZ database: submit new threats",
];

const apiFeatures = [
  "All Pro features", "RESTful API access", "Webhook on scan complete",
  "Bulk APK scanning", "99.9% SLA uptime", "Dedicated support",
  "White-label option", "Custom scan limits",
];

const comparisonRows = [
  ["File hash scan (L1)", "✓ 5/day", "✓ Unlimited", "✓ Unlimited"],
  ["APK permission analysis (L2)", "◐ Basic", "✓ Full", "✓ Full"],
  ["AI sandbox (L3)", "—", "✓", "✓"],
  ["URL intelligence (L4)", "✓", "✓", "✓"],
  ["AI verdict in plain English (L5)", "◐ Summary", "✓ Full detail", "✓ Full detail"],
  ["SDK fingerprinting (L6)", "—", "✓", "✓"],
  ["TRZ similarity engine (L7)", "—", "✓", "✓"],
  ["PDF scan report", "—", "✓", "✓"],
  ["Scan history", "3 scans", "Unlimited", "Unlimited"],
  ["TRZ database access", "Read-only", "Submit + read", "Admin"],
  ["API access", "—", "—", "✓"],
  ["SLA", "—", "—", "99.9%"],
];

const cellStyle = (v: string) => {
  if (v.startsWith("✓")) return "text-tz-safe";
  if (v.startsWith("◐")) return "text-tz-warn";
  if (v === "—") return "text-tz-text-muted";
  return "text-tz-text-secondary";
};

const Pricing = () => {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-tz-bg dot-grid relative">
      <div className="glow-cyan absolute w-[600px] h-[600px] top-[-200px] left-1/2 -translate-x-1/2 z-0" />
      <Navbar />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20">
        <motion.div {...fadeUp} className="text-center mb-12">
          <span className="font-space text-[11px] text-tz-accent uppercase tracking-[0.12em]">Simple Pricing</span>
          <h1 className="font-syne font-bold text-4xl md:text-[52px] text-tz-text-primary mt-3">Scan smarter. Pay less.</h1>

          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`font-inter text-sm ${!annual ? "text-tz-text-primary" : "text-tz-text-muted"}`}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} className="w-12 h-6 rounded-full relative transition-colors" style={{ background: annual ? "hsl(var(--accent))" : "rgba(255,255,255,0.15)" }}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-tz-bg transition-transform ${annual ? "left-7" : "left-1"}`} />
            </button>
            <span className={`font-inter text-sm ${annual ? "text-tz-text-primary" : "text-tz-text-muted"}`}>Annual (save 20%)</span>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {/* Free */}
          <motion.div {...fadeUp} className="glass-card-static p-8 flex flex-col">
            <h3 className="font-syne font-bold text-[32px] text-tz-text-primary">Free</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-syne font-bold text-5xl text-tz-text-primary">₹0</span>
              <span className="font-inter text-base text-tz-text-muted">/month</span>
            </div>
            <p className="font-inter text-sm text-tz-text-muted mt-2">Forever free. No card required.</p>
            <ul className="mt-6 space-y-3 flex-1">
              {freeFeatures.map((f) => (
                <li key={f.text} className="flex items-start gap-2 font-inter text-sm text-tz-text-secondary">
                  <span className={f.included ? "text-tz-safe" : "text-tz-text-muted"}>{f.included ? "✓" : "✗"}</span> {f.text}
                </li>
              ))}
            </ul>
            <button className="mt-8 w-full h-12 rounded-lg font-inter text-sm text-tz-text-secondary border border-border hover:border-tz-text-muted transition-colors">
              Get Started Free
            </button>
          </motion.div>

          {/* Pro */}
          <motion.div {...fadeUp} className="glass-card-static p-8 flex flex-col relative" style={{ borderColor: "rgba(0,229,255,0.35)" }}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="accent-pill font-space text-[10px] px-3 py-1">Most Popular</span>
            </div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-40 h-12 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(0,229,255,0.15), transparent)" }} />
            <h3 className="font-syne font-bold text-[32px] text-tz-text-primary">Pro</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-syne font-bold text-5xl text-tz-accent">{annual ? "₹159" : "₹199"}</span>
              <span className="font-inter text-base text-tz-text-muted">/month</span>
            </div>
            {annual && <p className="font-inter text-[13px] text-tz-text-muted mt-1">₹1,910/year (save ₹478)</p>}
            <p className="font-inter text-sm text-tz-text-muted mt-2">Everything you need for serious security.</p>
            <ul className="mt-6 space-y-3 flex-1">
              {proFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 font-inter text-sm text-tz-text-secondary">
                  <span className="text-tz-safe">✓</span> {f}
                </li>
              ))}
            </ul>
            <button className="mt-8 w-full h-12 rounded-lg font-syne font-bold text-sm text-tz-bg" style={{ background: "linear-gradient(135deg, #00E5FF, #0098C7)" }}>
              Upgrade to Pro
            </button>
          </motion.div>

          {/* API */}
          <motion.div {...fadeUp} className="glass-card-static p-8 flex flex-col">
            <h3 className="font-syne font-bold text-[32px] text-tz-text-primary">API</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-syne font-bold text-5xl text-tz-text-primary">Custom</span>
              <span className="font-inter text-base text-tz-text-muted">pricing</span>
            </div>
            <p className="font-inter text-sm text-tz-text-muted mt-2">For businesses and developers.</p>
            <ul className="mt-6 space-y-3">
              {apiFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 font-inter text-sm text-tz-text-secondary">
                  <span className="text-tz-safe">✓</span> {f}
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2">
              <p className="font-inter text-xs text-tz-text-muted italic">"Ed-tech: scan APKs before distributing to students"</p>
              <p className="font-inter text-xs text-tz-text-muted italic">"Enterprise: screen all third-party apps before install"</p>
            </div>
            <button className="mt-8 w-full h-12 rounded-lg font-inter text-sm text-tz-text-secondary border border-border hover:border-tz-text-muted transition-colors">
              Contact Sales →
            </button>
          </motion.div>
        </div>

        {/* Comparison Table */}
        <div className="glass-card-static overflow-hidden overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="flex items-center h-11 px-6" style={{ background: "rgba(255,255,255,0.03)" }}>
              <span className="font-space text-[11px] uppercase text-tz-text-muted tracking-wider flex-1">Feature</span>
              <span className="font-space text-[11px] uppercase text-tz-text-muted tracking-wider w-28 text-center">Free</span>
              <span className="font-space text-[11px] uppercase text-tz-text-muted tracking-wider w-28 text-center">Pro</span>
              <span className="font-space text-[11px] uppercase text-tz-text-muted tracking-wider w-28 text-center">API</span>
            </div>
            {comparisonRows.map((row) => (
              <div key={row[0]} className="flex items-center h-12 px-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span className="font-inter text-sm text-tz-text-secondary flex-1">{row[0]}</span>
                <span className={`font-inter text-sm w-28 text-center ${cellStyle(row[1])}`}>{row[1]}</span>
                <span className={`font-inter text-sm w-28 text-center ${cellStyle(row[2])}`}>{row[2]}</span>
                <span className={`font-inter text-sm w-28 text-center ${cellStyle(row[3])}`}>{row[3]}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="font-inter text-[13px] text-tz-text-muted mt-6 text-center">
          B2B example: One ed-tech company scanning APKs for 50,000 students needs millions of API calls/month. One API contract = 75 Pro subscribers.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
