import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useWHP } from '../hooks/useWHP';

export function Logo({ admin = false }) { return <Link to={admin ? '/admin' : '/'} className="logo"><span className="brand-letters">WH</span><span className="brand-text">{admin ? 'ADMIN' : 'PROMPTS'}</span></Link>; }
const links = [['/','Home'],['/about','About'],['/contact','Contact'],['/privacy-policy','Privacy'],['/terms','Terms'],['/disclaimer','Disclaimer'],['/dmca','DMCA']];

function AdminHeader() {
  return <header className="header"><div className="header-inner"><Logo admin/><div className="header-actions"><a className="back-link" href={import.meta.env.BASE_URL} target="_blank" rel="noreferrer">👁 View Site</a><Link className="back-link" to="/">← Back</Link></div></div></header>;
}

function MainHeader({ active }) {
  const { prompts } = useWHP();
  const cats = useMemo(() => [...new Set(prompts.map(p => p.cat))], [prompts]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const onHome = pathname === '/';
  const urlQ = onHome ? (params.get('q') || '') : '';
  const cat = onHome ? (params.get('cat') || 'all') : 'all';
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(false);
  const [q, setQ] = useState(urlQ);
  const ddRef = useRef(null);

  useEffect(() => { setQ(urlQ); }, [urlQ]);
  useEffect(() => {
    if (!dd) return;
    const close = e => { if (ddRef.current && !ddRef.current.contains(e.target)) setDd(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('touchstart', close);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('touchstart', close); };
  }, [dd]);

  const goHome = (n) => { const qs = n.toString(); navigate({ pathname: '/', search: qs ? `?${qs}` : '' }); };
  const onSearch = (v) => {
    setQ(v);
    if (!onHome) return;
    const n = new URLSearchParams(params);
    if (v) n.set('q', v); else n.delete('q');
    setParams(n, { replace: true });
  };
  const submitSearch = (e) => {
    e.preventDefault();
    if (onHome) return;
    const n = new URLSearchParams();
    if (q.trim()) n.set('q', q.trim());
    goHome(n);
  };
  const pickCat = (c) => {
    const n = new URLSearchParams();
    if (c !== 'all') n.set('cat', c);
    if (onHome && params.get('q')) n.set('q', params.get('q'));
    goHome(n);
    setDd(false); setOpen(false);
  };
  const item = ([to, label]) => <Link key={to} className={active === to ? 'active' : ''} to={to} onClick={() => setOpen(false)}>{label}</Link>;

  return <header className="header"><div className="header-inner">
    <Logo/>
    <form className="header-search" role="search" onSubmit={submitSearch}>
      <span className="search-icon">⌕</span>
      <input value={q} onChange={e => onSearch(e.target.value)} placeholder="Search prompts..." autoComplete="off" aria-label="Search prompts"/>
    </form>
    <button className="menu-toggle" onClick={() => setOpen(v => !v)} aria-label="Open menu">{open ? '✕' : '☰'}</button>
    <nav className={`nav ${open ? 'open' : ''}`} aria-label="Main navigation">
      {item(links[0])}
      <div className="nav-dd" ref={ddRef}>
        <button type="button" className={`nav-dd-btn ${cat !== 'all' ? 'active' : ''}`} onClick={() => setDd(v => !v)} aria-haspopup="true" aria-expanded={dd}>
          {cat === 'all' ? 'Categories' : cat} <span className="caret">{dd ? '▴' : '▾'}</span>
        </button>
        {dd && <div className="dd-menu" role="menu">
          <button type="button" role="menuitem" className={cat === 'all' ? 'active' : ''} onClick={() => pickCat('all')}>All Prompts</button>
          {cats.map(c => <button type="button" role="menuitem" key={c} className={cat === c ? 'active' : ''} onClick={() => pickCat(c)}>{c}</button>)}
        </div>}
      </div>
      {links.slice(1).map(item)}
    </nav>
  </div></header>;
}

export function SiteHeader({ active, admin = false }) {
  return admin ? <AdminHeader/> : <MainHeader active={active}/>;
}
export function SiteFooter({ short = false }) { return <footer className="footer"><p>© {new Date().getFullYear()} WHprompts. All rights reserved.{short ? <> · <Link to="/">Home</Link> · <Link to="/privacy-policy">Privacy</Link> · <Link to="/contact">Contact</Link></> : ''}</p></footer>; }
export function Toast({ message, error = false, success = false }) { return <div className={`toast show ${error ? 'error' : success ? 'success' : ''}`}>{message}</div>; }
