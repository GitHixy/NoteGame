import React, { useState, useEffect } from 'react';
import { Note } from '../types/game';

interface NoteEditorProps {
  note: Note | null;
  onSave: (note: Omit<Note, 'id'>) => void;
  onCancel: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [text, setText] = useState(note?.text || '');

  useEffect(() => {
    setTitle(note?.title || '');
    setText(note?.text || '');
  }, [note]);

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div>
        <label htmlFor="noteTitle" className="block text-sm font-medium text-slate-300 mb-1">Note Title</label>
        <input
          id="noteTitle"
          className="w-full px-4 py-4 rounded-md bg-slate-700/70 text-white border border-slate-600/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
          placeholder="Enter note title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          maxLength={64}
          autoFocus
        />
      </div>
      
      <div className="flex-1 flex flex-col">
        <label htmlFor="noteText" className="block text-sm font-medium text-slate-300 mb-1">Note Content</label>
        <div className="flex flex-col h-96">
          <textarea
            id="noteText"
            className="w-full px-4 py-4 rounded-t-md bg-slate-700/70 text-white border border-slate-600/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
            placeholder="Enter your notes here"
            value={text}
            onChange={e => setText(e.target.value)}
            maxLength={2048}
            style={{ height: "calc(100% - 60px)" }}
          />
          <div className="p-3 bg-slate-700/90 rounded-b-md border-t border-slate-600/30 flex gap-3 justify-end">
            <button 
              className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-md transition-colors border border-slate-500/30 shadow-sm font-medium" 
              onClick={onCancel}
            >
              Cancel
            </button>
            <button 
              className={`px-5 py-2 rounded-md text-white transition-all shadow-md font-medium ${
                !title.trim()
                  ? 'bg-emerald-600/50 cursor-not-allowed opacity-70 border border-emerald-500/30' 
                  : 'bg-emerald-600 hover:bg-emerald-500 cursor-pointer border border-emerald-500'
              }`} 
              onClick={() => onSave({ title, text })} 
              disabled={!title.trim()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
