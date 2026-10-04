import React, { useState, useEffect } from 'react';
import { X, Save, Edit3, Plus, Trash2, Code, Sparkles, HelpCircle, FileText } from 'lucide-react';

export function NoteEditorModal({
  noteToEdit,
  folders = [],
  onClose,
  onSaveNote
}) {
  const isEditing = Boolean(noteToEdit);

  const [title, setTitle] = useState('');
  const [folderId, setFolderId] = useState('cs-dsa');
  const [tags, setTags] = useState('');
  const [cues, setCues] = useState(['']);
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [keyTakeaways, setKeyTakeaways] = useState(['']);
  const [code, setCode] = useState('');
  const [pyqQuestion, setPyqQuestion] = useState('');
  const [pyqAnswer, setPyqAnswer] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title || '');
      setFolderId(noteToEdit.folderId || 'cs-dsa');
      setTags(noteToEdit.tags ? noteToEdit.tags.join(', ') : '');
      setCues(noteToEdit.cues && noteToEdit.cues.length > 0 ? noteToEdit.cues : ['']);
      setSummary(noteToEdit.summary || '');
      setContent(noteToEdit.content || '');
      setKeyTakeaways(noteToEdit.keyTakeaways && noteToEdit.keyTakeaways.length > 0 ? noteToEdit.keyTakeaways : ['']);
      setCode(noteToEdit.code || '');
      if (noteToEdit.pyqs && noteToEdit.pyqs.length > 0) {
        setPyqQuestion(noteToEdit.pyqs[0].question || '');
        setPyqAnswer(noteToEdit.pyqs[0].answer || '');
      }
    }
  }, [noteToEdit]);

  const handleAddCue = () => setCues([...cues, '']);
  const handleCueChange = (idx, val) => {
    const updated = [...cues];
    updated[idx] = val;
    setCues(updated);
  };
  const handleRemoveCue = (idx) => setCues(cues.filter((_, i) => i !== idx));

  const handleAddTakeaway = () => setKeyTakeaways([...keyTakeaways, '']);
  const handleTakeawayChange = (idx, val) => {
    const updated = [...keyTakeaways];
    updated[idx] = val;
    setKeyTakeaways(updated);
  };
  const handleRemoveTakeaway = (idx) => setKeyTakeaways(keyTakeaways.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedFolder = folders.find(f => f.id === folderId) || folders[1];
    const parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean);
    const cleanedCues = cues.map(c => c.trim()).filter(Boolean);
    const cleanedTakeaways = keyTakeaways.map(k => k.trim()).filter(Boolean);

    const noteData = {
      id: isEditing ? noteToEdit.id : `note-${Date.now()}`,
      folderId: folderId,
      subject: selectedFolder ? selectedFolder.name : 'CS & Algorithms',
      title: title.trim(),
      lastEdited: 'Just now',
      tags: parsedTags,
      cues: cleanedCues,
      summary: summary.trim(),
      content: content.trim() || summary.trim(),
      keyTakeaways: cleanedTakeaways,
      code: code.trim(),
      pyqs: pyqQuestion.trim() ? [{ question: pyqQuestion.trim(), answer: pyqAnswer.trim() }] : []
    };

    onSaveNote(noteData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px', height: '88vh' }}>
        {/* Header */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #06b6d4)', color: '#ffffff' }}>
              <Edit3 size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                {isEditing ? 'Edit Cornell Study Note' : 'Create New Cornell Study Note'}
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Structure main note concepts, recall cues, formula takeaways, and practice questions
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn-icon"><X size={20} /></button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Title */}
            <div className="form-group">
              <label className="form-label">Note Title *</label>
              <input
                type="text"
                placeholder="e.g. Graph Shortest Path: Dijkstra vs Bellman-Ford"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                style={{ fontSize: '1.05rem', fontWeight: 700 }}
                required
              />
            </div>

            {/* Folder & Tags */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Subject / Course Folder</label>
                <select value={folderId} onChange={(e) => setFolderId(e.target.value)} className="form-select">
                  {folders.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="Algorithms, Midterm, Graph Theory"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            {/* Cornell Cues */}
            <div className="form-group" style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b' }}>
                  <HelpCircle size={16} /> Recall Cues / Keywords (Cornell Left Column)
                </label>
                <button type="button" onClick={handleAddCue} className="btn btn-secondary btn-sm" style={{ gap: '4px' }}>
                  <Plus size={14} /> Add Cue
                </button>
              </div>
              {cues.map((cue, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <input
                    type="text"
                    placeholder={`Cue #${idx + 1} e.g. What is the greedy choice in Dijkstra?`}
                    value={cue}
                    onChange={(e) => handleCueChange(idx, e.target.value)}
                    className="form-input"
                  />
                  {cues.length > 1 && (
                    <button type="button" onClick={() => handleRemoveCue(idx)} className="btn-icon">
                      <Trash2 size={16} color="#f43f5e" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Detailed Content */}
            <div className="form-group">
              <label className="form-label">Detailed Notes Body (Markdown / Text)</label>
              <textarea
                placeholder="Write core lecture notes, derivations, and step-by-step concepts..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-textarea"
                style={{ minHeight: '120px' }}
              />
            </div>

            {/* Cornell Summary */}
            <div className="form-group">
              <label className="form-label">Cornell Summary Recap (Bottom Bar)</label>
              <textarea
                placeholder="1-2 sentence core recap of what this note proves or calculates..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="form-textarea"
                style={{ minHeight: '60px' }}
              />
            </div>

            {/* Key Takeaways & Formulas */}
            <div className="form-group" style={{ background: '#f0fdf4', padding: '14px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a' }}>
                  <Sparkles size={16} /> Key Takeaways & Formula Matrix
                </label>
                <button type="button" onClick={handleAddTakeaway} className="btn btn-secondary btn-sm" style={{ gap: '4px' }}>
                  <Plus size={14} /> Add Formula
                </button>
              </div>
              {keyTakeaways.map((takeaway, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <input
                    type="text"
                    placeholder={`Takeaway #${idx + 1} e.g. Dijkstra complexity: O((V+E) log V)`}
                    value={takeaway}
                    onChange={(e) => handleTakeawayChange(idx, e.target.value)}
                    className="form-input"
                  />
                  {keyTakeaways.length > 1 && (
                    <button type="button" onClick={() => handleRemoveTakeaway(idx)} className="btn-icon">
                      <Trash2 size={16} color="#f43f5e" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Code Snippet */}
            <div className="form-group" style={{ background: '#0b0f17', color: '#ffffff', padding: '14px', borderRadius: '12px' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981' }}>
                <Code size={16} /> Algorithm Sandbox / Executable JS Snippet
              </label>
              <textarea
                placeholder="// Paste JavaScript implementation here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="form-textarea"
                style={{ minHeight: '120px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', background: '#030712', color: '#e2e8f0', border: '1px solid #1f2937' }}
              />
            </div>

            {/* Solved Exam Question */}
            <div className="form-group" style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#d97706' }}>
                <HelpCircle size={16} /> Solved Exam / PYQ Question (Optional)
              </label>
              <input
                type="text"
                placeholder="Question statement..."
                value={pyqQuestion}
                onChange={(e) => setPyqQuestion(e.target.value)}
                className="form-input"
                style={{ marginBottom: '8px' }}
              />
              <input
                type="text"
                placeholder="Detailed Answer / Solution..."
                value={pyqAnswer}
                onChange={(e) => setPyqAnswer(e.target.value)}
                className="form-input"
              />
            </div>

          </div>

          {/* Footer Actions */}
          <div style={{ padding: '14px 24px', borderTop: '1px solid #cbd5e1', display: 'flex', justifyContent: 'flex-end', gap: '10px', background: '#f8fafc' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ minWidth: '140px' }}>
              <Save size={16} />
              <span>{isEditing ? 'Update Note' : 'Save Cornell Note'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
