import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Logo({ admin = false }) { return <Link to={admin ? '/admin' : '/'} className="logo"><span className="brand-letters">WH</span><span className="brand-text">{admin ? 'ADMIN' : 'PROMPTS'}</span></Link>; }
const links = [['/','Home'],['/about','About'],['/contact','Contact'],['/privacy-policy','Privacy'],['/terms','Terms'],['/disclaimer','Disclaimer'],['/dmca','DMCA']];
export function SiteHeader({ active, admin = false }) {
  const [open, setOpen] = useState(false);
  return <header className="header"><div className="header-inner"><Logo admin={admin}/>{admin ? <div className="header-actions"><a className="back-link" href={import.meta.env.BASE_URL} target="_blank" rel="noreferrer">👁 View Site</a><Link className="back-link" to="/">← Back</Link></div> : <><button className="menu-toggle" onClick={() => setOpen(v => !v)} aria-label="Open menu">{open ? '✕' : '☰'}</button><nav className={`nav ${open ? 'open' : ''}`} aria-label="Main navigation">{links.map(([to,label]) => <Link key={to} className={active === to ? 'active' : ''} to={to} onClick={() => setOpen(false)}>{label}</Link>)}</nav></>}</div></header>;
}
export function SiteFooter({ short = false }) { return <footer className="footer"><p>© {new Date().getFullYear()} WHprompts. All rights reserved.{short ? <> · <Link to="/">Home</Link> · <Link to="/privacy-policy">Privacy</Link> · <Link to="/contact">Contact</Link></> : ''}</p></footer>; }
export function Toast({ message, error = false, success = false }) { return <div className={`toast show ${error ? 'error' : success ? 'success' : ''}`}>{message}</div>; }
