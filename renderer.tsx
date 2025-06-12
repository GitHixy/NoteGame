import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Game, Note } from './types/game';
import { GameList } from './components/GameList';
import { NoteList } from './components/NoteList';
import { NoteEditor } from './components/NoteEditor';
import { GameEditor } from './components/GameEditor';

function uuid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// Chiavi per il localStorage
const STORAGE_KEYS = {
  GAMES: 'notegame:games',
  SELECTED_GAME: 'notegame:selectedGame',
  SELECTED_NOTE: 'notegame:selectedNote'
};

// Funzioni helper per il localStorage
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error('Errore nel caricamento dei dati:', error);
    return defaultValue;
  }
};

const saveToStorage = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Errore nel salvataggio dei dati:', error);
  }
};

const App = () => {
  // Carica i dati dal localStorage all'avvio dell'app
  const [games, setGames] = useState<Game[]>(() => loadFromStorage(STORAGE_KEYS.GAMES, []));
  const [selectedGameId, setSelectedGameId] = useState<string | null>(() => loadFromStorage(STORAGE_KEYS.SELECTED_GAME, null));
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(() => loadFromStorage(STORAGE_KEYS.SELECTED_NOTE, null));
  const [editingGameId, setEditingGameId] = useState<string | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [showGameEditor, setShowGameEditor] = useState(false);
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  
  // Salva i dati nel localStorage ogni volta che cambiano
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.GAMES, games);
  }, [games]);
  
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SELECTED_GAME, selectedGameId);
  }, [selectedGameId]);
  
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SELECTED_NOTE, selectedNoteId);
  }, [selectedNoteId]);
  // Game CRUD
  const handleAddGame = () => {
    setEditingGameId(null);
    setShowGameEditor(true);
    // Close note editor if open
    if (showNoteEditor) {
      setShowNoteEditor(false);
      setEditingNoteId(null);
    }
  };
  const handleEditGame = (id: string) => {
    setEditingGameId(id);
    setShowGameEditor(true);
    // Close note editor if open
    if (showNoteEditor) {
      setShowNoteEditor(false);
      setEditingNoteId(null);
    }
  };
  const handleDeleteGame = (id: string) => {
    setGames(games => games.filter(g => g.id !== id));
    if (selectedGameId === id) {
      setSelectedGameId(null);
      setSelectedNoteId(null);
    }
  };
  const handleSaveGame = (name: string) => {
    if (editingGameId) {
      setGames(games => games.map(g => g.id === editingGameId ? { ...g, name } : g));
    } else {
      setGames(games => [...games, { id: uuid(), name, notes: [] }]);
    }
    setShowGameEditor(false);
    setEditingGameId(null);
  };

  // Note CRUD
  const selectedGame = games.find(g => g.id === selectedGameId) || null;
  const notes = selectedGame ? selectedGame.notes : [];
  const handleAddNote = () => {
    setEditingNoteId(null);
    setShowNoteEditor(true);
    // Close game editor if open
    if (showGameEditor) {
      setShowGameEditor(false);
      setEditingGameId(null);
    }
  };
  const handleEditNote = (id: string) => {
    setEditingNoteId(id);
    setShowNoteEditor(true);
    // Close game editor if open
    if (showGameEditor) {
      setShowGameEditor(false);
      setEditingGameId(null);
    }
  };
  const handleDeleteNote = (id: string) => {
    setGames(games => games.map(g => g.id === selectedGameId ? { ...g, notes: g.notes.filter(n => n.id !== id) } : g));
    if (selectedNoteId === id) setSelectedNoteId(null);
  };
  const handleSaveNote = (note: Omit<Note, 'id'>) => {
    if (!selectedGameId) return;
    if (editingNoteId) {
      setGames(games => games.map(g => g.id === selectedGameId ? { ...g, notes: g.notes.map(n => n.id === editingNoteId ? { ...n, ...note } : n) } : g));
    } else {
      setGames(games => games.map(g => g.id === selectedGameId ? { ...g, notes: [...g.notes, { id: uuid(), ...note }] } : g));
    }
    setShowNoteEditor(false);
    setEditingNoteId(null);
  };

  // UI
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* App Header */}
      <div className="w-full p-4 flex items-center border-b border-slate-700/50">
        <img src="app_icon.png" alt="NoteGame Logo" className="h-10 w-10 rounded-lg shadow-lg mr-3" />
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">NoteGame</h1>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-full h-full">
          {/* Game List Panel */}
          <div className="w-1/4 h-full p-4 border-r border-slate-700/50 overflow-y-auto">
            <GameList
              games={games}
              selectedGameId={selectedGameId}
              onSelect={id => { setSelectedGameId(id); setSelectedNoteId(null); }}
              onAdd={handleAddGame}
              onEdit={handleEditGame}
              onDelete={handleDeleteGame}
            />
          </div>
          
          {/* Note List Panel */}
          <div className="w-1/4 h-full p-4 border-r border-slate-700/50 overflow-y-auto">
            {selectedGame ? (
              <NoteList
                notes={notes}
                selectedNoteId={selectedNoteId}
                onSelect={setSelectedNoteId}
                onAdd={handleAddNote}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>Select a game to view notes</p>
              </div>
            )}
          </div>
          
          {/* Content Panel */}
          <div className="w-2/4 h-full p-4 overflow-y-auto">
            {/* Editors */}
            {showGameEditor && (
              <div className="bg-slate-700/50 rounded-lg p-5 border border-slate-600/50 shadow-lg h-full">
                <h2 className="text-xl font-bold mb-4 text-slate-200">{editingGameId ? 'Edit Game' : 'Add New Game'}</h2>
                <GameEditor
                  game={editingGameId ? games.find(g => g.id === editingGameId) || null : null}
                  onSave={handleSaveGame}
                  onCancel={() => { setShowGameEditor(false); setEditingGameId(null); }}
                />
              </div>
            )}
            
            {showNoteEditor && selectedGame && (
              <div className="bg-slate-700/50 rounded-lg p-5 border border-slate-600/50 shadow-lg h-full">
                <h2 className="text-xl font-bold mb-4 text-slate-200">{editingNoteId ? 'Edit Note' : 'Add New Note'}</h2>
                <NoteEditor
                  note={editingNoteId ? notes.find(n => n.id === editingNoteId) || null : null}
                  onSave={handleSaveNote}
                  onCancel={() => { setShowNoteEditor(false); setEditingNoteId(null); }}
                />
              </div>
            )}
            
            {/* Note Content View */}
            {!showGameEditor && !showNoteEditor && selectedGame && selectedNoteId && (
              <div className="h-full flex flex-col">
                <h2 className="text-xl font-bold text-emerald-400 mb-3">{notes.find(n => n.id === selectedNoteId)?.title}</h2>
                <div className="flex-1 whitespace-pre-line bg-slate-700/50 p-5 rounded-lg border border-slate-600/50 text-slate-200 shadow-inner overflow-y-auto">
                  {notes.find(n => n.id === selectedNoteId)?.text || 
                    <span className="text-slate-500 italic">No content</span>}
                </div>
              </div>
            )}
            
            {/* Empty States */}
            {!showGameEditor && !showNoteEditor && (!selectedGame || !selectedNoteId) && !games.length && (
              <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                <p className="text-lg mb-2">Welcome to NoteGame</p>
                <p className="mb-4 text-center">Start by adding your first game</p>
                <button 
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-md cursor-pointer"
                  onClick={handleAddGame}
                >
                  Add Your First Game
                </button>
              </div>
            )}
            
            {!showGameEditor && !showNoteEditor && (!selectedGame || !selectedNoteId) && games.length > 0 && !selectedGame && (
              <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p>Select a game to get started</p>
              </div>
            )}
            
            {!showGameEditor && !showNoteEditor && selectedGame && !selectedNoteId && notes.length > 0 && (
              <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <p>Select a note to view details</p>
              </div>
            )}
            
            {!showGameEditor && !showNoteEditor && selectedGame && !selectedNoteId && !notes.length && (
              <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mb-4">No notes yet for {selectedGame.name}</p>
                <button 
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-md cursor-pointer"
                  onClick={handleAddNote}
                >
                  Add Your First Note
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
