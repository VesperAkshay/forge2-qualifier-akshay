import React, { useState } from 'react';
import { useDrag, useDrop } from '@hello-pangea/dnd';
import { Trash2, Edit, Tag, Users, Calendar } from 'lucide-react';
import { cardAPI, tagAPI, memberAPI } from '../api';

const Card = ({ card, listId, moveCard, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(card.title);
  const [editDescription, setEditDescription] = useState(card.description || '');
  const [showMenu, setShowMenu] = useState(false);
  const [assignedTags, setAssignedTags] = useState([]);
  const [assignedMembers, setAssignedMembers] = useState([]);

  // Load assigned tags and members
  React.useEffect(() => {
    const loadRelations = async () => {
      try {
        // In a real app, we'd fetch these from the backend
        // For now, we'll simulate with empty arrays since our API doesn't return relations by default
        setAssignedTags([]);
        setAssignedMembers([]);
      } catch (error) {
        console.error('Failed to load card relations:', error);
      }
    };
    loadRelations();
  }, [card.id]);

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'card',
    item: { id: card.id, from: listId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'card',
    hover: (item) => {
      if (!item.id) return;
      if (item.id === card.id) return;
      // Move card to different position in same list
      moveCard(item.id, listId, item.index, index);
      // Update the index to reflect new position
      item.index = index;
    },
  });

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await cardAPI.delete(card.id);
        // Notify parent to refresh
        window.dispatchEvent(new Event('cardDeleted'));
      } catch (error) {
        alert('Failed to delete card: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleSaveEdit = async () => {
    try {
      await cardAPI.update(card.id, {
        title: editTitle,
        description: editDescription
      });
      setIsEditing(false);
      // Notify parent to refresh
      window.dispatchEvent(new Event('cardUpdated'));
    } catch (error) {
      alert('Failed to update card: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleTagClick = async (tagId) => {
    try {
      // Toggle tag assignment
      const isCurrentlyAssigned = assignedTags.includes(tagId);
      if (isCurrentlyAssigned) {
        await tagAPI.detachTag(card.id, tagId);
        setAssignedTags(assignedTags.filter(id => id !== tagId));
      } else {
        await tagAPI.attachTag(card.id, tagId);
        setAssignedTags([...assignedTags, tagId]);
      }
    } catch (error) {
      alert('Failed to update tag: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleMemberClick = async (memberId) => {
    try {
      // Toggle member assignment
      const isCurrentlyAssigned = assignedMembers.includes(memberId);
      if (isCurrentlyAssigned) {
        await memberAPI.detachMember(card.id, memberId);
        setAssignedMembers(assignedMembers.filter(id => id !== memberId));
      } else {
        await memberAPI.attachMember(card.id, memberId);
        setAssignedMembers([...assignedMembers, memberId]);
      }
    } catch (error) {
      alert('Failed to update member: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div
      ref={(node) => {
        preview(node);
        drag(node);
      }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        transition: 'opacity 0.2s',
        ...(isDragging && {
          transform: 'scale(1.02)',
        }),
      }}
      className="drag-item"
    >
      <div className="glass-card" style={{ 
        padding: '1rem', 
        borderLeft: '4px solid var(--accent-primary)',
        position: 'relative',
        minHeight: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {!isEditing ? (
          <>
            <h4 style={{ 
              margin: '0 0 0.5rem 0', 
              fontSize: '0.95rem',
              wordBreak: 'break-word'
            }}>
              {card.title}
            </h4>
            {card.description && (
              <p style={{ 
                margin: '0 0 1rem 0', 
                fontSize: '0.8rem', 
                color: 'var(--text-muted)',
                lineHeight: '1.4',
                flex: 1
              }}>
                {card.description}
              </p>
            )}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '0.5rem', 
              marginTop: 'auto',
              alignItems: 'center'
            }}>
              {/* Tags */}
              {assignedTags.map(tag => (
                <span 
                  key={`tag-${tag}`} 
                  onClick={() => handleTagClick(tag)}
                  style={{
                    background: 'var(--bg-muted)',
                    color: 'var(--text-primary)',
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    border: '1px solid var(--border)'
                  }}
                >
                  Tag
                </span>
              ))}
              
              {/* Members */}
              {assignedMembers.map(member => (
                <span 
                  key={`member-${member}`} 
                  onClick={() => handleMemberClick(member)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    fontSize: '0.7rem'
                  }}
                >
                  <Users size={12} color="var(--accent-secondary)" />
                  M
                </span>
              ))}
              
              {/* Due Date */}
              {card.due_date && (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  fontSize: '0.7rem',
                  color: new Date(card.due_date) < new Date() ? 'var(--error)' : 'var(--text-muted)'
                }}>
                  <Calendar size={14} />
                  {new Date(card.due_date).toLocaleDateString()}
                </span>
              )}
            </div>
            
            <div style={{ 
              marginTop: '1rem', 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '0.5rem'
            }}>
              <button 
                onClick={() => setIsEditing(true)}
                className="btn btn-ghost btn-sm"
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
              >
                <Edit size={14} /> Edit
              </button>
              <button 
                onClick={handleDelete}
                className="btn btn-ghost btn-sm"
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'var(--error)' }}
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
              autoFocus
              className="input input-sm"
              style={{ 
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                padding: '0.5rem'
              }}
              placeholder="Card title"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && handleSaveEdit()}
              className="textarea textarea-sm"
              style={{ 
                marginBottom: '1rem',
                fontSize: '0.85rem',
                padding: '0.5rem',
                minHeight: '60px',
                resize: 'vertical'
              }}
              placeholder="Card description (optional)"
            />
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '0.5rem'
            }}>
              <button 
                onClick={handleSaveEdit}
                className="btn btn-primary btn-sm"
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
              >
                Save
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="btn btn-ghost btn-sm"
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;