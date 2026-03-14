import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sampleVerdicts } from "@/data/mockData";

const stagger = { animate: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } } };

const trustItems = [
  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, text: "File never stored" },
  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z"/><path d="M9 9h6v6H9z"/></svg>, text: "Hash-only external calls" },
  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, text: "7 detection layers" },
  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>, text: "Plain English results" },
];

const featureCards = [
  { icon: "🛡️", title: "APK Scanner", desc: "DEX bytecode analysis" },
  { icon: "🌐", title: "URL Intel", desc: "Redirect chain + domain age" },
  { icon: "🧠", title: "AI Sandbox", desc: "Expected vs actual behaviour" },
  { icon: "🗄️", title: "TRZ Engine", desc: "Similarity vs 2,841 threats" },
];

const layerSteps = [
  { id: "L1", name: "Hash Check", desc: "64-char fingerprint vs 4 global threat databases" },
  { id: "L2", name: "Static Scan", desc: "Reads every permission and byte of compiled code" },
  { id: "L3", name: "AI Sandbox", desc: "Runs in fake phone, watches what it actually does" },
  { id: "L4", name: "URL Intel", desc: "Follows redirects, checks domain age and typosquats" },
  { id: "L5", name: "AI Verdict", desc: "Translates all signals into plain English" },
  { id: "L6", name: "SDK Scan", desc: "Finds malicious libraries hidden in third-party code" },
  { id: "L7", name: "Similarity", desc: "Catches renamed variants at 91% match" },
];

const verdictColor = (v: string) => v === "DANGEROUS" ? "text-tz-danger" : v === "SAFE" ? "text-tz-safe" : "text-tz-warn";
const verdictBorder = (v: string) => v === "DANGEROUS" ? "border-l-danger" : v === "SAFE" ? "border-l-safe" : "border-l-warn";

