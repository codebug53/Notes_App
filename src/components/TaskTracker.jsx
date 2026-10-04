import React, { useState } from 'react';
import { CheckSquare, Plus, Trash2, Calendar, AlertCircle, CheckCircle2, Circle, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export function TaskTracker({ tasks = [], setTasks, notes = [], onSelectNote }) {
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  // New task form state
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('CS & Algorithms');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('High');
  const [relatedNoteId, setRelatedNoteId] = useState('');

  const subjects = ['All', ...new Set(tasks.map(t => t.subject))];

  const filteredTasks = tasks.filter(t => {
    const matchSubj = filterSubject === 'All' || t.subject === filterSubject;
    const matchStat = filterStatus === 'All' || 
                      (filterStatus === 'Pending' && t.status !== 'Completed') ||
                      (filterStatus === 'Completed' && t.status === 'Completed');
    return matchSubj && matchStat;
  });

  const handleToggleTaskStatus = (taskId) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        const isDone = t.status === 'Completed';
        const nextStatus = isDone ? 'To-Do' : 'Completed';
        if (!isDone) confetti({ particleCount: 35, spread: 40 });
        return { ...t, status: nextStatus };
      }
      return t;
    });
    setTasks(updated);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      subject: subject,
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      priority: priority,
      status: 'To-Do',
      relatedNoteId: relatedNoteId || null
    };

    setTasks([newTask, ...tasks]);
    setTitle('');
    setShowNewTaskModal(false);
  };

  const getPriorityBadge = (prio) => {
    switch (prio) {
      case 'High':
        return <span style={{ background: '#ffe4e6', color: '#e11d48', fontSize: '0.68rem', fontWeight: 800, padding: '2px 8px', borderRadius: '99px' }}>High Priority</span>;
      case 'Medium':
        return <span style={{ background: '#fef3c7', color: '#d97706', fontSize: '0.68rem', fontWeight: 800, padding: '2px 8px', borderRadius: '99px' }}>Medium</span>;
      default:
        return <span style={{ background: '#f1f5f9', color: '#64748b', fontSize: '0.68rem', fontWeight: 800, padding: '2px 8px', borderRadius: '99px' }}>Low</span>;
    }
  };

  const completedCount = tasks.filter(t => t.status === 'Completed').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Banner */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
              <CheckSquare size={22} color="#6366f1" />
              <span>Homework & Exam Task Manager</span>
            </h2>
            <p style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '2px' }}>
              Track course assignments, lab submissions, and exam revision milestones.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#f1f5f9', padding: '6px 14px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
              {completedCount} / {tasks.length} Completed
            </div>

            <button
              onClick={() => setShowNewTaskModal(true)}
              style={{
                background: '#6366f1',
                color: '#ffffff',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '10px',
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
              <span>Add Assignment</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['All', 'Pending', 'Completed'].map(stat => (
              <button
                key={stat}
                onClick={() => setFilterStatus(stat)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '99px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  border: filterStatus === stat ? '1px solid #6366f1' : '1px solid #e2e8f0',
                  background: filterStatus === stat ? '#6366f1' : '#f8fafc',
                  color: filterStatus === stat ? '#ffffff' : '#64748b',
                  cursor: 'pointer'
                }}
              >
                {stat}
              </button>
            ))}
          </div>

          <div style={{ borderLeft: '1px solid #cbd5e1', height: '20px', margin: '0 4px' }} />

          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {subjects.map(subj => (
              <button
                key={subj}
                onClick={() => setFilterSubject(subj)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '99px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  border: 'none',
                  background: filterSubject === subj ? '#0b0f17' : '#f1f5f9',
                  color: filterSubject === subj ? '#ffffff' : '#475569',
                  cursor: 'pointer'
                }}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredTasks.length === 0 ? (
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '30px', textAlign: 'center', color: '#64748b' }}>
            <AlertCircle size={32} color="#94a3b8" style={{ margin: '0 auto 8px auto' }} />
            <p style={{ fontWeight: 600 }}>No assignments found matching current filter.</p>
          </div>
        ) : (
          filteredTasks.map((t) => {
            const isDone = t.status === 'Completed';
            const relatedNote = notes.find(n => n.id === t.relatedNoteId);

            return (
              <div
                key={t.id}
                style={{
                  background: '#ffffff',
                  border: isDone ? '1px solid #e2e8f0' : '1px solid #cbd5e1',
                  opacity: isDone ? 0.75 : 1,
                  borderRadius: '14px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                  <button
                    onClick={() => handleToggleTaskStatus(t.id)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: isDone ? '#10b981' : '#94a3b8' }}
                  >
                    {isDone ? <CheckCircle2 size={22} fill="#dcfce7" color="#10b981" /> : <Circle size={22} />}
                  </button>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{
                      fontWeight: 700,
                      fontSize: '0.925rem',
                      color: isDone ? '#64748b' : '#0f172a',
                      textDecoration: isDone ? 'line-through' : 'none'
                    }}>
                      {t.title}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem', color: '#64748b', flexWrap: 'wrap' }}>
                      <span style={{ color: '#6366f1', fontWeight: 700 }}>{t.subject}</span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} /> Due: {t.dueDate}
                      </span>

                      {relatedNote && (
                        <>
                          <span>•</span>
                          <button
                            onClick={() => onSelectNote && onSelectNote(relatedNote)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#06b6d4',
                              fontWeight: 700,
                              cursor: 'pointer',
                              padding: 0,
                              fontSize: '0.75rem',
                              textDecoration: 'underline'
                            }}
                          >
                            Ref Note: {relatedNote.title.slice(0, 24)}...
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  {getPriorityBadge(t.priority)}
                  <button
                    onClick={() => handleDeleteTask(t.id)}
                    style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '4px' }}
                    title="Delete Assignment"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create Task Modal */}
      {showNewTaskModal && (
        <div className="modal-overlay" onClick={() => setShowNewTaskModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px', color: '#0f172a' }}>Add New Homework / Assignment</h3>

            <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Task Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Complete Organic Chemistry Lab Report"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select value={subject} onChange={(e) => setSubject(e.target.value)} className="form-select">
                    <option value="CS & Algorithms">CS & Algorithms</option>
                    <option value="Math & Linear Algebra">Math & Linear Algebra</option>
                    <option value="Physics & Engineering">Physics & Engineering</option>
                    <option value="Organic Chemistry">Organic Chemistry</option>
                    <option value="OS & Database Systems">OS & Database Systems</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select value={priority} onChange={(e) => setPriority(e.target.value)} className="form-select">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Link to Study Note</label>
                  <select value={relatedNoteId} onChange={(e) => setRelatedNoteId(e.target.value)} className="form-select">
                    <option value="">None</option>
                    {notes.map(n => (
                      <option key={n.id} value={n.id}>{n.title.slice(0, 22)}...</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowNewTaskModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
