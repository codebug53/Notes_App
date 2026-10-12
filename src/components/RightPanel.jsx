import React from 'react';
import { 
  TrendingUp, RotateCcw, CheckCircle, Clock, Calendar, 
  Flame, GraduationCap, Award, CheckSquare, Plus, ArrowRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function RightPanel({
  notesCount = 8,
  pyqsSolved = 42,
  revisionAccuracy = 94,
  onContinueRevision,
  dailyTodos = [],
  onToggleDailyTodo,
  onOpenTasks
}) {
  const completedDailyCount = dailyTodos.filter(t => t.completed).length;
  const totalDailyCount = dailyTodos.length;
  const dailyProgressPercent = totalDailyCount > 0 
    ? Math.round((completedDailyCount / totalDailyCount) * 100) 
    : 0;

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
      {/* 1. Top Card: Student Revision Progress */}
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
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.8, fontWeight: 700 }}>To-Dos</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{completedDailyCount}/{totalDailyCount}</div>
            <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>today</div>
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

      {/* 2. Middle Card: Live Daily Tasks Quick Check */}
      <div className="learning-path-cyan">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>Daily Checklist</h2>
            <p style={{ fontSize: '0.75rem', opacity: 0.9 }}>Today's Priority To-Dos</p>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '6px', borderRadius: '10px' }}>
            <CheckSquare size={18} color="#ffffff" />
          </div>
        </div>

        {/* Inner Module Status Card */}
        <div style={{ background: 'rgba(255, 255, 255, 0.18)', borderRadius: '14px', padding: '12px 14px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>Today's Progress</span>
            <span style={{ background: '#0369a1', padding: '2px 8px', borderRadius: '99px', fontSize: '0.68rem', fontWeight: 800 }}>
              {dailyProgressPercent}% done
            </span>
          </div>

          {/* Live Daily Tasks List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {dailyTodos.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => onToggleDailyTodo && onToggleDailyTodo(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                  {item.completed ? (
                    <CheckCircle size={15} color="#ffffff" fill="#0284c7" style={{ flexShrink: 0 }} />
                  ) : (
                    <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ffffff', flexShrink: 0 }} />
                  )}
                  <span style={{
                    fontWeight: item.completed ? 700 : 500,
                    textDecoration: item.completed ? 'line-through' : 'none',
                    opacity: item.completed ? 0.75 : 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.title}
                  </span>
                </div>
                <span style={{ fontSize: '0.65rem', opacity: 0.85, flexShrink: 0 }}>{item.timeEstimate || '30m'}</span>
              </div>
            ))}

            {dailyTodos.length === 0 && (
              <div style={{ fontSize: '0.75rem', opacity: 0.8, textAlign: 'center', padding: '8px 0' }}>
                All tasks done for today!
              </div>
            )}
          </div>
        </div>

        {/* Action Button to Open Tasks Manager */}
        <button
          onClick={onOpenTasks}
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
          <span>Open Tasks & Goals Hub</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* 3. Bottom Card: Focus Guidance */}
      <div className="quote-card-grey">
        <p style={{ fontSize: '0.825rem', fontStyle: 'italic', color: '#475569', lineHeight: 1.5, marginBottom: '14px' }}>
          "Consistent code review and structured milestone checklists turn complex engineering systems into second nature."
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #cbd5e1', paddingTop: '10px' }}>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>Daily Routine</div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Check off tasks + Review 1 snippet</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>
            <Clock size={14} />
            <span>Active Goal</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
