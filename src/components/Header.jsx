import React from 'react';
import { Search, Plus, Sun, Moon, Flame, GraduationCap, Clock } from 'lucide-react';

export function Header({
  searchQuery,
  setSearchQuery,
  theme,
  setTheme,
  onOpenNewPost,
  onOpenCountdown,
  streakCount = 14
}) {
  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: '12px',
      zIndex: 100,
      margin: '12px 16px',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      borderRadius: 'var(--radius-lg)'
    }}>
      {/* Brand / Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'var(--gradient-badge)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
        }}>
          <GraduationCap size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            DevPrep <span style={{ color: 'var(--accent-primary)', WebkitTextFillColor: 'initial' }}>Desk</span>
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            GATE CS & SDE Placement Personal Log
          </p>
        </div>
      </div>

      {/* Center Search Bar */}
      <div style={{ flex: 1, maxWidth: '420px', position: 'relative' }}>
        <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search GATE topics, DSA code, PYQs, OS, DBMS..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input"
          style={{ paddingLeft: '40px', borderRadius: 'var(--radius-full)' }}
        />
      </div>

      {/* Right Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Streak Pill */}
        <div
          title="Daily Study Streak"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: '#fbbf24',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <Flame size={16} className="pulse-flame" fill="#f59e0b" />
          <span>{streakCount} Days Streak</span>
        </div>

        {/* Countdown Badge */}
        <button
          onClick={onOpenCountdown}
          className="btn btn-secondary btn-sm"
          style={{ gap: '6px' }}
        >
          <Clock size={16} style={{ color: 'var(--accent-secondary)' }} />
          <span>GATE Target</span>
        </button>

        {/* Theme Switcher */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="btn-icon"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
        </button>

        {/* New Post Button */}
        <button
          onClick={onOpenNewPost}
          className="btn btn-primary"
        >
          <Plus size={18} />
          <span>New Post</span>
        </button>
      </div>
    </header>
  );
}
