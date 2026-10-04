import React from 'react';
import { BookOpen, Target, Cpu, Code2, Zap, Bookmark, CheckSquare, Layers, Sparkles } from 'lucide-react';

export function Sidebar({
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  totalPosts,
  bookmarkedCount,
  solvedPYQCount = 34
}) {
  const navItems = [
    { id: 'all-posts', label: 'All Articles & Notes', icon: BookOpen },
    { id: 'flashcards', label: 'GATE Flashcards', icon: Zap },
    { id: 'cheat-sheet', label: 'Formula & Complexity', icon: Layers },
    { id: 'study-goals', label: 'Daily Study Checklist', icon: CheckSquare },
    { id: 'bookmarks', label: 'Bookmarked Notes', icon: Bookmark, badge: bookmarkedCount },
  ];

  const categories = [
    { name: 'All Categories', count: totalPosts },
    { name: 'GATE CS', badgeClass: 'badge-gate' },
    { name: 'Placement / DSA', badgeClass: 'badge-dsa' },
    { name: 'Operating Systems', badgeClass: 'badge-os' },
    { name: 'DBMS & Placement', badgeClass: 'badge-dbms' },
    { name: 'Interview Experience', badgeClass: 'badge-interview' },
  ];

  return (
    <aside style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Profile Card */}
      <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
        <div style={{ position: 'relative', width: '70px', height: '70px', margin: '0 auto 12px auto' }}>
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4, #10b981)',
            padding: '3px',
            boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'var(--bg-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.5rem',
              color: 'var(--accent-primary)'
            }}>
              MA
            </div>
          </div>
          <span style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#10b981',
            border: '2px solid var(--bg-secondary)'
          }} title="Active Studying" />
        </div>

        <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Mahammad Azhar</h2>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          CS & Engineering Aspirant
        </p>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(99, 102, 241, 0.12)',
          color: 'var(--accent-primary)',
          fontSize: '0.75rem',
          fontWeight: 700
        }}>
          <Target size={12} />
          <span>Target: GATE CS & Top SDE</span>
        </div>

        {/* Quick Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-color)'
        }}>
          <div style={{ background: 'var(--bg-input)', padding: '8px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>{totalPosts}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Articles</div>
          </div>
          <div style={{ background: 'var(--bg-input)', padding: '8px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-amber)' }}>{solvedPYQCount}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>GATE PYQs</div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="glass-panel" style={{ padding: '12px', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.08em', padding: '8px 12px', textTransform: 'uppercase' }}>
          Workspace Views
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === 'bookmarks') {
                    setSelectedCategory('All Categories');
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--gradient-badge)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span style={{
                    background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--bg-input)',
                    color: isActive ? '#ffffff' : 'var(--accent-primary)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Category Quick Filter */}
      {activeTab === 'all-posts' && (
        <div className="glass-panel" style={{ padding: '16px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '10px', textTransform: 'uppercase' }}>
            Filter by Subject
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {categories.map((cat) => {
              const isSel = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    background: isSel ? 'var(--bg-input)' : 'transparent',
                    border: isSel ? '1px solid var(--accent-primary)' : '1px solid transparent',
                    color: isSel ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    fontWeight: isSel ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{cat.name}</span>
                  {isSel && <Sparkles size={14} color="var(--accent-primary)" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}
