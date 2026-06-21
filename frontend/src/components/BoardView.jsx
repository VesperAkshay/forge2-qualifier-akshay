import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { boardAPI, listAPI, cardAPI } from '../api';

const BoardView = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoardData();
  }, [id]);

  const fetchBoardData = async () => {
    try {
      const response = await boardAPI.get(id);
      setBoard(response.data);
      // Fetch lists separately if they aren't nested in the response
      const listsRes = await listAPI.getAll(id);
      setLists(listsRes.data);
    } catch (error) {
      console.error('Failed to fetch board data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createList = async () => {
    const title = prompt('Enter list name:');
    if (!title) return;
    try {
      await listAPI.create({ title, board_id: id, position: lists.length });
      fetchBoardData();
    } catch (error) {
      alert('Failed to create list');
    }
  };

  if (loading) return <p style={{ padding: '2rem' }}>Loading board...</p>;
  if (!board) return <p style={{ padding: '2rem' }}>Board not found.</p>;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/" className="btn btn-ghost" style={{ padding: '0.5rem' }}>
          <ArrowLeft size={20} />
        </Link>
        <h1 style={{ margin: 0 }}>{board.title}</h1>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', flex: 1, paddingBottom: '1rem', alignItems: 'flex-start' }}>
        {lists.map(list => (
          <div key={list.id} className="glass-panel" style={{ minWidth: '300px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>{list.title}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Render cards if available */}
              {list.cards && list.cards.map(card => (
                <div key={card.id} className="glass-card" style={{ padding: '1rem', cursor: 'pointer' }}>
                  <h4 style={{ margin: 0, fontSize: '0.875rem' }}>{card.title}</h4>
                </div>
              ))}
            </div>

            <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => {
              const title = prompt('Enter card title:');
              if(title) {
                cardAPI.create({ title, list_id: list.id, position: list.cards ? list.cards.length : 0 })
                  .then(() => fetchBoardData())
                  .catch(err => alert('Failed to create card: ' + (err.response?.data?.message || err.message)));
              }
            }}>
              <Plus size={16} /> Add Card
            </button>
          </div>
        ))}

        <button className="btn btn-ghost glass-panel" style={{ minWidth: '300px', padding: '1rem', display: 'flex', justifyContent: 'center' }} onClick={createList}>
          <Plus size={18} /> Add another list
        </button>
      </div>
    </div>
  );
};

export default BoardView;
