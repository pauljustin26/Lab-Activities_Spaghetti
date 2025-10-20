import React from 'react';

export default function NoteItem({ note, onDelete }) {
  return (
    <li style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>{note.content}</span>
      <button 
        onClick={() => onDelete(note._id)} 
        style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
      >
        Delete
      </button>
    </li>
  );
}
