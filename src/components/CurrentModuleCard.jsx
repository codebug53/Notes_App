import React from 'react';
import { Search, Plus, Flame, FileText, CheckSquare, Calculator, Clock, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function CurrentModuleCard({
  folderName = "CS & Algorithms",
  noteIndex = 1,
  totalNotes = 8,
  streakDays = 14,
  activeTab = "Flashcards",
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenNewNote
}) {
  const tabs = [
    { id: "Flashcards", label: "Code & Notes", icon: Code2 },
    { id: "Tasks & Homework", label: "To-Dos & Tasks", icon: CheckSquare },
    { id: "Formula Sheet", label: "Formulas", icon: Calculator },
    { id: "Focus Timer", label: "Focus Timer", icon: Clock }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Subject Header Banner */}
      <div className="current-module-banner">
        <div>
          <div style={{ fontSize: '0.725rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
            Active Subject Folder
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
            {folderName}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.725rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
              Viewing Deck
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#6366f1', marginTop: '2px' }}>
              {noteIndex} of {totalNotes}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenNewNote}
            style={{
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '9px 16px',
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
            <span>Add Flashcard</span>
          </motion.button>
        </div>
      </div>

      {/* Revision Streak Pill */}
      <div className="streak-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: '#fef3c7',
            color: '#d97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Flame size={16} />
          </div>
          <span style={{ fontSize: '0.825rem', color: '#475569', fontWeight: 600 }}>
            {streakDays} Days Study Streak • Plaintext Markdown editing & code note practice active
          </span>
        </div>

        <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#10b981', background: '#dcfce7', padding: '3px 10px', borderRadius: '99px' }}>
          +{streakDays} Days
        </span>
      </div>

      {/* Navigation Tabs & Search Bar */}
      <div className="nav-tabs-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={isActive ? 'tab-pill-active' : 'tab-pill-inactive'}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Icon size={14} color={isActive ? '#ffffff' : '#64748b'} />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Search Field */}
        <div style={{ position: 'relative', minWidth: '180px' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search flashcards..."
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
