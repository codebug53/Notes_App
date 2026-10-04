import React, { useState } from 'react';
import { CheckSquare, Plus, Trash2, CheckCircle2, Circle, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_GOALS = [
  { id: 'g1', text: 'Solve 3 GATE CS Operating Systems PYQs (Paging & Virtual Memory)', completed: true, category: 'GATE CS' },
  { id: 'g2', text: 'Master Dijkstra & Bellman-Ford Shortest Path Edge Cases', completed: true, category: 'Algorithms' },
  { id: 'g3', text: 'Solve 2 LeetCode Medium Dynamic Programming Problems (0/1 Knapsack)', completed: false, category: 'Placement' },
  { id: 'g4', text: 'Revise DBMS Strict 2PL & Concurrency Protocols', completed: false, category: 'DBMS' },
  { id: 'g5', text: 'Write & Publish 1 Study Note Article on DevPrep Desk', completed: false, category: 'Blogging' }
];

export function StudyGoals() {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('devprep_study_goals');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  const [newTaskText, setNewTaskText] = useState('');

  const saveGoals = (updated) => {
    setGoals(updated);
    localStorage.setItem('devprep_study_goals', JSON.stringify(updated));
  };

  const handleToggle = (id) => {
    const updated = goals.map(g => {
      if (g.id === id) {
        const nextState = !g.completed;
        if (nextState) confetti({ particleCount: 30, spread: 40 });
        return { ...g, completed: nextState };
      }
      return g;
    });
    saveGoals(updated);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask = {
      id: `goal-${Date.now()}`,
      text: newTaskText.trim(),
      completed: false,
      category: 'General Study'
    };
    saveGoals([...goals, newTask]);
    setNewTaskText('');
  };

  const handleDelete = (id) => {
    saveGoals(goals.filter(g => g.id !== id));
  };

  const completedCount = goals.filter(g => g.completed).length;
  const percentage = goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner & Progress Bar */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckSquare color="var(--accent-emerald)" size={22} />
              <span>Daily GATE & Placement Study Tracker</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Stay accountable by setting daily targets for GATE PYQs, DSA LeetCode problems, and revision notes.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.12)', padding: '8px 16px', borderRadius: 'var(--radius-full)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <Flame size={18} color="var(--accent-emerald)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
              {completedCount} / {goals.length} Completed ({percentage}%)
            </span>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div style={{ width: '100%', height: '10px', background: 'var(--bg-input)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
          <div style={{ width: `${percentage}%`, height: '100%', background: 'var(--gradient-badge)', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
        </div>
      </div>

      {/* Add New Goal Form */}
      <form onSubmit={handleAddTask} className="glass-panel" style={{ padding: '16px 20px', borderRadius: 'var(--radius-lg)', display: 'flex', gap: '12px' }}>
        <input
          type="text"
          placeholder="Add a new daily target (e.g. Solve 5 Computer Networks Subnetting PYQs)..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
          <Plus size={18} />
          <span>Add Task</span>
        </button>
      </form>

      {/* Tasks List */}
      <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {goals.map(goal => (
            <div
              key={goal.id}
              onClick={() => handleToggle(goal.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: goal.completed ? 'rgba(16, 185, 129, 0.06)' : 'var(--bg-input)',
                border: goal.completed ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {goal.completed ? (
                  <CheckCircle2 size={20} color="var(--accent-emerald)" fill="rgba(16, 185, 129, 0.2)" />
                ) : (
                  <Circle size={20} color="var(--text-muted)" />
                )}
                <span style={{
                  fontSize: '0.925rem',
                  fontWeight: goal.completed ? 600 : 500,
                  textDecoration: goal.completed ? 'line-through' : 'none',
                  color: goal.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                }}>
                  {goal.text}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(goal.id);
                }}
                className="btn-icon"
                title="Delete task"
              >
                <Trash2 size={16} color="var(--accent-rose)" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
