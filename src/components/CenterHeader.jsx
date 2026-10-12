import React from 'react';
import { GraduationCap, Code2, Calculator, Zap } from 'lucide-react';

export function CenterHeader({
  folders = [],
  activeFolderId,
  onSelectFolder
}) {
  const subjectQuickLinks = [
    { id: 'cs-dsa', number: 1, title: 'CS & Algorithms', subtitle: 'Graph, DP, Solved PYQs', color: '#10b981', icon: Code2 },
    { id: 'math', number: 2, title: 'Linear Algebra & Math', subtitle: 'Eigenvalues, Fourier', color: '#f59e0b', icon: Calculator },
    { id: 'physics', number: 3, title: 'Physics & Engineering', subtitle: 'Maxwell, Quantum', color: '#06b6d4', icon: Zap }
  ];

  return (
    <header style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Badge */}
      <div style={{ display: 'flex' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: '#e0e7ff',
          color: '#4338ca',
          padding: '4px 12px',
          borderRadius: '99px',
          fontSize: '0.75rem',
          fontWeight: 800
        }}>
          <GraduationCap size={15} />
          <span>StudySphere • Plaintext Flashcard Workspace</span>
        </div>
      </div>

      {/* Main Heading */}
      <div>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', lineHeight: 1.2 }}>
          Mahammad Azhar's Study Workspace
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748b', maxWidth: '640px', marginTop: '2px', lineHeight: 1.5 }}>
          Minimal Markdown flashcard note editing, algorithm code snippet execution, formula matrix revision, and homework management.
        </p>
      </div>

      {/* Subject Quick Nodes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '4px' }}>
        {subjectQuickLinks.map((mod) => {
          const isActive = activeFolderId === mod.id;
          const Icon = mod.icon;
          return (
            <div
              key={mod.id}
              onClick={() => onSelectFolder(mod.id)}
              className={`module-node ${isActive ? 'active' : ''}`}
              style={{
                border: isActive ? '2px solid #6366f1' : '1px solid #e2e8f0',
                background: isActive ? '#f5f3ff' : '#ffffff',
                padding: '10px 12px',
                borderRadius: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: mod.color,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem',
                flexShrink: 0
              }}>
                <Icon size={16} />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.825rem', fontWeight: 800, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {mod.title}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {mod.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </header>
  );
}
