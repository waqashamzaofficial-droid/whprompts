import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/home.css';
import './styles/admin.css';

class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: 'sans-serif', color: '#fff', background: '#0b0b12', minHeight: '100vh' }}>
          <h2>Something went wrong</h2>
          <p>Please refresh the page. If it keeps happening, clear this site's data and try again.</p>
          <pre style={{ whiteSpace: 'pre-wrap', opacity: .7 }}>{String(this.state.error)}</pre>
          <button onClick={() => { try { localStorage.clear(); } catch (e) {} location.reload(); }}>Reset &amp; reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode><ErrorBoundary><App /></ErrorBoundary></React.StrictMode>
);
