import React, { useState } from 'react';
import { 
  CheckSquare, Plus, Trash2, Calendar, AlertCircle, CheckCircle2, 
  Circle, Clock, Target, Flag, Sparkles, Filter, ChevronRight,
  TrendingUp, Award, Layers, Check, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

export function TaskTracker({ 
  dailyTodos = [], 
  setDailyTodos, 
  longTermTasks = [], 
  setLongTermTasks, 
  notes = [], 
  onSelectNote 
}) {
  // Layout view mode: 'dual' | 'daily' | 'longterm'
  const [viewMode, setViewMode] = useState('dual');

  // Daily todos filter: 'All' | 'Pending' | 'Completed'
  const [dailyFilter, setDailyFilter] = useState('All');

  // Daily new task form state
  const [dailyTitle, setDailyTitle] = useState('');
  const [dailySubject, setDailySubject] = useState('CS & Algorithms');
  const [dailyPriority, setDailyPriority] = useState('High');
  const [dailyTimeEstimate, setDailyTimeEstimate] = useState('30m');

  // Long-term new goal modal state
  const [showNewGoalModal, setShowNewGoalModal] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalSubject, setGoalSubject] = useState('CS & Algorithms');
  const [goalDeadline, setGoalDeadline] = useState('Dec 2026');
  const [goalPriority, setGoalPriority] = useState('High');
  const [goalDescription, setGoalDescription] = useState('');
  const [newMilestonesText, setNewMilestonesText] = useState('');

  // Inline milestone input tracking per goal id
  const [inlineMilestoneInput, setInlineMilestoneInput] = useState({});

  const subjectOptions = [
    'CS & Algorithms',
    'OS & Database Systems',
    'Math & Linear Algebra',
    'Physics & Engineering',
    'Organic Chemistry',
    'Projects'
  ];

  // Daily todos handlers
  const handleToggleDailyTodo = (todoId) => {
    const updated = dailyTodos.map(t => {
      if (t.id === todoId) {
        const nextCompleted = !t.completed;
        if (nextCompleted) {
          confetti({ particleCount: 30, spread: 45, origin: { y: 0.7 } });
        }
        return { ...t, completed: nextCompleted };
      }
      return t;
    });
    setDailyTodos(updated);
  };

  const handleAddDailyTodo = (e) => {
    e.preventDefault();
    if (!dailyTitle.trim()) return;

    const newTodo = {
      id: `dt-${Date.now()}`,
      title: dailyTitle.trim(),
      subject: dailySubject,
      priority: dailyPriority,
      timeEstimate: dailyTimeEstimate || '30m',
      completed: false,
      dueDate: 'Today'
    };

    setDailyTodos([newTodo, ...dailyTodos]);
    setDailyTitle('');
  };

  const handleDeleteDailyTodo = (todoId) => {
    setDailyTodos(dailyTodos.filter(t => t.id !== todoId));
  };

  const handleClearCompletedDaily = () => {
    setDailyTodos(dailyTodos.filter(t => !t.completed));
  };

  // Long term tasks handlers
  const handleToggleMilestone = (goalId, milestoneId) => {
    const updated = longTermTasks.map(goal => {
      if (goal.id === goalId) {
        const nextMilestones = goal.milestones.map(m => {
          if (m.id === milestoneId) {
            return { ...m, completed: !m.completed };
          }
          return m;
        });

        const allDone = nextMilestones.length > 0 && nextMilestones.every(m => m.completed);
        if (allDone && goal.status !== 'Completed') {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        }

        return {
          ...goal,
          status: allDone ? 'Completed' : 'In Progress',
          milestones: nextMilestones
        };
      }
      return goal;
    });
    setLongTermTasks(updated);
  };

  const handleAddInlineMilestone = (goalId) => {
    const text = inlineMilestoneInput[goalId]?.trim();
    if (!text) return;

    const updated = longTermTasks.map(goal => {
      if (goal.id === goalId) {
        const newMilestone = {
          id: `m-${Date.now()}`,
          text: text,
          completed: false
        };
        return {
          ...goal,
          milestones: [...(goal.milestones || []), newMilestone]
        };
      }
      return goal;
    });

    setLongTermTasks(updated);
    setInlineMilestoneInput({ ...inlineMilestoneInput, [goalId]: '' });
  };

  const handleCreateLongTermGoal = (e) => {
    e.preventDefault();
    if (!goalTitle.trim()) return;

    const parsedMilestones = newMilestonesText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map((text, idx) => ({
        id: `m-${Date.now()}-${idx}`,
        text: text.replace(/^[-*•\d.]\s*/, ''),
        completed: false
      }));

    const newGoal = {
      id: `lt-${Date.now()}`,
      title: goalTitle.trim(),
      subject: goalSubject,
      targetDeadline: goalDeadline || 'Dec 2026',
      priority: goalPriority,
      status: 'In Progress',
      description: goalDescription.trim(),
      milestones: parsedMilestones.length > 0 ? parsedMilestones : [
        { id: `m-${Date.now()}-1`, text: 'Initial research & outline', completed: false },
        { id: `m-${Date.now()}-2`, text: 'Core implementation & review', completed: false }
      ]
    };

    setLongTermTasks([newGoal, ...longTermTasks]);
    setGoalTitle('');
    setGoalDescription('');
    setNewMilestonesText('');
    setShowNewGoalModal(false);
  };

  const handleDeleteGoal = (goalId) => {
    if (window.confirm('Delete this long-term goal?')) {
      setLongTermTasks(longTermTasks.filter(g => g.id !== goalId));
    }
  };

  // Filtered daily todos
  const filteredDailyTodos = dailyTodos.filter(t => {
    if (dailyFilter === 'Pending') return !t.completed;
    if (dailyFilter === 'Completed') return t.completed;
    return true;
  });

  // Analytics calculation
  const completedDailyCount = dailyTodos.filter(t => t.completed).length;
  const totalDailyCount = dailyTodos.length;
  const dailyProgressPercent = totalDailyCount > 0 ? Math.round((completedDailyCount / totalDailyCount) * 100) : 0;

  const totalMilestonesCount = longTermTasks.reduce((acc, g) => acc + (g.milestones?.length || 0), 0);
  const completedMilestonesCount = longTermTasks.reduce(
    (acc, g) => acc + (g.milestones?.filter(m => m.completed).length || 0), 
    0
  );
  const milestoneProgressPercent = totalMilestonesCount > 0 
    ? Math.round((completedMilestonesCount / totalMilestonesCount) * 100) 
    : 0;

  const getPriorityStyle = (prio) => {
    switch (prio) {
      case 'High':
        return { bg: '#ffe4e6', color: '#e11d48', border: '#fecdd3' };
      case 'Medium':
        return { bg: '#fef3c7', color: '#d97706', border: '#fde68a' };
      default:
        return { bg: '#f1f5f9', color: '#64748b', border: '#e2e8f0' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* 1. Header Banner & View Controls */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #cbd5e1',
        borderRadius: '18px',
        padding: '18px 22px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <CheckSquare size={18} />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                Daily To-Do & Long-Term Tasks
              </h2>
            </div>
            <p style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '4px' }}>
              Keep daily habits and action items on track while progressing through long-term semester goals.
            </p>
          </div>

          {/* Right: Layout Switcher & Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex',
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              padding: '3px',
              gap: '2px'
            }}>
              <button
                onClick={() => setViewMode('dual')}
                style={{
                  background: viewMode === 'dual' ? '#ffffff' : 'transparent',
                  color: viewMode === 'dual' ? '#4338ca' : '#64748b',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '5px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: viewMode === 'dual' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <Layers size={14} /> Dual View
              </button>

              <button
                onClick={() => setViewMode('daily')}
                style={{
                  background: viewMode === 'daily' ? '#ffffff' : 'transparent',
                  color: viewMode === 'daily' ? '#4338ca' : '#64748b',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '5px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: viewMode === 'daily' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <CheckSquare size={14} /> Daily To-Dos
              </button>

              <button
                onClick={() => setViewMode('longterm')}
                style={{
                  background: viewMode === 'longterm' ? '#ffffff' : 'transparent',
                  color: viewMode === 'longterm' ? '#4338ca' : '#64748b',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '5px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: viewMode === 'longterm' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <Target size={14} /> Long-Term Checklist
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowNewGoalModal(true)}
              style={{
                background: '#0f172a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '7px 14px',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Plus size={15} /> Add Long-Term Goal
            </motion.button>
          </div>
        </div>

        {/* Quick Progress Overview Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
          marginTop: '16px',
          paddingTop: '14px',
          borderTop: '1px solid #f1f5f9'
        }}>
          {/* Daily Progress Metric */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                Daily Tasks Completed
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                {completedDailyCount} / {totalDailyCount} ({dailyProgressPercent}%)
              </div>
            </div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#dcfce7',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.8rem'
            }}>
              <CheckCircle2 size={22} />
            </div>
          </div>

          {/* Long-Term Milestones Metric */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                Long-Term Milestones
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                {completedMilestonesCount} / {totalMilestonesCount} ({milestoneProgressPercent}%)
              </div>
            </div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#e0e7ff',
              color: '#6366f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.8rem'
            }}>
              <Award size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Workspace Grid: Daily To-Dos on Left, Long-Term Checklist on Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: viewMode === 'dual' ? '1fr 1.15fr' : '1fr',
        gap: '18px',
        alignItems: 'start'
      }}>
        {/* ================= COLUMN 1: DAILY TO-DO LIST ================= */}
        {(viewMode === 'dual' || viewMode === 'daily') && (
          <div style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '18px',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
          }}>
            {/* Column Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="#6366f1" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                  Daily To-Do List
                </h3>
              </div>

              {completedDailyCount > 0 && (
                <button
                  onClick={handleClearCompletedDaily}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#64748b',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Clear Done ({completedDailyCount})
                </button>
              )}
            </div>

            {/* Quick Add Daily Task Input Box */}
            <form onSubmit={handleAddDailyTodo} style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <input
                type="text"
                placeholder="Add daily task (e.g. Review Bellman-Ford snippet)..."
                value={dailyTitle}
                onChange={(e) => setDailyTitle(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  width: '100%'
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <select
                    value={dailySubject}
                    onChange={(e) => setDailySubject(e.target.value)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '3px 8px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: '#475569',
                      outline: 'none'
                    }}
                  >
                    {subjectOptions.map(subj => (
                      <option key={subj} value={subj}>{subj}</option>
                    ))}
                  </select>

                  <select
                    value={dailyPriority}
                    onChange={(e) => setDailyPriority(e.target.value)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '3px 8px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: '#475569',
                      outline: 'none'
                    }}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>

                  <select
                    value={dailyTimeEstimate}
                    onChange={(e) => setDailyTimeEstimate(e.target.value)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '3px 8px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: '#475569',
                      outline: 'none'
                    }}
                  >
                    <option value="15m">15m</option>
                    <option value="30m">30m</option>
                    <option value="45m">45m</option>
                    <option value="1h">1 hr</option>
                    <option value="2h">2 hr</option>
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={!dailyTitle.trim()}
                  style={{
                    background: dailyTitle.trim() ? '#6366f1' : '#cbd5e1',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '4px 12px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: dailyTitle.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Plus size={13} /> Add
                </motion.button>
              </div>
            </form>

            {/* Daily Filter Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {['All', 'Pending', 'Completed'].map(f => (
                <button
                  key={f}
                  onClick={() => setDailyFilter(f)}
                  style={{
                    background: dailyFilter === f ? '#e0e7ff' : '#f8fafc',
                    color: dailyFilter === f ? '#4338ca' : '#64748b',
                    border: dailyFilter === f ? '1px solid #c7d2fe' : '1px solid #e2e8f0',
                    borderRadius: '99px',
                    padding: '3px 10px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Daily Tasks Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredDailyTodos.length === 0 ? (
                <div style={{
                  padding: '24px 12px',
                  textAlign: 'center',
                  color: '#94a3b8',
                  fontSize: '0.825rem',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px dashed #cbd5e1'
                }}>
                  No daily tasks found for current filter.
                </div>
              ) : (
                filteredDailyTodos.map(todo => {
                  const prioStyle = getPriorityStyle(todo.priority);
                  return (
                    <motion.div
                      key={todo.id}
                      layout
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      style={{
                        background: todo.completed ? '#f8fafc' : '#ffffff',
                        border: todo.completed ? '1px solid #e2e8f0' : '1px solid #cbd5e1',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                        <button
                          type="button"
                          onClick={() => handleToggleDailyTodo(todo.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: todo.completed ? '#10b981' : '#94a3b8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0
                          }}
                        >
                          {todo.completed ? (
                            <CheckCircle2 size={20} fill="#dcfce7" color="#10b981" />
                          ) : (
                            <Circle size={20} />
                          )}
                        </button>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: todo.completed ? '#94a3b8' : '#0f172a',
                            textDecoration: todo.completed ? 'line-through' : 'none'
                          }}>
                            {todo.title}
                          </span>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', color: '#64748b' }}>
                            <span style={{ color: '#6366f1', fontWeight: 700 }}>{todo.subject}</span>
                            <span>•</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <Clock size={11} /> {todo.timeEstimate}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          background: prioStyle.bg,
                          color: prioStyle.color,
                          border: `1px solid ${prioStyle.border}`,
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          padding: '2px 7px',
                          borderRadius: '99px'
                        }}>
                          {todo.priority}
                        </span>

                        <button
                          onClick={() => handleDeleteDailyTodo(todo.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                          title="Delete task"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ================= COLUMN 2: LONG-TERM TASKS CHECKLIST ================= */}
        {(viewMode === 'dual' || viewMode === 'longterm') && (
          <div style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '18px',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
          }}>
            {/* Column Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={18} color="#06b6d4" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                  Long-Term Tasks Checklist
                </h3>
              </div>

              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#06b6d4',
                background: '#e0f2fe',
                padding: '2px 8px',
                borderRadius: '99px'
              }}>
                {longTermTasks.length} Active Goals
              </span>
            </div>

            {/* List of Long-Term Goals with Milestone Checklists */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {longTermTasks.length === 0 ? (
                <div style={{
                  padding: '30px 14px',
                  textAlign: 'center',
                  color: '#94a3b8',
                  fontSize: '0.825rem',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px dashed #cbd5e1'
                }}>
                  No long-term goals created yet. Click "Add Long-Term Goal" above!
                </div>
              ) : (
                longTermTasks.map(goal => {
                  const milestones = goal.milestones || [];
                  const doneMilestones = milestones.filter(m => m.completed).length;
                  const totalMilestones = milestones.length;
                  const percent = totalMilestones > 0 ? Math.round((doneMilestones / totalMilestones) * 100) : 0;
                  const isFullyDone = totalMilestones > 0 && doneMilestones === totalMilestones;

                  return (
                    <motion.div
                      key={goal.id}
                      layout
                      style={{
                        background: isFullyDone ? '#f0fdf4' : '#ffffff',
                        border: isFullyDone ? '1px solid #bbf7d0' : '1px solid #cbd5e1',
                        borderRadius: '14px',
                        padding: '14px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                      }}
                    >
                      {/* Goal Title & Badges */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                            <h4 style={{
                              fontSize: '0.925rem',
                              fontWeight: 800,
                              color: isFullyDone ? '#166534' : '#0f172a',
                              textDecoration: isFullyDone ? 'line-through' : 'none'
                            }}>
                              {goal.title}
                            </h4>

                            <span style={{
                              background: '#e0e7ff',
                              color: '#4338ca',
                              fontSize: '0.65rem',
                              fontWeight: 800,
                              padding: '2px 7px',
                              borderRadius: '99px'
                            }}>
                              {goal.subject}
                            </span>
                          </div>

                          {goal.description && (
                            <p style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '3px' }}>
                              {goal.description}
                            </p>
                          )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                          <span style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: '#0284c7',
                            background: '#e0f2fe',
                            padding: '2px 7px',
                            borderRadius: '99px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}>
                            <Calendar size={11} /> {goal.targetDeadline}
                          </span>

                          <button
                            onClick={() => handleDeleteGoal(goal.id)}
                            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
                            title="Delete goal"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Milestone Progress Bar */}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                          <span>Milestone Checklist Progress</span>
                          <span style={{ color: isFullyDone ? '#10b981' : '#6366f1' }}>
                            {doneMilestones} / {totalMilestones} ({percent}%)
                          </span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '6px',
                          background: '#f1f5f9',
                          borderRadius: '99px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${percent}%`,
                            height: '100%',
                            background: isFullyDone ? '#10b981' : 'linear-gradient(90deg, #6366f1, #06b6d4)',
                            transition: 'width 0.3s ease',
                            borderRadius: '99px'
                          }} />
                        </div>
                      </div>

                      {/* Checklist Items */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                        {milestones.map(m => (
                          <div
                            key={m.id}
                            onClick={() => handleToggleMilestone(goal.id, m.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: m.completed ? '#f8fafc' : '#f8fafc',
                              border: m.completed ? '1px solid #e2e8f0' : '1px solid #cbd5e1',
                              borderRadius: '8px',
                              padding: '6px 10px',
                              fontSize: '0.78rem',
                              cursor: 'pointer',
                              transition: 'all 0.1s ease'
                            }}
                          >
                            {m.completed ? (
                              <CheckCircle2 size={15} color="#10b981" fill="#dcfce7" style={{ flexShrink: 0 }} />
                            ) : (
                              <Circle size={15} color="#94a3b8" style={{ flexShrink: 0 }} />
                            )}
                            <span style={{
                              fontWeight: m.completed ? 600 : 500,
                              color: m.completed ? '#94a3b8' : '#1e293b',
                              textDecoration: m.completed ? 'line-through' : 'none',
                              flex: 1
                            }}>
                              {m.text}
                            </span>
                          </div>
                        ))}

                        {/* Inline Add Milestone to this Goal */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                          <input
                            type="text"
                            placeholder="+ Add sub-task milestone..."
                            value={inlineMilestoneInput[goal.id] || ''}
                            onChange={(e) => setInlineMilestoneInput({ ...inlineMilestoneInput, [goal.id]: e.target.value })}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddInlineMilestone(goal.id);
                              }
                            }}
                            style={{
                              flex: 1,
                              background: '#ffffff',
                              border: '1px dashed #cbd5e1',
                              borderRadius: '8px',
                              padding: '5px 10px',
                              fontSize: '0.75rem',
                              outline: 'none',
                              color: '#0f172a'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => handleAddInlineMilestone(goal.id)}
                            disabled={!inlineMilestoneInput[goal.id]?.trim()}
                            style={{
                              background: inlineMilestoneInput[goal.id]?.trim() ? '#0f172a' : '#e2e8f0',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '5px 10px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              cursor: inlineMilestoneInput[goal.id]?.trim() ? 'pointer' : 'not-allowed'
                            }}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. Add Long-Term Goal Modal */}
      <AnimatePresence>
        {showNewGoalModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewGoalModal(false)}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)'
              }}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              style={{
                position: 'relative',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '20px',
                width: '100%',
                maxWidth: '520px',
                padding: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Target size={20} color="#6366f1" />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                    New Long-Term Goal & Roadmap
                  </h3>
                </div>
                <button
                  onClick={() => setShowNewGoalModal(false)}
                  style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: 800 }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateLongTermGoal} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Goal Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Operating Systems Kernel Mastery"
                    value={goalTitle}
                    onChange={(e) => setGoalTitle(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.85rem',
                      outline: 'none',
                      color: '#0f172a'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                      Subject
                    </label>
                    <select
                      value={goalSubject}
                      onChange={(e) => setGoalSubject(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.8rem',
                        outline: 'none',
                        color: '#0f172a'
                      }}
                    >
                      {subjectOptions.map(subj => (
                        <option key={subj} value={subj}>{subj}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                      Target Deadline
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dec 2026 or Q1 2027"
                      value={goalDeadline}
                      onChange={(e) => setGoalDeadline(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.8rem',
                        outline: 'none',
                        color: '#0f172a'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Description (Optional)
                  </label>
                  <textarea
                    placeholder="Brief description of scope or exam syllabus..."
                    value={goalDescription}
                    onChange={(e) => setGoalDescription(e.target.value)}
                    rows={2}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8rem',
                      outline: 'none',
                      color: '#0f172a',
                      resize: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Milestones (One per line)
                  </label>
                  <textarea
                    placeholder="Step 1: Finish chapter notes&#10;Step 2: Solve 10 lab practice sets&#10;Step 3: Complete mock exam"
                    value={newMilestonesText}
                    onChange={(e) => setNewMilestonesText(e.target.value)}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8rem',
                      outline: 'none',
                      color: '#0f172a'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setShowNewGoalModal(false)}
                    style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '8px 16px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    style={{
                      background: '#6366f1',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '8px 18px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Create Goal
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
