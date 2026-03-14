import { motion, AnimatePresence } from "framer-motion";
import { trzDatabaseEntries } from "@/data/mockData";

interface TRZSlideOverProps {
  open: boolean;
  onClose: () => void;
  trzId: string | null;
}

const TRZSlideOver = ({ open, onClose, trzId }: TRZSlideOverProps) => {
  const entry = trzDatabaseEntries.find((e) => e.id === trzId);

  return (
    <AnimatePresence>
      {open && entry && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] bg-black/50" onClick={onClose} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-16 bottom-0 z-[151] w-full max-w-[440px] overflow-y-auto p-8"
            style={{ background: "rgba(8,9,13,0.97)", backdropFilter: "blur(24px)", borderLeft: "1px solid rgba(0,229,255,0.2)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-space text-xs text-tz-text-muted uppercase tracking-wider">TRZ Database Entry</span>
              <button onClick={onClose} className="text-tz-text-muted hover:text-tz-text-primary transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>

            <h2 className="font-syne font-bold text-[22px] text-tz-accent mb-6">{entry.id}</h2>

            <div className="space-y-5">
              <div>
                <span className="font-space text-[10px] uppercase text-tz-text-muted tracking-wider">Name</span>
                <p className="font-inter text-sm text-tz-text-primary mt-1">{entry.name}</p>
              </div>

              <div className="flex gap-3">
                <span className={`font-space text-[10px] uppercase tracking-wider px-3 py-1 rounded-full ${entry.severity === "CRITICAL" ? "badge-critical" : "badge-high"}`}>{entry.category}</span>
                <span className={`font-space text-[10px] uppercase tracking-wider px-3 py-1 rounded-full ${entry.severity === "CRITICAL" ? "badge-critical" : "badge-high"}`}>{entry.severity}</span>
              </div>

              <div>
                <span className="font-space text-[10px] uppercase text-tz-text-muted tracking-wider">Description</span>
                <p className="font-inter text-sm text-tz-text-secondary leading-relaxed mt-1">{entry.description}</p>
              </div>

              <div>
                <span className="font-space text-[10px] uppercase text-tz-text-muted tracking-wider">Stored Patterns</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {entry.patterns.map((p) => (
                    <span key={p} className="font-space text-xs text-tz-accent accent-pill px-3 py-1">{p}</span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-space text-[10px] uppercase text-tz-text-muted tracking-wider">Verdict</span>
                <p className="font-inter text-sm text-tz-text-secondary leading-relaxed mt-1">{entry.verdict}</p>
              </div>

              <div className="flex gap-8">
                <div>
                  <span className="font-space text-[10px] uppercase text-tz-text-muted tracking-wider">First Seen</span>
                  <p className="font-inter text-sm text-tz-text-primary mt-1">{entry.firstSeen}</p>
                </div>
                <div>
                  <span className="font-space text-[10px] uppercase text-tz-text-muted tracking-wider">Times Matched</span>
                  <p className="font-inter text-sm text-tz-text-primary mt-1">{entry.timesMatched}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TRZSlideOver;
