import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TRZSlideOver from "@/components/TRZSlideOver";
import { trzDatabaseEntries } from "@/data/mockData";

const categories = ["All", "Spyware", "Adware", "Trojan", "Ransomware", "Supply Chain", "Stalkerware", "Phishing"];

const categoryColors: Record<string, string> = {
  Spyware: "badge-critical",
  Adware: "badge-medium",
  Trojan: "badge-critical",
  Ransomware: "bg-purple-500/10 text-purple-400 border border-purple-500/30",
  "Supply Chain": "bg-blue-500/10 text-blue-400 border border-blue-500/30",
  Stalkerware: "badge-critical",
  Phishing: "badge-medium",
};

const TRZDatabase = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [trzOpen, setTrzOpen] = useState(false);
  const [selectedTrz, setSelectedTrz] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return trzDatabaseEntries.filter((e) => {
      const matchCat = filter === "All" || e.category === filter;
      const matchSearch = !search || e.id.toLowerCase().includes(search.toLowerCase()) || e.name.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, filter]);

  return (
    <div className="min-h-screen bg-tz-bg dot-grid relative">
      <div className="glow-cyan absolute w-[600px] h-[600px] top-[-200px] left-1/2 -translate-x-1/2 z-0" />
      <Navbar />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20">
        <div className="text-center mb-12">
          <span className="font-space text-[11px] text-tz-accent uppercase tracking-[0.12em]">Public Threat Database</span>
          <h1 className="font-syne font-bold text-4xl md:text-[52px] text-tz-text-primary mt-3">TRZ Database</h1>
          <p className="font-inter text-base text-tz-text-secondary mt-4">Every threat pattern TraceZ has identified. Searchable by anyone.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[{ val: "2,841", label: "Total Entries" }, { val: "12", label: "Threat Categories" }, { val: "47", label: "Added This Week" }].map((s) => (
            <div key={s.label} className="glass-card-static p-6 text-center">
              <span className="font-space font-bold text-3xl md:text-[40px] text-tz-accent">{s.val}</span>
              <p className="font-inter text-[13px] text-tz-text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="glass-card-static flex items-center h-[52px] px-5 mb-4" style={{ borderRadius: 100 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-tz-text-muted shrink-0"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by TRZ ID, name, SDK namespace, or threat type..." className="flex-1 ml-3 bg-transparent font-inter text-sm text-tz-text-primary placeholder:text-tz-text-muted outline-none" />
          <span className="glass-pill font-space text-[10px] text-tz-text-muted px-2 py-0.5 hidden sm:block">⌘K</span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilter(c)} className={`font-space text-[11px] px-4 py-1.5 rounded-full transition-all ${filter === c ? "accent-pill" : "glass-pill text-tz-text-muted hover:text-tz-text-secondary hover:border-tz-text-muted/30"}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="glass-card-static overflow-hidden overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="flex items-center h-11 px-6" style={{ background: "rgba(255,255,255,0.03)" }}>
              {["TRZ ID", "Name", "Category", "Severity", "Matched", "Date Added"].map((h) => (
                <span key={h} className={`font-space text-[11px] uppercase text-tz-text-muted tracking-wider ${h === "TRZ ID" ? "w-[200px]" : h === "Name" ? "flex-1" : "w-[100px]"}`}>{h}</span>
              ))}
            </div>
            {filtered.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => { setSelectedTrz(entry.id); setTrzOpen(true); }}
                className="flex items-center h-14 px-6 cursor-pointer hover:bg-tz-text-primary/5 transition-colors"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
              >
                <span className="font-space text-[13px] text-tz-accent w-[200px] truncate">{entry.id}</span>
                <span className="font-inter font-medium text-sm text-tz-text-primary flex-1 truncate">{entry.name}</span>
                <span className="w-[100px]"><span className={`font-space text-[10px] px-2 py-0.5 rounded-full ${categoryColors[entry.category] || "badge-medium"}`}>{entry.category}</span></span>
                <span className="w-[100px] flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${entry.severity === "CRITICAL" ? "bg-tz-danger" : "bg-tz-warn"}`} />
                  <span className="font-inter text-[13px] text-tz-text-secondary">{entry.severity}</span>
                </span>
                <span className="font-inter text-[13px] text-tz-text-muted w-[100px]">{entry.matched.toLocaleString()} scans</span>
                <span className="font-inter text-[13px] text-tz-text-muted w-[100px]">{entry.dateAdded}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          {["Previous", "1", "2", "3", "...", "285", "Next"].map((p) => (
            <button key={p} className={`glass-pill font-space text-xs px-3 py-1.5 ${p === "1" ? "accent-pill" : "text-tz-text-muted hover:text-tz-text-secondary"}`}>{p}</button>
          ))}
        </div>
      </div>

      <Footer />
      <TRZSlideOver open={trzOpen} onClose={() => setTrzOpen(false)} trzId={selectedTrz} />
    </div>
  );
};

export default TRZDatabase;
