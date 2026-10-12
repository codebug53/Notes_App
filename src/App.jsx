import React, { useState, useEffect } from 'react';
import { FOLDERS, INITIAL_NOTEBOOK_NOTES } from './data/notebookData';
import { INITIAL_DAILY_TODOS, INITIAL_LONG_TERM_TASKS, INITIAL_STUDENT_TASKS } from './data/tasksData';
import { INITIAL_FLASHCARDS } from './data/flashcards';
import { LeftSidebar } from './components/LeftSidebar';
import { CenterHeader } from './components/CenterHeader';
import { CurrentModuleCard } from './components/CurrentModuleCard';
import { RightPanel } from './components/RightPanel';
import { NoteEditorModal } from './components/NoteEditorModal';
import { FlashcardsView } from './components/FlashcardsView';
import { FormulaCheatSheet } from './components/FormulaCheatSheet';
import { TaskTracker } from './components/TaskTracker';
import { PomodoroTimer } from './components/PomodoroTimer';
import { Menu, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function App() {
  // Load notes from localStorage or initial dataset
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('studysphere_notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTEBOOK_NOTES;
  });

  // Load daily todos from localStorage or initial dataset
  const [dailyTodos, setDailyTodos] = useState(() => {
    const saved = localStorage.getItem('studysphere_daily_todos');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    // Check if legacy tasks exist to migrate
    const legacy = localStorage.getItem('studysphere_tasks');
    if (legacy) {
      try {
        const parsedLegacy = JSON.parse(legacy);
        if (Array.isArray(parsedLegacy) && parsedLegacy.length > 0) {
          return parsedLegacy.map(t => ({
            id: t.id,
            title: t.title,
            subject: t.subject || 'CS & Algorithms',
            priority: t.priority || 'Medium',
            timeEstimate: '30m',
            completed: t.status === 'Completed',
            dueDate: t.dueDate || 'Today'
          }));
        }
      } catch (e) { console.error(e); }
    }
    return INITIAL_DAILY_TODOS;
  });

  // Load long-term tasks from localStorage or initial dataset
  const [longTermTasks, setLongTermTasks] = useState(() => {
    const saved = localStorage.getItem('studysphere_longterm_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_LONG_TERM_TASKS;
  });

  // Load flashcards from localStorage or initial dataset
  const [flashcards, setFlashcards] = useState(() => {
    const saved = localStorage.getItem('studysphere_flashcards');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(c => {
          if (!c.content) {
            const contentParts = [
              `# ${c.title || c.question || 'Untitled Flashcard'}`,
              c.question && c.question !== c.title ? `**Prompt:** ${c.question}` : null,
              c.answer || '',
              c.code ? `\`\`\`javascript\n${c.code}\n\`\`\`` : null
            ].filter(Boolean).join('\n\n');
            return { ...c, content: contentParts };
          }
          return c;
        });
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_FLASHCARDS;
  });

  const [activeFolderId, setActiveFolderId] = useState('all');
  const [selectedNoteId, setSelectedNoteId] = useState(notes[0]?.id || 'note-1');
  const [selectedFlashcardId, setSelectedFlashcardId] = useState(
    () => flashcards[0]?.id || 'fc-os-1'
  );

  // Set default tab to 'Flashcards' (Code & Notes workspace)
  const [activeTab, setActiveTab] = useState('Flashcards');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mobile drawer state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Editor Modal State (if needed for notes)
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  // Sync notes to localStorage
  useEffect(() => {
    localStorage.setItem('studysphere_notes', JSON.stringify(notes));
  }, [notes]);

  // Sync daily todos to localStorage
  useEffect(() => {
    localStorage.setItem('studysphere_daily_todos', JSON.stringify(dailyTodos));
  }, [dailyTodos]);

  // Sync long-term tasks to localStorage
  useEffect(() => {
    localStorage.setItem('studysphere_longterm_tasks', JSON.stringify(longTermTasks));
  }, [longTermTasks]);

  // Sync flashcards to localStorage
  useEffect(() => {
    localStorage.setItem('studysphere_flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  // Daily todo toggle handler (callable from App or RightPanel)
  const handleToggleDailyTodo = (todoId) => {
    const updated = dailyTodos.map(t => {
      if (t.id === todoId) {
        const nextDone = !t.completed;
        if (nextDone) {
          confetti({ particleCount: 30, spread: 45, origin: { y: 0.7 } });
        }
        return { ...t, completed: nextDone };
      }
      return t;
    });
    setDailyTodos(updated);
  };

  // Save / Update Flashcard Handler
  const handleSaveFlashcard = (updatedCard) => {
    const exists = flashcards.some(c => c.id === updatedCard.id);
    if (exists) {
      setFlashcards(flashcards.map(c => c.id === updatedCard.id ? updatedCard : c));
    } else {
      setFlashcards([updatedCard, ...flashcards]);
      setSelectedFlashcardId(updatedCard.id);
    }
  };

  // Delete Flashcard Handler
  const handleDeleteFlashcard = (cardId) => {
    const updated = flashcards.filter(c => c.id !== cardId);
    setFlashcards(updated);
    if (selectedFlashcardId === cardId && updated.length > 0) {
      setSelectedFlashcardId(updated[0].id);
    }
  };

  // Create Flashcard / Code Note Handler
  const handleCreateFlashcard = () => {
    const activeFolderObj = FOLDERS.find(f => f.id === activeFolderId);
    const newCard = {
      id: 'fc-' + Date.now(),
      subject: activeFolderObj?.name || 'OS & Database Systems',
      title: 'Untitled Code & Note',
      code: '// Paste or write code snippet here for future review...\nfunction solution() {\n  console.log("Ready for review");\n}',
      codeLanguage: 'javascript',
      notes: '# Concept Overview\n\nStart typing your study notes, formulas, or algorithmic analysis here...\n\n## Key Points\n\n- Point 1\n- Point 2',
      content: '# Untitled Code & Note\n\nStart typing your study notes here...\n\n```javascript\n// Paste or write code snippet here\n```',
      lastEdited: 'Just now'
    };
    setFlashcards([newCard, ...flashcards]);
    setSelectedFlashcardId(newCard.id);
    setActiveTab('Flashcards');
  };

  // Filter flashcards by search query
  const filteredFlashcards = flashcards.filter(c => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      (c.title && c.title.toLowerCase().includes(q)) ||
      (c.subject && c.subject.toLowerCase().includes(q)) ||
      (c.code && c.code.toLowerCase().includes(q)) ||
      (c.content && c.content.toLowerCase().includes(q)) ||
      (c.notes && c.notes.toLowerCase().includes(q))
    );
  });

  // Export Notes Backup
  const handleExportNotes = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({ notes, flashcards, dailyTodos, longTermTasks }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `StudySphere_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const activeFolderObj = FOLDERS.find(f => f.id === activeFolderId) || FOLDERS[0];
  const activeFlashcardIndex = filteredFlashcards.findIndex(c => c.id === selectedFlashcardId) + 1;
  const pendingDailyCount = dailyTodos.filter(t => !t.completed).length;

  return (
    <div className="master-frame">
      {/* Mobile Header Bar */}
      <div className="mobile-sidebar-toggle">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
            <GraduationCap size={16} />
          </div>
          <span>StudySphere Hub</span>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}
        >
          <Menu size={22} />
        </button>
      </div>

      {/* 1. Left Sidebar with Navigation & Notes List */}
      <LeftSidebar
        folders={FOLDERS}
        activeFolderId={activeFolderId}
        onSelectFolder={(id) => {
          setActiveFolderId(id);
        }}
        onOpenNewNoteModal={handleCreateFlashcard}
        totalNotesCount={flashcards.length}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onExportNotes={handleExportNotes}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        flashcards={filteredFlashcards}
        selectedFlashcardId={selectedFlashcardId}
        onSelectFlashcard={(id) => setSelectedFlashcardId(id)}
        onAddFlashcard={handleCreateFlashcard}
        pendingDailyCount={pendingDailyCount}
      />

      {/* 2. Center Workspace Column */}
      <main className="center-content">
        <CenterHeader
          folders={FOLDERS}
          activeFolderId={activeFolderId}
          onSelectFolder={(id) => {
            setActiveFolderId(id);
          }}
        />

        <CurrentModuleCard
          folderName={activeFolderObj.name}
          noteIndex={Math.max(1, activeFlashcardIndex)}
          totalNotes={Math.max(1, filteredFlashcards.length)}
          streakDays={14}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenNewNote={handleCreateFlashcard}
        />

        {/* Dynamic Workspace Views with Framer Motion Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {activeTab === 'Flashcards' ? (
              <FlashcardsView
                cards={filteredFlashcards}
                selectedCardId={selectedFlashcardId}
                onSelectCard={(id) => setSelectedFlashcardId(id)}
                onSaveCard={handleSaveFlashcard}
                onDeleteCard={handleDeleteFlashcard}
                onAddCard={handleCreateFlashcard}
                activeFolderId={activeFolderId}
                folders={FOLDERS}
              />
            ) : activeTab === 'Tasks & Homework' ? (
              <TaskTracker
                dailyTodos={dailyTodos}
                setDailyTodos={setDailyTodos}
                longTermTasks={longTermTasks}
                setLongTermTasks={setLongTermTasks}
                notes={notes}
                onSelectNote={(n) => {
                  setSelectedNoteId(n.id);
                  setActiveTab('Flashcards');
                }}
              />
            ) : activeTab === 'Formula Sheet' ? (
              <FormulaCheatSheet />
            ) : activeTab === 'Focus Timer' ? (
              <PomodoroTimer />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Right Panel with Study Analytics & Live Daily To-Do Checklist */}
      <RightPanel
        notesCount={flashcards.length}
        pyqsSolved={42}
        revisionAccuracy={94}
        onContinueRevision={() => setActiveTab('Flashcards')}
        dailyTodos={dailyTodos}
        onToggleDailyTodo={handleToggleDailyTodo}
        onOpenTasks={() => setActiveTab('Tasks & Homework')}
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
          onSaveNote={(savedNote) => {
            const exists = notes.some(n => n.id === savedNote.id);
            if (exists) {
              setNotes(notes.map(n => n.id === savedNote.id ? savedNote : n));
            } else {
              setNotes([savedNote, ...notes]);
              setSelectedNoteId(savedNote.id);
            }
          }}
        />
      )}
    </div>
  );
}
