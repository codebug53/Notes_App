import React, { useState, useEffect } from 'react';
import { FOLDERS, INITIAL_NOTEBOOK_NOTES } from './data/notebookData';
import { INITIAL_STUDENT_TASKS } from './data/tasksData';
import { LeftSidebar } from './components/LeftSidebar';
import { CenterHeader } from './components/CenterHeader';
import { CurrentModuleCard } from './components/CurrentModuleCard';
import { GuidedLesson } from './components/GuidedLesson';
import { CodePlayground } from './components/CodePlayground';
import { RightPanel } from './components/RightPanel';
import { NoteEditorModal } from './components/NoteEditorModal';
import { FlashcardsView } from './components/FlashcardsView';
import { FormulaCheatSheet } from './components/FormulaCheatSheet';
import { TaskTracker } from './components/TaskTracker';
import { PomodoroTimer } from './components/PomodoroTimer';
import { AIAssistantPanel } from './components/AIAssistantPanel';
import { Menu, GraduationCap } from 'lucide-react';

export default function App() {
  // Load notes from localStorage or initial dataset
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('studysphere_notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTEBOOK_NOTES;
  });

  // Load student tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('studysphere_tasks');
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_TASKS;
  });

  const [activeFolderId, setActiveFolderId] = useState('all');
  const [selectedNoteId, setSelectedNoteId] = useState(notes[0]?.id || 'note-1');
  const [activeTab, setActiveTab] = useState('Read Note');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mobile drawer state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Editor Modal State
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  // Sync notes to localStorage
  useEffect(() => {
    localStorage.setItem('studysphere_notes', JSON.stringify(notes));
  }, [notes]);

  // Sync tasks to localStorage
  useEffect(() => {
    localStorage.setItem('studysphere_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Filter notes by active folder & search query
  const folderNotes = notes.filter(n => {
    const matchesFolder = activeFolderId === 'all' || n.folderId === activeFolderId;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      n.title.toLowerCase().includes(q) ||
      n.summary.toLowerCase().includes(q) ||
      n.subject.toLowerCase().includes(q) ||
      (n.tags && n.tags.some(t => t.toLowerCase().includes(q))) ||
      (n.cues && n.cues.some(c => c.toLowerCase().includes(q)))
    );
    return matchesFolder && matchesSearch;
  });

  // Currently active note
  const activeNote = folderNotes.find(n => n.id === selectedNoteId) || folderNotes[0] || notes[0];

  // Save / Update Note Handler
  const handleSaveNote = (savedNote) => {
    const exists = notes.some(n => n.id === savedNote.id);
    if (exists) {
      setNotes(notes.map(n => n.id === savedNote.id ? savedNote : n));
    } else {
      setNotes([savedNote, ...notes]);
      setSelectedNoteId(savedNote.id);
    }
  };

  // Delete Note Handler
  const handleDeleteNote = (noteId) => {
    if (window.confirm("Are you sure you want to delete this study note?")) {
      const updated = notes.filter(n => n.id !== noteId);
      setNotes(updated);
      if (selectedNoteId === noteId && updated.length > 0) {
        setSelectedNoteId(updated[0].id);
      }
    }
  };

  // Export Notes Backup
  const handleExportNotes = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(notes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `StudySphere_Notes_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const activeFolderObj = FOLDERS.find(f => f.id === activeFolderId) || FOLDERS[0];
  const currentNoteIndex = folderNotes.findIndex(n => n?.id === activeNote?.id) + 1;

  return (
    <div className="master-frame">
      {/* Mobile Header Bar */}
      <div className="mobile-sidebar-toggle">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
            <GraduationCap size={16} />
          </div>
          <span>StudySphere Notebook</span>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}
        >
          <Menu size={22} />
        </button>
      </div>

      {/* 1. Left Sidebar */}
      <LeftSidebar
        folders={FOLDERS}
        activeFolderId={activeFolderId}
        onSelectFolder={(id) => {
          setActiveFolderId(id);
          const firstInFolder = notes.find(n => id === 'all' || n.folderId === id);
          if (firstInFolder) setSelectedNoteId(firstInFolder.id);
        }}
        onOpenNewNoteModal={() => {
          setNoteToEdit(null);
          setShowEditorModal(true);
        }}
        totalNotesCount={notes.length}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onExportNotes={handleExportNotes}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* 2. Center Workspace Column */}
      <main className="center-content">
        <CenterHeader
          folders={FOLDERS}
          activeFolderId={activeFolderId}
          onSelectFolder={(id) => {
            setActiveFolderId(id);
            const firstInFolder = notes.find(n => id === 'all' || n.folderId === id);
            if (firstInFolder) setSelectedNoteId(firstInFolder.id);
          }}
        />

        <CurrentModuleCard
          folderName={activeFolderObj.name}
          noteIndex={Math.max(1, currentNoteIndex)}
          totalNotes={Math.max(1, folderNotes.length)}
          streakDays={14}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenNewNote={() => {
            setNoteToEdit(null);
            setShowEditorModal(true);
          }}
        />

        {/* Dynamic Workspace Views */}
        {activeTab === 'Read Note' ? (
          <div className="split-workspace" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '14px', alignItems: 'stretch' }}>
            <GuidedLesson
              note={activeNote}
              allNotes={notes}
              onSelectNote={(n) => setSelectedNoteId(n.id)}
              onEditNote={(n) => {
                setNoteToEdit(n);
                setShowEditorModal(true);
              }}
              onDeleteNote={handleDeleteNote}
            />

            <CodePlayground
              initialCode={activeNote?.code || `// Interactive JS Code Sandbox\nconsole.log("No algorithm code attached to this note.");`}
              testCases={activeNote?.pyqs ? [{ input: activeNote.testInput || "test", expected: activeNote.expectedOutput || "ok" }] : []}
            />
          </div>
        ) : activeTab === 'AI Assistant' ? (
          <AIAssistantPanel activeNote={activeNote} />
        ) : activeTab === 'Flashcards' ? (
          <FlashcardsView />
        ) : activeTab === 'Tasks & Homework' ? (
          <TaskTracker
            tasks={tasks}
            setTasks={setTasks}
            notes={notes}
            onSelectNote={(n) => {
              setSelectedNoteId(n.id);
              setActiveTab('Read Note');
            }}
          />
        ) : activeTab === 'Formula Sheet' ? (
          <FormulaCheatSheet />
        ) : activeTab === 'Focus Timer' ? (
          <PomodoroTimer />
        ) : null}
      </main>

      {/* 3. Right Panel */}
      <RightPanel
        notesCount={notes.length}
        pyqsSolved={42}
        revisionAccuracy={94}
        onContinueRevision={() => setActiveTab('Read Note')}
      />

      {/* Note Editor Modal */}
      {showEditorModal && (
        <NoteEditorModal
          noteToEdit={noteToEdit}
          folders={FOLDERS}
          onClose={() => {
            setShowEditorModal(false);
            setNoteToEdit(null);
          }}
          onSaveNote={handleSaveNote}
        />
      )}
    </div>
  );
}
