import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./AuthModal";

const navLinks = [
  { label: "Overview", to: "/" },
  { label: "Technology", to: "/#how-it-works" },
  { label: "Layers", to: "/#layers" },
  { label: "Database", to: "/trz-database" },
  { label: "Pricing", to: "/pricing" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const isActive = (to: string) => {
    if (to.includes("#")) return false;
    return location.pathname === to;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center px-6 md:px-12" style={{ background: "rgba(8,9,13,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link to="/" className="font-syne font-bold text-xl text-tz-accent shrink-0">
          TraceZ<sup className="text-tz-text-muted text-[10px] ml-0.5">™</sup>
        </Link>

        <div className="hidden md:flex items-center gap-6 mx-auto">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`text-sm font-inter transition-colors relative pb-1 ${isActive(l.to) ? "text-tz-accent" : "text-tz-text-muted hover:text-tz-text-primary"}`}
            >
              {l.label}
              {isActive(l.to) && (
                <motion.span layoutId="nav-dot" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-tz-accent" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 ml-auto">
          <button onClick={() => { setAuthMode("login"); setAuthOpen(true); }} className="h-9 px-4 text-sm font-inter text-tz-text-secondary border border-border rounded-lg hover:border-tz-text-muted transition-colors">
            Log In
          </button>
          <button onClick={() => { setAuthMode("signup"); setAuthOpen(true); }} className="h-9 px-5 text-sm font-syne font-bold rounded-lg text-tz-bg" style={{ background: "linear-gradient(135deg, #00E5FF, #0098C7)" }}>
            Get Started
          </button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden ml-auto text-tz-text-primary p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[99] pt-16 flex flex-col items-center justify-center gap-6" style={{ background: "rgba(8,9,13,0.97)" }}>
            {navLinks.map((l) => (
              <Link key={l.label} to={l.to} onClick={() => setMobileOpen(false)} className="font-syne text-2xl font-bold text-tz-text-primary hover:text-tz-accent transition-colors">
                {l.label}
              </Link>
            ))}
            <button onClick={() => { setAuthMode("login"); setAuthOpen(true); setMobileOpen(false); }} className="mt-4 text-tz-text-secondary font-inter">Log In</button>
            <button onClick={() => { setAuthMode("signup"); setAuthOpen(true); setMobileOpen(false); }} className="px-6 py-3 font-syne font-bold rounded-lg text-tz-bg" style={{ background: "linear-gradient(135deg, #00E5FF, #0098C7)" }}>Get Started</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} initialMode={authMode} />
    </>
  );
};

export default Navbar;
