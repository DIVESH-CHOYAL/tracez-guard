import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  initialMode: "login" | "signup";
}

const AuthModal = ({ open, onClose, initialMode }: AuthModalProps) => {
  const [mode, setMode] = useState(initialMode);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }} onClick={onClose}>
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="glass-card-static w-full max-w-[420px] p-10 mx-4" style={{ borderRadius: 20 }}>
          <div className="flex gap-4 mb-8">
            <button onClick={() => setMode("login")} className={`font-syne font-bold text-lg pb-2 border-b-2 transition-colors ${mode === "login" ? "text-tz-accent border-tz-accent" : "text-tz-text-muted border-transparent"}`}>Log In</button>
            <button onClick={() => setMode("signup")} className={`font-syne font-bold text-lg pb-2 border-b-2 transition-colors ${mode === "signup" ? "text-tz-accent border-transparent" : "text-tz-text-muted border-transparent"}`}>Sign Up</button>
          </div>

          <div className="space-y-4">
            <input type="email" placeholder="Email" className="w-full h-12 px-4 rounded-lg font-inter text-sm text-tz-text-primary placeholder:text-tz-text-muted glass-card-static border-none outline-none focus:ring-1 focus:ring-tz-accent bg-transparent" style={{ background: "hsl(var(--bg-surface))" }} />
            <input type="password" placeholder="Password" className="w-full h-12 px-4 rounded-lg font-inter text-sm text-tz-text-primary placeholder:text-tz-text-muted glass-card-static border-none outline-none focus:ring-1 focus:ring-tz-accent bg-transparent" style={{ background: "hsl(var(--bg-surface))" }} />
            {mode === "signup" && <input type="password" placeholder="Confirm Password" className="w-full h-12 px-4 rounded-lg font-inter text-sm text-tz-text-primary placeholder:text-tz-text-muted outline-none focus:ring-1 focus:ring-tz-accent bg-transparent" style={{ background: "hsl(var(--bg-surface))" }} />}
            {mode === "login" && <p className="text-right font-inter text-[13px] text-tz-accent cursor-pointer hover:underline">Forgot password?</p>}
            <button className="w-full h-12 rounded-lg font-syne font-bold text-tz-bg" style={{ background: "linear-gradient(135deg, #00E5FF, #0098C7)" }}>
              {mode === "login" ? "Log In" : "Sign Up"}
            </button>
          </div>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="font-inter text-xs text-tz-text-muted">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button className="w-full h-12 rounded-lg font-inter text-sm text-tz-text-secondary border border-border hover:border-tz-text-muted transition-colors flex items-center justify-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <p className="font-space text-[11px] text-tz-text-muted text-center mt-6">JWT token stored in memory only — never in localStorage or cookies.</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
