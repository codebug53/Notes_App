import React from 'react';
import { 
  BookOpen, Code2, Calculator, Zap, FlaskConical, Cpu, 
  Plus, User, Download, X, GraduationCap, CheckSquare, Clock,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

export function LeftSidebar({
  folders = [],
  activeFolderId = 'all',
  onSelectFolder,
  onOpenNewNoteModal,
  totalNotesCount = 8,
  isOpenMobile = false,
  onCloseMobile,
  onExportNotes,
  activeTab,
  setActiveTab,
  flashcards = [],
  selectedFlashcardId,
  onSelectFlashcard,
  onAddFlashcard,
  pendingDailyCount = 0
}) {
  const getFolderIcon = (iconName) => {
    switch (iconName) {
      case 'Code2': return <Code2 size={16} color="#10b981" />;
      case 'Calculator': return <Calculator size={16} color="#f59e0b" />;
      case 'Zap': return <Zap size={16} color="#06b6d4" />;
      case 'FlaskConical': return <FlaskConical size={16} color="#a855f7" />;
      case 'Cpu': return <Cpu size={16} color="#f43f5e" />;
      default: return <BookOpen size={16} color="#6366f1" />;
    }
  };

  // Nav Tools - Code & Notes, Daily To-Dos & Long-Term Goals
  const navTools = [
    { id: 'Flashcards', label: 'Code & Study Notes', icon: Code2 },
    { id: 'Tasks & Homework', label: 'Daily To-Dos & Goals', icon: CheckSquare },
    { id: 'Formula Sheet', label: 'Formula Matrix', icon: Calculator },
    { id: 'Focus Timer', label: 'Pomodoro Timer', icon: Clock },
  ];

  // Filter flashcards by active course folder if applicable
  const activeFolderObj = folders.find(f => f.id === activeFolderId);
  const displayFlashcards = flashcards.filter(c => {
    if (activeFolderId === 'all') return true;
    if (!activeFolderObj) return true;
    return c.subject && c.subject.toLowerCase().includes(activeFolderObj.name.toLowerCase().split(' ')[0]);
  });

  // Fallback to all flashcards if filter yields 0
  const finalFlashcardsList = displayFlashcards.length > 0 ? displayFlashcards : flashcards;

  return (
    <aside className={`left-sidebar ${isOpenMobile ? 'mobile-open' : ''}`}>
      <div>
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.1rem',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)'
            }}>
              <GraduationCap size={20} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.025rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                StudySphere
              </h1>
              <p style={{ fontSize: '0.725rem', color: '#64748b', fontWeight: 600 }}>
                Flashcard Context Workspace
              </p>
            </div>
          </div>

          {isOpenMobile && (
            <button onClick={onCloseMobile} className="btn-icon" style={{ color: '#0f172a' }}>
              <X size={20} />
            </button>
          )}
        </div>

        {/* Primary Action Button */}
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (onAddFlashcard) onAddFlashcard();
            if (isOpenMobile && onCloseMobile) onCloseMobile();
          }}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
            marginBottom: '16px'
          }}
        >
          <Plus size={18} />
          <span>New Flashcard Note</span>
        </motion.button>

        {/* Workspace Views Navigation Section */}
        <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
          Workspace Views
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '14px' }}>
          {navTools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTab === tool.id;
            return (
              <motion.button
                key={tool.id}
                whileHover={{ x: 3 }}
                onClick={() => {
                  setActiveTab(tool.id);
                  if (isOpenMobile && onCloseMobile) onCloseMobile();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '7px 10px',
                  borderRadius: '10px',
                  background: isActive ? '#e0e7ff' : 'transparent',
                  border: isActive ? '1px solid #c7d2fe' : '1px solid transparent',
                  color: isActive ? '#4338ca' : '#475569',
                  fontSize: '0.815rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={15} color={isActive ? '#4338ca' : '#64748b'} />
                <span style={{ flex: 1 }}>{tool.label}</span>
                {tool.id === 'Tasks & Homework' && pendingDailyCount > 0 && (
                  <span style={{
                    background: '#fee2e2',
                    color: '#ef4444',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '1px 6px',
                    borderRadius: '99px'
                  }}>
                    {pendingDailyCount}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* 2. Content Section - Flashcard Index List */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '6px',
            padding: '0 2px'
          }}>
            <div style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              color: '#6366f1',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <FileText size={13} color="#6366f1" />
              <span>Content ({finalFlashcardsList.length})</span>
            </div>
            
            <button
              onClick={() => {
                if (onAddFlashcard) onAddFlashcard();
                if (isOpenMobile && onCloseMobile) onCloseMobile();
              }}
              title="Create New Flashcard"
              style={{
                background: '#e0e7ff',
                color: '#4338ca',
                border: 'none',
                borderRadius: '6px',
                padding: '2px 7px',
                fontSize: '0.7rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <Plus size={11} /> New
            </button>
          </div>

          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            maxHeight: '220px',
            overflowY: 'auto',
            paddingRight: '2px'
          }}>
            {finalFlashcardsList.map((card) => {
              const isSelected = card.id === selectedFlashcardId && activeTab === 'Flashcards';
              return (
                <motion.button
                  key={card.id}
                  whileHover={{ x: 3 }}
                  onClick={() => {
                    onSelectFlashcard(card.id);
                    setActiveTab('Flashcards');
                    if (isOpenMobile && onCloseMobile) onCloseMobile();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '7px 10px',
                    borderRadius: '8px',
                    background: isSelected ? '#6366f1' : '#ffffff',
                    border: isSelected ? '1px solid #4f46e5' : '1px solid #cbd5e1',
                    color: isSelected ? '#ffffff' : '#1e293b',
                    fontSize: '0.785rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 2px 8px rgba(99, 102, 241, 0.25)' : 'none'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                  }}>
                    <FileText size={13} color={isSelected ? '#ffffff' : '#94a3b8'} style={{ flexShrink: 0 }} />
                    <span style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {card.title || 'Untitled Flashcard'}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Course Folders Section */}
        <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
          Course Folders
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px', maxHeight: '160px', overflowY: 'auto' }}>
          {folders.map(folder => {
            const isActive = activeFolderId === folder.id;
            return (
              <motion.button
                key={folder.id}
                whileHover={{ x: 3 }}
                onClick={() => {
                  onSelectFolder(folder.id);
                  if (isOpenMobile && onCloseMobile) onCloseMobile();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 10px',
                  borderRadius: '10px',
                  background: isActive ? '#f1f5f9' : 'transparent',
                  border: isActive ? '1px solid #cbd5e1' : '1px solid transparent',
                  color: isActive ? '#0f172a' : '#64748b',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {getFolderIcon(folder.icon)}
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{folder.name}</span>
                </div>
                <span style={{
                  background: isActive ? '#6366f1' : '#e2e8f0',
                  color: isActive ? '#ffffff' : '#64748b',
                  fontSize: '0.68rem',
                  padding: '2px 7px',
                  borderRadius: '99px',
                  fontWeight: 700,
                  flexShrink: 0
                }}>
                  {folder.id === 'all' ? totalNotesCount : folder.count}
                </span>
              </motion.button>
            );
          })}
        </nav>
      </div>

      <div style={{ marginTop: '14px' }}>
        {/* Export Backup Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onExportNotes}
          style={{
            width: '100%',
            padding: '7px 10px',
            borderRadius: '10px',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            color: '#475569',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginBottom: '10px'
          }}
        >
          <Download size={14} />
          <span>Export Notes Backup</span>
        </motion.button>

        {/* User Profile Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '14px',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.85rem'
            }}>
              AZ
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Mahammad Azhar</div>
              <div style={{ fontSize: '0.68rem', color: '#64748b' }}>STEM & CS Student</div>
            </div>
          </div>

          <button style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }} title="User Profile">
            <User size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
