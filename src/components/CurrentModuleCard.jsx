import React from 'react';
import { Search, Plus, Sparkles, Flame, BookOpen, Zap, CheckSquare, Calculator, Clock } from 'lucide-react';

export function CurrentModuleCard({
  folderName = "CS & Algorithms",
  noteIndex = 1,
  totalNotes = 8,
  streakDays = 14,
  activeTab = "Read Note",
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenNewNote
}) {
  const tabs = [
    { id: "Read Note", label: "📖 Cornell Reader" },
    { id: "AI Assistant", label: "⚡ AI Helper" },
    { id: "Flashcards", label: "🎴 Flashcards" },
    { id: "Tasks & Homework", label: "📝 Homework" },
    { id: "Formula Sheet", label: "📐 Formulas" },
    { id: "Focus Timer", label: "⏱️ Focus Timer" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Dark Subject Banner */}
      <div className="current-module-banner">
        <div>
          <div style={{ fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
            Active Subject Folder
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
            {folderName}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.725rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Viewing Note
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
              {noteIndex} of {totalNotes}
            </div>
          </div>

          <button
            onClick={onOpenNewNote}
            style={{
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '9px 14px',
              fontWeight: 700,
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
            }}
          >
            <Plus size={16} />
            <span>Add Note</span>
          </button>
        </div>
      </div>

      {/* Revision Streak Pill */}
      <div className="streak-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: '#f59e0b',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.8rem'
          }}>
            🔥
          </div>
          <span style={{ fontSize: '0.825rem', color: '#475569', fontWeight: 600 }}>
            {streakDays} Days Study Streak • Active recall practice & formula revision active
          </span>
        </div>

        <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#10b981' }}>
          +{streakDays} Days
        </span>
      </div>

      {/* Navigation Tabs & Search Bar */}
      <div className="nav-tabs-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? 'tab-pill-active' : 'tab-pill-inactive'}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div style={{ position: 'relative', minWidth: '180px' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search notes & terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '7px 12px 7px 34px',
              borderRadius: '99px',
              border: '1px solid #cbd5e1',
              background: '#f8fafc',
              fontSize: '0.8rem',
              outline: 'none',
              color: '#0f172a'
            }}
          />
        </div>
      </div>
    </div>
  );
}
