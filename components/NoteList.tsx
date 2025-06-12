import React from 'react';
import { Note } from '../types/game';

interface NoteListProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NoteList: React.FC<NoteListProps> = ({ notes, selectedNoteId, onSelect, onAdd, onEdit, onDelete }) => (
  <div className="h-full flex flex-col">    <div className="flex justify-between items-center mb-3">
      <h2 className="text-lg font-bold text-emerald-400">Notes</h2>
      <button 
        className="bg-emerald-600 hover:bg-emerald-500 px-2.5 py-1 rounded-md text-white font-medium shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 cursor-pointer ml-4" 
        onClick={onAdd}
      >
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add
        </span>
      </button>
    </div>
    <div className="overflow-y-auto flex-1">
      {notes.length === 0 && (
        <div className="text-slate-500 text-center py-4 px-3 bg-slate-700/30 rounded-md border border-slate-600/30">
          No notes yet
        </div>
      )}
      <ul className="space-y-2">
        {notes.map(note => (
          <li 
            key={note.id} 
            className={`group relative flex items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-150 ${
              selectedNoteId === note.id 
                ? 'bg-emerald-600/30 border border-emerald-500/50 shadow-sm' 
                : 'hover:bg-slate-700/40 border border-transparent hover:border-slate-600/30'
            }`}
            onClick={() => onSelect(note.id)}
          >
            <span className="truncate flex-1 font-medium pr-12" title={note.title}>{note.title}</span>
            <div className={`absolute right-2 flex items-center space-x-1 ${selectedNoteId === note.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
              <button 
                className="p-1 rounded-md text-slate-400 hover:text-yellow-300 hover:bg-slate-600/50 cursor-pointer" 
                onClick={e => { e.stopPropagation(); onEdit(note.id); }}
                title="Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button 
                className="p-1 rounded-md text-slate-400 hover:text-red-400 hover:bg-slate-600/50 cursor-pointer" 
                onClick={e => { e.stopPropagation(); onDelete(note.id); }}
                title="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
