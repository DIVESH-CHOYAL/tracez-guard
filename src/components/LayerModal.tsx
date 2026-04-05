import { motion, AnimatePresence } from "framer-motion";

const layerDetails = [
  {
    id: "L1", name: "Hash Check",
    explanation: "Every file has a unique 64-character fingerprint called a SHA-256 hash. Scany sends only this fingerprint — never your actual file — to 4 global threat databases including VirusTotal. If any database has seen this exact file before and flagged it, this layer fires in under 2 seconds.",
    catches: "Known malware, known ransomware, previously reported APK mods.",
  },
  {
    id: "L2", name: "Static Scan",
    explanation: "Scany unzips your APK and reads every permission it declared, every line of compiled bytecode, every hardcoded IP address and URL — without ever running it. Think of it like reading a criminal's written plans before they act.",
    catches: "Dangerous permission combos, hidden spyware SDKs, suspicious hardcoded servers.",
  },
  {
    id: "L3", name: "AI Sandbox",
    explanation: "The file is executed inside a fake virtual phone that the malware thinks is real. An AI generates realistic test actions — opening the app, granting permissions, simulating SMS — and watches what the app actually does versus what it should do.",
    catches: "Malware that hides its behaviour until it thinks it is on a real device.",
  },
  {
    id: "L4", name: "URL Intel",
    explanation: "Every URL and domain found inside your file is chased down. Scany follows redirect chains, checks domain age, checks SSL certificates, detects typosquatting (fake domains like g00gle.com), and cross-references against Google Safe Browsing.",
    catches: "Phishing links, newly registered malicious domains, redirect chains hiding the final destination.",
  },
  {
    id: "L5", name: "AI Verdict",
    explanation: "All signals from every other layer are sent to an AI that reads them and writes a plain English explanation a non-technical person can act on. No more '23/70 engines flagged this' — just: 'This app can steal your SMS messages. Do not install it.'",
    catches: "Nothing new — it translates everything the other layers found into human language.",
  },
  {
    id: "L6", name: "SDK Scan",
    explanation: "Scany fingerprints every third-party library bundled inside the app and checks them against a database of known malicious SDKs. Some legitimate-looking apps secretly include spyware advertising SDKs that silently harvest your data.",
    catches: "Hidden spyware SDKs, supply chain attacks, malicious libraries bundled inside otherwise clean-looking apps.",
  },
  {
    id: "L7", name: "Similarity",
    explanation: "Even if a malware author renames their app, changes the icon, and tweaks a few bytes of code — the underlying behaviour stays the same. Layer 7 extracts a behavioural fingerprint and compares it against Scany's TRZ threat database using vector similarity.",
    catches: "Renamed malware variants, modified spyware, zero-day lookalikes that match known threats at 91% or higher similarity.",
  },
];

interface LayerModalProps {
  layerIndex: number | null;
  onClose: () => void;
}

const LayerModal = ({ layerIndex, onClose }: LayerModalProps) => {
  const layer = layerIndex !== null ? layerDetails[layerIndex] : null;

  return (
    <AnimatePresence>
      {layer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center px-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-lg glass-card-static p-8"
            style={{ borderColor: "rgba(0,229,255,0.2)" }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-tz-text-muted hover:text-tz-text-primary transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="accent-pill font-space font-semibold text-sm px-3 py-1">{layer.id}</span>
              <h3 className="font-syne font-bold text-xl text-tz-text-primary">{layer.name}</h3>
            </div>

            <p className="font-inter text-sm text-tz-text-secondary leading-relaxed mb-5">
              {layer.explanation}
            </p>

            <div className="border-t border-border pt-4">
              <p className="font-space text-[10px] text-tz-text-muted uppercase tracking-wider mb-2">What it catches</p>
              <p className="font-inter text-sm text-tz-accent/90 leading-relaxed">
                {layer.catches}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LayerModal;
