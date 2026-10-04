import React, { useState } from 'react';
import { TrendingUp, RotateCcw, CheckCircle, Clock, Calendar, Flame, GraduationCap, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export function RightPanel({
  notesCount = 8,
  pyqsSolved = 42,
  revisionAccuracy = 94,
  onContinueRevision
}) {
  const [syllabusChecklist, setSyllabusChecklist] = useState([
    { id: 1, title: 'Graph Shortest Paths (Dijkstra/Bellman)', tag: 'Algorithms', status: 'completed' },
    { id: 2, title: 'Eigenvalues & Characteristic Equation', tag: 'Linear Algebra', status: 'completed' },
    { id: 3, title: 'Maxwell Equations & Electromagnetic Waves', tag: 'Physics III', status: 'current' },
    { id: 4, title: 'SN1 vs SN2 Nucleophilic Substitution', tag: 'Chemistry', status: 'current' },
  ]);

  const handleToggleSyllabus = (id) => {
    const updated = syllabusChecklist.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'completed' ? 'current' : 'completed';
        if (nextStatus === 'completed') confetti({ particleCount: 30, spread: 40 });
        return { ...item, status: nextStatus };
      }
      return item;
    });
    setSyllabusChecklist(updated);
  };

  const weeklyBars = [
    { day: 'Mon', val: 40 },
    { day: 'Tue', val: 65 },
    { day: 'Wed', val: 55 },
    { day: 'Thu', val: 90 },
    { day: 'Fri', val: 80 },
    { day: 'Sat', val: 70 },
    { day: 'Sun', val: 95 }
  ];

  return (
    <aside className="right-panel">
      {/* Top Card: Student Revision Progress */}
      <div className="progress-card-green">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>Study Analytics</h2>
            <p style={{ fontSize: '0.75rem', opacity: 0.9 }}>Semester Exam & Recall Metrics</p>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '6px', borderRadius: '10px' }}>
            <TrendingUp size={18} color="#ffffff" />
          </div>
        </div>

        {/* 3 Stat Grid Boxes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: '10px 8px', borderRadius: '12px', textAlign: 'left' }}>
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.8, fontWeight: 700 }}>Notes</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{notesCount}</div>
            <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>documented</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: '10px 8px', borderRadius: '12px', textAlign: 'left' }}>
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.8, fontWeight: 700 }}>Exams</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{pyqsSolved}</div>
            <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>solved</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: '10px 8px', borderRadius: '12px', textAlign: 'left' }}>
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.8, fontWeight: 700 }}>Recall</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{revisionAccuracy}%</div>
            <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>mastery</div>
          </div>
        </div>

        {/* Weekly Practice Minutes Bar Chart */}
        <div style={{ fontSize: '0.725rem', opacity: 0.9, fontWeight: 600, marginBottom: '8px' }}>
          Weekly study focus hours
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '55px', gap: '6px' }}>
          {weeklyBars.map((b, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%', justifyContent: 'flex-end' }}>
              <div style={{
                width: '6px',
                height: `${b.val}%`,
                background: '#ffffff',
                borderRadius: '99px',
                transition: 'height 0.4s ease'
              }} />
              <span style={{ fontSize: '0.6rem', marginTop: '6px', opacity: 0.8 }}>{b.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Card: High Yield Syllabus Goals */}
      <div className="learning-path-cyan">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>High Yield Goals</h2>
            <p style={{ fontSize: '0.75rem', opacity: 0.9 }}>Core Exam Topics</p>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '6px', borderRadius: '10px' }}>
            <Award size={18} color="#ffffff" />
          </div>
        </div>

        {/* Inner Module Status Card */}
        <div style={{ background: 'rgba(255, 255, 255, 0.18)', borderRadius: '14px', padding: '12px 14px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>Semester Exam Checklist</span>
            <span style={{ background: '#0369a1', padding: '2px 8px', borderRadius: '99px', fontSize: '0.68rem', fontWeight: 800 }}>85% done</span>
          </div>

          {/* Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {syllabusChecklist.map((item) => (
              <div
                key={item.id}
                onClick={() => handleToggleSyllabus(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {item.status === 'completed' ? (
                    <CheckCircle size={14} color="#ffffff" fill="#0284c7" />
                  ) : (
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff' }} />
                  )}
                  <span style={{ fontWeight: item.status === 'completed' ? 700 : 500, textDecoration: item.status === 'completed' ? 'line-through' : 'none' }}>
                    {item.title}
                  </span>
                </div>
                <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>{item.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onContinueRevision}
          style={{
            width: '100%',
            background: '#0b0f17',
            color: '#ffffff',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '99px',
            fontSize: '0.825rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
          className="btn-action"
        >
          <RotateCcw size={14} />
          <span>Resume Cornell Study Mode</span>
        </button>
      </div>

      {/* Bottom Card: Daily Focus Quote */}
      <div className="quote-card-grey">
        <p style={{ fontSize: '0.825rem', fontStyle: 'italic', color: '#475569', lineHeight: 1.5, marginBottom: '14px' }}>
          "Consistent Cornell note-taking and active recall transform complex STEM subjects into clear, top-scoring knowledge."
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #cbd5e1', paddingTop: '10px' }}>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>Daily Study Target</div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Revise 2 Notes + 5 Flashcards</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>
            <Clock size={14} />
            <span>25 min/session</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
