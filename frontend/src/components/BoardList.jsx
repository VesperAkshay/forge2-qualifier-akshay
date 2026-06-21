import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { boardAPI } from '../api';

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await boardAPI.getAll();
      setBoards(response.data);
    } catch (error) {
      console.error('Failed to fetch boards:', error);
    } finally {
      setLoading(false);
    }
  };

  const createBoard = async () => {
    const title = prompt('Enter board name:');
    if (!title) return;
    
    try {
      await boardAPI.create({ title, description: '' });
      fetchBoards();
    } catch (error) {
      alert('Failed to create board');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Your Boards</h1>
        <button className="btn btn-primary" onClick={createBoard}>
          <Plus size={18} /> New Board
        </button>
      </div>

      {loading ? (
        <p>Loading boards...</p>
      ) : boards.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <p>No boards found. Create one to get started!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {boards.map(board => (
            <Link to={`/boards/${board.id}`} key={board.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="glass-card" style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: 'var(--accent-primary)' }}>{board.title}</h3>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', flex: 1 }}>
                  {board.description || 'No description provided.'}
                </p>
                <div style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Created {new Date(board.created_at).toLocaleDateString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardList;
