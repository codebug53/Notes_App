import React from 'react';
import { 
  BookOpen, Code2, Calculator, Zap, FlaskConical, Cpu, 
  Plus, User, Download, X, GraduationCap, CheckSquare, Sparkles, Clock
} from 'lucide-react';

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
  setActiveTab
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

  const navTools = [
    { id: 'Read Note', label: 'Cornell Reader', icon: BookOpen },
    { id: 'AI Assistant', label: 'AI Study Helper', icon: Sparkles },
    { id: 'Flashcards', label: 'Active Recall Cards', icon: Zap },
    { id: 'Tasks & Homework', label: 'Homework & Exams', icon: CheckSquare },
    { id: 'Formula Sheet', label: 'Formula Matrix', icon: Calculator },
    { id: 'Focus Timer', label: 'Pomodoro Timer', icon: Clock },
  ];

  return (
    <aside className={`left-sidebar ${isOpenMobile ? 'mobile-open' : ''}`}>
      <div>
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.1rem',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
            }}>
              <GraduationCap size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                StudySphere
              </h1>
              <p style={{ fontSize: '0.725rem', color: '#94a3b8', fontWeight: 600 }}>
                Student Context Notebook
              </p>
            </div>
          </div>

          {isOpenMobile && (
            <button onClick={onCloseMobile} className="btn-icon" style={{ color: '#ffffff' }}>
              <X size={20} />
            </button>
          )}
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => {
            onOpenNewNoteModal();
            if (isOpenMobile && onCloseMobile) onCloseMobile();
          }}
          style={{
            width: '100%',
            padding: '11px 16px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.875rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
            marginBottom: '18px',
            transition: 'transform 0.15s ease'
          }}
          className="btn-action"
        >
          <Plus size={18} />
          <span>New Cornell Note</span>
        </button>

        {/* Quick Tools Section */}
        <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          Workspace Views
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '18px' }}>
          {navTools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTab === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveTab(tool.id);
                  if (isOpenMobile && onCloseMobile) onCloseMobile();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  background: isActive ? '#1e293b' : 'transparent',
                  border: isActive ? '1px solid #334155' : '1px solid transparent',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  fontSize: '0.825rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={16} color={isActive ? '#6366f1' : '#64748b'} />
                <span>{tool.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Subject Folders Section */}
        <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          Course Folders
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px', maxHeight: '200px', overflowY: 'auto' }}>
          {folders.map(folder => {
            const isActive = activeFolderId === folder.id;
            return (
              <button
                key={folder.id}
                onClick={() => {
                  onSelectFolder(folder.id);
                  if (isOpenMobile && onCloseMobile) onCloseMobile();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  background: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  fontSize: '0.825rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {getFolderIcon(folder.icon)}
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{folder.name}</span>
                </div>
                <span style={{
                  background: isActive ? '#6366f1' : '#0f172a',
                  color: '#ffffff',
                  fontSize: '0.68rem',
                  padding: '2px 7px',
                  borderRadius: '99px',
                  fontWeight: 700,
                  flexShrink: 0
                }}>
                  {folder.id === 'all' ? totalNotesCount : folder.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div style={{ marginTop: '16px' }}>
        {/* Export Backup Button */}
        <button
          onClick={onExportNotes}
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid #1e293b',
            color: '#94a3b8',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginBottom: '12px',
            transition: 'background 0.15s ease'
          }}
        >
          <Download size={14} />
          <span>Export Notes Backup</span>
        </button>

        {/* User Profile Card */}
        <div style={{
          background: '#141c2b',
          borderRadius: '14px',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #1e293b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
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
              <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#ffffff' }}>Mahammad Azhar</div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>STEM & CS Student</div>
            </div>
          </div>

          <button style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }} title="User Profile">
            <User size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
