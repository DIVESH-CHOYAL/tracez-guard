import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border py-12 px-6 md:px-12" style={{ background: "rgba(8,9,13,0.95)" }}>
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
      <div>
        <span className="font-syne font-bold text-lg text-tz-accent">TraceZ</span>
        <p className="font-space text-[11px] text-tz-text-muted mt-2">© 2025 TraceZ Security Platform · Confidential</p>
      </div>
      <div className="flex flex-wrap gap-6 font-inter text-sm text-tz-text-muted">
        <Link to="#" className="hover:text-tz-text-secondary transition-colors">Privacy</Link>
        <Link to="#" className="hover:text-tz-text-secondary transition-colors">Terms</Link>
        <Link to="/trz-database" className="hover:text-tz-text-secondary transition-colors">TRZ Database</Link>
        <Link to="#" className="hover:text-tz-text-secondary transition-colors">API Docs</Link>
        <Link to="#" className="hover:text-tz-text-secondary transition-colors">Status</Link>
      </div>
      <p className="font-space text-[11px] text-tz-text-muted">Free: 5 scans/day · Pro: ₹199/mo unlimited · API: custom pricing</p>
    </div>
  </footer>
);

export default Footer;
