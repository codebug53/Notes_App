import React, { useState, useEffect } from 'react';
import { X, Save, Eye, Edit3, Plus, Trash2, Code, HelpCircle, Sparkles, AlertCircle } from 'lucide-react';

export function PostEditorModal({
  postToEdit,
  onClose,
  onSavePost
}) {
  const isEditing = Boolean(postToEdit);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('GATE CS');
  const [customCategory, setCustomCategory] = useState('');
  const [tags, setTags] = useState('');
  const [difficulty, setDifficulty] = useState('GATE High-Yield');
  const [readTime, setReadTime] = useState('5 min read');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Mahammad Azhar');
  const [codeSnippet, setCodeSnippet] = useState('');
  
  // Dynamic arrays
  const [keyFormulas, setKeyFormulas] = useState(['']);
  const [pyqs, setPyqs] = useState([]);
  
  // Active Tab: Write or Preview
  const [mode, setMode] = useState('write');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title || '');
      setCategory(postToEdit.category || 'GATE CS');
      setTags(postToEdit.tags ? postToEdit.tags.join(', ') : '');
      setDifficulty(postToEdit.difficulty || 'GATE High-Yield');
      setReadTime(postToEdit.readTime || '5 min read');
      setSummary(postToEdit.summary || '');
      setContent(postToEdit.content || '');
      setAuthor(postToEdit.author || 'Mahammad Azhar');
      setCodeSnippet(postToEdit.codeSnippet || '');
      setKeyFormulas(postToEdit.keyFormulas && postToEdit.keyFormulas.length > 0 ? postToEdit.keyFormulas : ['']);
      setPyqs(postToEdit.solvedPYQs || []);
    }
  }, [postToEdit]);

  // Insert markdown helpers
  const insertMarkdown = (prefix, suffix = '') => {
    setContent(prev => prev + `${prefix}text${suffix}`);
  };

  const handleAddFormula = () => {
    setKeyFormulas([...keyFormulas, '']);
  };

  const handleFormulaChange = (idx, value) => {
    const updated = [...keyFormulas];
    updated[idx] = value;
    setKeyFormulas(updated);
  };

  const handleRemoveFormula = (idx) => {
    setKeyFormulas(keyFormulas.filter((_, i) => i !== idx));
  };

  const handleAddPyq = () => {
    setPyqs([
      ...pyqs,
      {
        question: '',
        options: ['(A) Option 1', '(B) Option 2', '(C) Option 3', '(D) Option 4'],
        correctOption: '(A) Option 1',
        explanation: ''
      }
    ]);
  };

  const handlePyqChange = (idx, field, value) => {
    const updated = [...pyqs];
    updated[idx][field] = value;
    setPyqs(updated);
  };

  const handlePyqOptionChange = (pyqIdx, optIdx, val) => {
    const updated = [...pyqs];
    updated[pyqIdx].options[optIdx] = val;
    setPyqs(updated);
  };

  const handleRemovePyq = (idx) => {
    setPyqs(pyqs.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter an article title!');
      return;
    }
    if (!content.trim()) {
      setErrorMsg('Article content cannot be empty!');
      return;
    }

    const finalCategory = category === 'Other' ? (customCategory.trim() || 'General Tech') : category;
    const parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean);
    const cleanedFormulas = keyFormulas.map(f => f.trim()).filter(Boolean);

    const postData = {
      id: isEditing ? postToEdit.id : `post-${Date.now()}`,
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      category: finalCategory,
      tags: parsedTags,
      difficulty,
      readTime,
      summary: summary.trim() || title.substring(0, 120),
      content,
      author,
      date: isEditing ? postToEdit.date : new Date().toISOString().split('T')[0],
      likes: isEditing ? postToEdit.likes : 0,
      bookmarked: isEditing ? postToEdit.bookmarked : false,
      codeSnippet: codeSnippet.trim(),
      keyFormulas: cleanedFormulas,
      solvedPYQs: pyqs
    };

    onSavePost(postData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '950px', height: '92vh' }}
      >
        {/* Editor Top Bar */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-secondary)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              padding: '8px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--gradient-badge)',
              color: '#ffffff'
            }}>
              <Edit3 size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                {isEditing ? 'Update & Edit Blog Post' : 'Draft New Study Article'}
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {isEditing ? `Editing "${postToEdit.title}"` : 'Write notes for GATE CS, DSA, OS, DBMS or Placement Experiences'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Mode Switcher */}
            <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '3px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <button
                type="button"
                onClick={() => setMode('write')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: mode === 'write' ? 'var(--accent-primary)' : 'transparent',
                  color: mode === 'write' ? '#ffffff' : 'var(--text-secondary)'
                }}
              >
                Editor
              </button>
              <button
                type="button"
                onClick={() => setMode('preview')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: mode === 'preview' ? 'var(--accent-primary)' : 'transparent',
                  color: mode === 'preview' ? '#ffffff' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Eye size={14} />
                Live Preview
              </button>
            </div>

            <button onClick={onClose} className="btn-icon">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', color: 'var(--accent-rose)', padding: '10px 24px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Main Content Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {mode === 'preview' ? (
              /* Live Preview Mode */
              <div style={{ padding: '10px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <span className="badge badge-gate">{category}</span>
                  <span className="badge badge-dsa">{difficulty}</span>
                </div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '12px' }}>{title || 'Untitled Article'}</h1>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', italic: 'true', marginBottom: '20px' }}>{summary}</p>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>{content || 'No content written yet...'}</div>
                {codeSnippet && (
                  <pre style={{ marginTop: '20px' }}>
                    <code>{codeSnippet}</code>
                  </pre>
                )}
              </div>
            ) : (
              /* Write Mode */
              <>
                {/* Title */}
                <div className="form-group">
                  <label className="form-label">Article Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. Mastering Dijkstra & Bellman-Ford Shortest Path Algorithms"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                    style={{ fontSize: '1.1rem', fontWeight: 600 }}
                  />
                </div>

                {/* Category & Metadata Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  {/* Category */}
                  <div className="form-group">
                    <label className="form-label">Category / Subject</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-select"
                    >
                      <option value="GATE CS">GATE CS</option>
                      <option value="Placement / DSA">Placement / DSA</option>
                      <option value="Operating Systems">Operating Systems</option>
                      <option value="DBMS & Placement">DBMS & Placement</option>
                      <option value="Computer Networks">Computer Networks</option>
                      <option value="Theory of Computation">Theory of Computation</option>
                      <option value="Interview Experience">Interview Experience</option>
                      <option value="Other">Other / Custom</option>
                    </select>
                  </div>

                  {category === 'Other' && (
                    <div className="form-group">
                      <label className="form-label">Custom Category</label>
                      <input
                        type="text"
                        placeholder="e.g. Compiler Design"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  )}

                  {/* Difficulty Badge */}
                  <div className="form-group">
                    <label className="form-label">Difficulty / Level</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="form-select"
                    >
                      <option value="GATE High-Yield">GATE High-Yield</option>
                      <option value="Placement Must-Read">Placement Must-Read</option>
                      <option value="PYQ Breakdown">PYQ Breakdown</option>
                      <option value="Core Concept">Core Concept</option>
                      <option value="Interview Log">Interview Log</option>
                    </select>
                  </div>

                  {/* Read Time */}
                  <div className="form-group">
                    <label className="form-label">Est. Read Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 6 min read"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  {/* Author */}
                  <div className="form-group">
                    <label className="form-label">Author Name</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="form-group">
                  <label className="form-label">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="Algorithms, Graph Theory, GATE PYQ, LeetCode"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="form-input"
                  />
                </div>

                {/* Summary */}
                <div className="form-group">
                  <label className="form-label">Short Executive Summary / Objective</label>
                  <textarea
                    placeholder="Brief 2-line overview of what this article covers..."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="form-textarea"
                    style={{ minHeight: '60px' }}
                  />
                </div>

                {/* Main Content Markdown Textarea */}
                <div className="form-group">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label className="form-label">Main Article Body & Markdown Notes *</label>
                    {/* Quick Formatting Toolbar */}
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button type="button" onClick={() => insertMarkdown('## ')} className="btn-icon" style={{ padding: '2px 8px', fontSize: '0.75rem' }}>H2</button>
                      <button type="button" onClick={() => insertMarkdown('### ')} className="btn-icon" style={{ padding: '2px 8px', fontSize: '0.75rem' }}>H3</button>
                      <button type="button" onClick={() => insertMarkdown('**', '**')} className="btn-icon" style={{ padding: '2px 8px', fontSize: '0.75rem', fontWeight: 800 }}>B</button>
                      <button type="button" onClick={() => insertMarkdown('*', '*')} className="btn-icon" style={{ padding: '2px 8px', fontSize: '0.75rem', fontStyle: 'italic' }}>I</button>
                      <button type="button" onClick={() => insertMarkdown('> ')} className="btn-icon" style={{ padding: '2px 8px', fontSize: '0.75rem' }}>Quote</button>
                    </div>
                  </div>
                  <textarea
                    placeholder="Write your study notes, theorem proofs, algorithm explanations here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="form-textarea"
                    style={{ minHeight: '220px', fontFamily: 'var(--font-sans)', fontSize: '0.95rem' }}
                  />
                </div>

                {/* Code Snippet Box */}
                <div className="form-group" style={{ background: 'var(--bg-input)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)' }}>
                    <Code size={16} /> C++ / Python / SQL Code Implementation (Optional)
                  </label>
                  <textarea
                    placeholder="// Paste executable solution code here..."
                    value={codeSnippet}
                    onChange={(e) => setCodeSnippet(e.target.value)}
                    className="form-textarea"
                    style={{ minHeight: '140px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
                  />
                </div>

                {/* Key Formulas Section */}
                <div className="form-group" style={{ background: 'var(--bg-input)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-secondary)' }}>
                      <Sparkles size={16} /> Key Formulas & Quick Takeaways
                    </label>
                    <button type="button" onClick={handleAddFormula} className="btn btn-secondary btn-sm" style={{ gap: '4px' }}>
                      <Plus size={14} /> Add Formula
                    </button>
                  </div>
                  {keyFormulas.map((formula, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input
                        type="text"
                        placeholder={`Formula #${idx + 1} e.g. EAT = h * t1 + (1 - h) * t2`}
                        value={formula}
                        onChange={(e) => handleFormulaChange(idx, e.target.value)}
                        className="form-input"
                      />
                      {keyFormulas.length > 1 && (
                        <button type="button" onClick={() => handleRemoveFormula(idx)} className="btn-icon">
                          <Trash2 size={16} color="var(--accent-rose)" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Solved GATE PYQ Section */}
                <div className="form-group" style={{ background: 'var(--bg-input)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-amber)' }}>
                      <HelpCircle size={16} /> Solved GATE PYQ / Practice Questions
                    </label>
                    <button type="button" onClick={handleAddPyq} className="btn btn-secondary btn-sm" style={{ gap: '4px' }}>
                      <Plus size={14} /> Add Question
                    </button>
                  </div>
                  {pyqs.map((pyq, pIdx) => (
                    <div key={pIdx} style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '12px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-amber)' }}>GATE PYQ #{pIdx + 1}</span>
                        <button type="button" onClick={() => handleRemovePyq(pIdx)} className="btn-icon" style={{ padding: '4px' }}>
                          <Trash2 size={14} color="var(--accent-rose)" />
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="GATE Question Statement..."
                        value={pyq.question}
                        onChange={(e) => handlePyqChange(pIdx, 'question', e.target.value)}
                        className="form-input"
                        style={{ marginBottom: '8px' }}
                      />

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '8px' }}>
                        {pyq.options.map((opt, oIdx) => (
                          <input
                            key={oIdx}
                            type="text"
                            placeholder={`Option ${oIdx + 1}`}
                            value={opt}
                            onChange={(e) => handlePyqOptionChange(pIdx, oIdx, e.target.value)}
                            className="form-input"
                          />
                        ))}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px' }}>
                        <input
                          type="text"
                          placeholder="Correct Option (e.g. (B) Bellman-Ford)"
                          value={pyq.correctOption}
                          onChange={(e) => handlePyqChange(pIdx, 'correctOption', e.target.value)}
                          className="form-input"
                        />
                        <input
                          type="text"
                          placeholder="Explanation & Reasoning..."
                          value={pyq.explanation}
                          onChange={(e) => handlePyqChange(pIdx, 'explanation', e.target.value)}
                          className="form-input"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>

          {/* Editor Bottom Actions */}
          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            background: 'var(--bg-secondary)'
          }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ minWidth: '140px' }}>
              <Save size={18} />
              <span>{isEditing ? 'Update Post' : 'Publish Post'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
