import React, { useState, useEffect } from 'react';
import { Game } from '../types/game';

interface GameEditorProps {
  game: Game | null;
  onSave: (name: string) => void;
  onCancel: () => void;
}

export const GameEditor: React.FC<GameEditorProps> = ({ game, onSave, onCancel }) => {
  const [name, setName] = useState(game?.name || '');

  useEffect(() => {
    setName(game?.name || '');
  }, [game]);
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="gameName" className="block text-sm font-medium text-slate-300 mb-2">Game Name</label>
        <input
          id="gameName"
          className="w-full px-4 py-4 rounded-md bg-slate-700/70 text-white border border-slate-600/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
          placeholder="Enter game name"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={64}
          autoFocus
        />
      </div>
      <div className="flex justify-end pt-4">
        <button 
          className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-md transition-colors border border-slate-500/30 shadow-sm font-medium mr-3" 
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          className={`px-5 py-2 rounded-md text-white transition-all shadow-md font-medium ${
            !name.trim() 
              ? 'bg-indigo-600/50 cursor-not-allowed opacity-70 border border-indigo-500/30' 
              : 'bg-indigo-600 hover:bg-indigo-500 cursor-pointer border border-indigo-500'
          }`} 
          onClick={() => onSave(name)} 
          disabled={!name.trim()}
        >
          Save
        </button>
      </div>
    </div>
  );
};