const Index = () => {
  const navigate = useNavigate();
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setSelectedFile(file);
  };

  const startScan = () => {
    navigate("/scan/demo-scan-001");
  };

  return (
    <div className="min-h-screen bg-tz-bg dot-grid relative overflow-hidden">
      {/* Glow orbs */}
      <div className="glow-cyan absolute w-[700px] h-[700px] top-[-150px] left-1/2 -translate-x-1/2 z-0" />
      <div className="glow-purple absolute w-[500px] h-[500px] top-[-100px] right-[-100px] z-0" />

      <Navbar />

      {/* Hero */}
      <motion.section initial="initial" animate="animate" variants={stagger} className="relative z-10 pt-32 pb-16 px-6 flex flex-col items-center text-center">
        <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-tz-accent"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span className="font-space text-[11px] text-tz-accent uppercase tracking-[0.12em]">Privacy-First Security Analyzer</span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="font-syne font-extrabold text-5xl md:text-7xl text-tz-text-primary leading-none tracking-tight">
          Scan. Analyze. Trust.
        </motion.h1>
        <motion.p variants={fadeUp} className="font-syne font-bold text-3xl md:text-[52px] text-tz-text-secondary leading-tight mt-2">
          Seven layers. One verdict.
        </motion.p>
        <motion.p variants={fadeUp} className="font-inter text-base text-tz-text-secondary max-w-[520px] leading-relaxed mt-6">
          The first security scanner that never sees your file. Only a 64-character hash fingerprint ever leaves your machine — your data stays yours.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button onClick={() => document.getElementById("upload-zone")?.scrollIntoView({ behavior: "smooth" })} className="h-[52px] px-8 font-syne font-bold text-[15px] text-tz-bg rounded-lg flex items-center gap-2" style={{ background: "linear-gradient(135deg, #00E5FF, #0098C7)" }}>
            Get Started Free <span>→</span>
          </button>
          <Link to="/trz-database" className="h-[52px] px-8 font-inter text-sm text-tz-text-secondary border border-border rounded-lg flex items-center hover:border-tz-text-muted transition-colors">
            View TRZ Database →
          </Link>
        </motion.div>
        <motion.p variants={fadeUp} className="font-space text-[11px] text-tz-text-muted mt-4">5 free scans per day · No account required</motion.p>
      </motion.section>

      {/* Upload Zone */}
      <section id="upload-zone" className="relative z-10 px-6 pb-8 flex flex-col items-center">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
          onClick={() => !selectedFile && fileRef.current?.click()}
          className={`glass-card-static w-full max-w-[680px] py-14 px-12 text-center cursor-pointer transition-all ${dragOver ? "border-tz-accent bg-tz-accent/5" : ""}`}
          style={{ borderRadius: 20, border: dragOver ? "2px solid hsl(var(--accent))" : "2px dashed rgba(0,229,255,0.25)" }}
        >
          <input ref={fileRef} type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          {!selectedFile ? (
            <>
              <motion.div animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity }} className="mx-auto mb-4">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-tz-accent mx-auto"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </motion.div>
              <p className="font-inter font-semibold text-[17px] text-tz-text-primary">Drop your APK, file, or anything suspicious here</p>
              <p className="font-inter text-sm text-tz-text-muted mt-2 hover:underline">or click to browse</p>
              <p className="font-space text-[11px] text-tz-text-muted mt-4">.APK · .EXE · .PDF · .ZIP · .DOC · any file up to 200MB</p>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-tz-accent"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <p className="font-space text-sm text-tz-accent">{selectedFile.name}</p>
              <p className="font-inter text-xs text-tz-text-muted">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              <button onClick={startScan} className="mt-2 h-11 px-8 font-syne font-bold text-sm text-tz-bg rounded-lg" style={{ background: "linear-gradient(135deg, #00E5FF, #0098C7)" }}>
                Scan Now
              </button>
            </div>
          )}
        </div>

        {/* URL Input */}
        <div className="w-full max-w-[680px] mt-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 h-px bg-border" />
            <span className="font-inter text-xs text-tz-text-muted">or paste a URL</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="glass-card-static flex items-center h-[52px] px-4" style={{ borderRadius: 100 }}>
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://suspicious-link.com..." className="flex-1 bg-transparent font-inter text-sm text-tz-text-primary placeholder:text-tz-text-muted outline-none" />
            <button onClick={() => url && navigate("/scan/demo-url")} className="ml-2 h-9 px-5 font-syne font-bold text-xs text-tz-bg rounded-full" style={{ background: "linear-gradient(135deg, #00E5FF, #0098C7)" }}>
              Scan Link
            </button>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="relative z-10 px-6 py-8 flex flex-wrap justify-center gap-3">
        {trustItems.map((item) => (
          <div key={item.text} className="glass-pill flex items-center gap-2 px-4 py-2">
            <span className="text-tz-accent">{item.icon}</span>
            <span className="font-space text-[11px] text-tz-text-secondary">{item.text}</span>
          </div>
        ))}
      </section>

      {/* Feature Cards */}
      <section className="relative z-10 px-6 py-8 flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {featureCards.map((card, i) => (
          <motion.div key={card.title} animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }} className="glass-card-static p-6 w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]">
            <span className="text-2xl">{card.icon}</span>
            <p className="font-inter font-semibold text-sm text-tz-text-primary mt-3">{card.title}</p>
            <p className="font-inter text-xs text-tz-text-muted mt-1">{card.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Powered By */}
      <section className="relative z-10 px-6 py-8 text-center">
        <p className="font-space text-[11px] text-tz-text-muted mb-3">Scanning powered by</p>
        <div className="flex flex-wrap justify-center gap-2">
          {["VirusTotal", "MalwareBazaar", "URLhaus", "OTX AlienVault"].map((name) => (
            <span key={name} className="glass-pill px-3 py-1 font-space text-[11px] text-tz-text-muted">{name}</span>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="relative z-10 px-6 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-space text-[11px] text-tz-accent uppercase tracking-[0.12em]">How It Works</span>
          <h2 className="font-syne font-bold text-3xl md:text-[40px] text-tz-text-primary mt-3">Seven layers between you and malware</h2>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-6 left-6 right-6 h-px border-t border-dashed border-tz-text-muted/30" />
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6">
            {layerSteps.map((step) => (
              <motion.div key={step.id} whileHover={{ scale: 1.05 }} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-space font-bold text-base text-tz-accent relative z-10 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-shadow" style={{ border: "1px solid rgba(0,229,255,0.3)", background: "hsl(var(--bg))" }}>
                  {step.id}
                </div>
                <p className="font-inter font-semibold text-xs text-tz-text-primary mt-3">{step.name}</p>
                <p className="font-inter text-[11px] text-tz-text-muted mt-1 leading-snug">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="layers" className="relative z-10 px-6 py-20 max-w-4xl mx-auto">
        <h2 className="font-syne font-bold text-3xl md:text-[40px] text-tz-text-primary text-center mb-12">Why not just use VirusTotal?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card-static p-8" style={{ borderColor: "rgba(255,82,82,0.2)" }}>
            <h3 className="font-inter font-semibold text-lg text-tz-text-primary mb-4 flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-tz-danger"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
              VirusTotal
            </h3>
            <ul className="space-y-3">
              {["Your file is stored publicly forever", "23/70 results tell you nothing actionable", "Changing one byte defeats all 70 engines", "No APK-specific intelligence", "No permission or SDK analysis", "Malware authors use it to test their own malware"].map((t) => (
                <li key={t} className="flex items-start gap-2 font-inter text-sm text-tz-text-secondary"><span className="text-tz-danger mt-0.5">✗</span> {t}</li>
              ))}
            </ul>
          </div>
          <div className="glass-card-static p-8" style={{ borderColor: "rgba(0,229,255,0.2)" }}>
            <h3 className="font-inter font-semibold text-lg text-tz-text-primary mb-4 flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-tz-accent"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              TraceZ
            </h3>
            <ul className="space-y-3">
              {["File bytes never leave your machine — architectural guarantee", "Plain English: 'Do not install. This app steals SMS.'", "AI similarity catches 91% matches of renamed malware", "Full APK DEX bytecode analysis", "SDK fingerprinting + combo rules", "You can't test your malware against TraceZ"].map((t) => (
                <li key={t} className="flex items-start gap-2 font-inter text-sm text-tz-text-secondary"><span className="text-tz-safe mt-0.5">✓</span> {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Sample Verdicts */}
      <section className="relative z-10 px-6 py-20 max-w-5xl mx-auto">
        <h2 className="font-syne font-bold text-3xl md:text-[40px] text-tz-text-primary text-center mb-12">What TraceZ tells you</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {sampleVerdicts.map((v) => (
            <div key={v.filename} className={`glass-card-static p-6 ${verdictBorder(v.verdict)}`}>
              <p className="font-space text-xs text-tz-text-muted">{v.filename}</p>
              <p className={`font-syne font-bold text-xl mt-2 ${verdictColor(v.verdict)}`}>{v.verdict}</p>
              <div className="flex items-center gap-3 mt-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-space font-semibold text-sm ${v.verdict === "DANGEROUS" ? "border-2 border-tz-danger text-tz-danger" : v.verdict === "SAFE" ? "border-2 border-tz-safe text-tz-safe" : "border-2 border-tz-warn text-tz-warn"}`} style={{ background: v.verdict === "DANGEROUS" ? "rgba(255,82,82,0.08)" : v.verdict === "SAFE" ? "rgba(0,230,118,0.08)" : "rgba(255,171,0,0.08)" }}>
                  {v.score}
                </div>
                <p className="font-inter text-xs text-tz-text-secondary leading-relaxed flex-1">{v.ai}</p>
              </div>
              <div className="flex gap-1 mt-4">
                {v.layers.map((l, i) => (
                  <span key={i} className={`font-space text-[10px] px-1.5 py-0.5 rounded ${l === "✓" ? "text-tz-safe" : l === "✗" ? "text-tz-danger" : l === "◐" ? "text-tz-warn" : "text-tz-text-muted"}`}>
                    L{i + 1}{l}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
