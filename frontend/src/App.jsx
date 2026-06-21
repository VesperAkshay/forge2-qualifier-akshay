import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { KanbanSquare } from 'lucide-react';
import BoardList from './components/BoardList';
import BoardView from './components/BoardView';

function App() {
  return (
    <div className="app-container">
      <header className="app-header glass-panel">
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
          <KanbanSquare size={24} color="var(--accent-primary)" />
          <h2 style={{ margin: 0 }}>TinyKanban</h2>
        </Link>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Laravel + React
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<BoardList />} />
          <Route path="/boards/:id" element={<BoardView />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
