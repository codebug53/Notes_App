import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, Plus, Trash2, CheckCircle2, Columns, Edit3, Eye, 
  Code2, Tag, Copy, Check, FileCode, Sparkles, Layers,
  Terminal, X, RotateCcw, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MarkdownRenderer } from './MarkdownRenderer';

// Available programming languages for snippet selector
const SUPPORTED_LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', ext: 'js' },
  { id: 'typescript', name: 'TypeScript', ext: 'ts' },
  { id: 'python', name: 'Python', ext: 'py' },
  { id: 'c', name: 'C', ext: 'c' },
  { id: 'cpp', name: 'C++', ext: 'cpp' },
  { id: 'java', name: 'Java', ext: 'java' },
  { id: 'rust', name: 'Rust', ext: 'rs' },
  { id: 'go', name: 'Go', ext: 'go' },
  { id: 'sql', name: 'SQL', ext: 'sql' },
  { id: 'html', name: 'HTML/CSS', ext: 'html' },
  { id: 'bash', name: 'Shell / Bash', ext: 'sh' }
];

// Helper to extract or parse code and notes from a card
function parseCardCodeAndNotes(card) {
  if (!card) {
    return {
      code: '// Paste or write code snippet here for future review...',
      language: 'javascript',
      notes: ''
    };
  }

  // If card already has explicit code property, use it
  if (card.code !== undefined && card.code !== null) {
    return {
      code: card.code,
      language: card.codeLanguage || 'javascript',
      notes: card.notes || card.content || ''
    };
  }

  // Otherwise, extract from markdown ```lang ... ``` in content
  const content = card.content || '';
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/;
  const match = content.match(codeBlockRegex);

  if (match) {
    const language = (match[1] || 'javascript').toLowerCase();
    const code = match[2].trimEnd();
    // Notes is content with the code block removed
    const notes = content.replace(match[0], '').trim();
    return {
      code,
      language,
      notes: notes || content
    };
  }

  return {
    code: '// Paste or write code snippet here for future review...',
    language: 'javascript',
    notes: content
  };
}

export function FlashcardsView({
  cards = [],
  selectedCardId,
  onSelectCard,
  onSaveCard,
  onDeleteCard,
  onAddCard,
  activeFolderId = 'all',
  folders = []
}) {
  // Find current card or fall back to first card
  const activeCard = cards.find(c => c.id === selectedCardId) || cards[0];

  // Layout mode: 'split' | 'code' | 'notes'
  const [viewMode, setViewMode] = useState('split');
  
  // Right side notes mode: 'preview' | 'edit'
  const [notesMode, setNotesMode] = useState('preview');

  // Autosave status indicator state: 'saved' | 'saving'
  const [saveStatus, setSaveStatus] = useState('saved');

  // Copy code feedback state
  const [copiedCode, setCopiedCode] = useState(false);

  // Local state for code, language, and notes
  const [cardCode, setCardCode] = useState('');
  const [cardLang, setCardLang] = useState('javascript');
  const [cardNotes, setCardNotes] = useState('');

  // Refs for textarea cursor manipulation
  const codeTextareaRef = useRef(null);
  const notesTextareaRef = useRef(null);

  // Synchronize local state whenever activeCard changes
  useEffect(() => {
    if (activeCard) {
      const parsed = parseCardCodeAndNotes(activeCard);
      setCardCode(parsed.code);
      setCardLang(parsed.language);
      setCardNotes(parsed.notes);
    }
  }, [activeCard?.id]);

  // Subject options derived from folders or defaults
  const subjectOptions = [
    'OS & Database Systems',
    'CS & Algorithms',
    'Math & Linear Algebra',
    'Physics & Engineering',
    'Organic Chemistry'
  ];

  // Auto-sync updates to parent card handler
  const triggerCardSave = (newCode, newLang, newNotes, newTitle, newSubject) => {
    if (!activeCard) return;
    setSaveStatus('saving');

    const titleToUse = newTitle !== undefined ? newTitle : activeCard.title;
    const subjectToUse = newSubject !== undefined ? newSubject : activeCard.subject;
    const codeToUse = newCode !== undefined ? newCode : cardCode;
    const langToUse = newLang !== undefined ? newLang : cardLang;
    const notesToUse = newNotes !== undefined ? newNotes : cardNotes;

    // Build unified content string for backward compatibility
    let combinedContent = notesToUse;
    if (codeToUse && codeToUse.trim()) {
      combinedContent = `${notesToUse}\n\n\`\`\`${langToUse}\n${codeToUse}\n\`\`\``;
    }

    const updated = {
      ...activeCard,
      title: titleToUse,
      subject: subjectToUse,
      code: codeToUse,
      codeLanguage: langToUse,
      notes: notesToUse,
      content: combinedContent,
      lastEdited: 'Just now'
    };

    onSaveCard(updated);

    setTimeout(() => {
      setSaveStatus('saved');
    }, 350);
  };

  // Code change handler
  const handleCodeChange = (newCode) => {
    setCardCode(newCode);
    triggerCardSave(newCode, cardLang, cardNotes);
  };

  // Language change handler
  const handleLanguageChange = (newLang) => {
    setCardLang(newLang);
    triggerCardSave(cardCode, newLang, cardNotes);
  };

  // Notes change handler
  const handleNotesChange = (newNotes) => {
    setCardNotes(newNotes);
    triggerCardSave(cardCode, cardLang, newNotes);
  };

  // Title change handler
  const handleTitleChange = (newTitle) => {
    triggerCardSave(cardCode, cardLang, cardNotes, newTitle);
  };

  // Subject change handler
  const handleSubjectChange = (newSubject) => {
    triggerCardSave(cardCode, cardLang, cardNotes, undefined, newSubject);
  };

  // Copy code to clipboard
  const handleCopyCode = () => {
    if (!cardCode) return;
    navigator.clipboard.writeText(cardCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Handle Tab key in code editor for 2-space indentation
  const handleCodeKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = codeTextareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;

      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      handleCodeChange(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Compute line count and file name
  const codeLines = (cardCode || '').split('\n');
  const activeLangObj = SUPPORTED_LANGUAGES.find(l => l.id === cardLang) || SUPPORTED_LANGUAGES[0];
  const snippetFileName = activeCard?.title
    ? `${activeCard.title.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 20)}.${activeLangObj.ext}`
    : `snippet.${activeLangObj.ext}`;

  if (!activeCard) {
    return (
      <div style={{
        background: '#ffffff',
        border: '1px solid #cbd5e1',
        borderRadius: '18px',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <FileText size={40} color="#94a3b8" style={{ margin: '0 auto 12px auto' }} />
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>No Note Selected</h3>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
          Select a note from the left sidebar or create a new code & study note.
        </p>
        <button
          onClick={onAddCard}
          style={{
            marginTop: '16px',
            background: '#6366f1',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 18px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Plus size={16} /> Create Code & Study Note
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 1. Top Controls & Document Header Bar */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #cbd5e1',
        borderRadius: '18px',
        padding: '16px 20px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {/* Row 1: Document Metadata & Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* Left: Subject selector & Autosave status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Tag size={14} color="#6366f1" />
              <select
                value={activeCard.subject || subjectOptions[0]}
                onChange={(e) => handleSubjectChange(e.target.value)}
                style={{
                  background: '#e0e7ff',
                  color: '#4338ca',
                  border: '1px solid #c7d2fe',
                  borderRadius: '99px',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {subjectOptions.map(subj => (
                  <option key={subj} value={subj}>{subj}</option>
                ))}
              </select>
            </div>

            {/* Autosave Status Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: saveStatus === 'saved' ? '#10b981' : '#f59e0b',
              background: saveStatus === 'saved' ? '#dcfce7' : '#fef3c7',
              padding: '3px 9px',
              borderRadius: '99px'
            }}>
              <CheckCircle2 size={13} color={saveStatus === 'saved' ? '#10b981' : '#f59e0b'} />
              <span>{saveStatus === 'saved' ? 'Autosaved' : 'Saving...'}</span>
            </div>
          </div>

          {/* Right: Layout Mode Switcher & Delete Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Split Panel Mode Switcher */}
            <div style={{
              display: 'flex',
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              padding: '3px',
              gap: '2px'
            }}>
              <button
                onClick={() => setViewMode('split')}
                title="Split View (Editable Code Block on Left + Notes on Right)"
                style={{
                  background: viewMode === 'split' ? '#ffffff' : 'transparent',
                  color: viewMode === 'split' ? '#4338ca' : '#64748b',
                  border: 'none',
                  borderRadius: '7px',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  boxShadow: viewMode === 'split' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <Columns size={13} /> Split (Code + Notes)
              </button>

              <button
                onClick={() => setViewMode('code')}
                title="Editable Code Block Only"
                style={{
                  background: viewMode === 'code' ? '#ffffff' : 'transparent',
                  color: viewMode === 'code' ? '#4338ca' : '#64748b',
                  border: 'none',
                  borderRadius: '7px',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  boxShadow: viewMode === 'code' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <Code2 size={13} /> Code Only
              </button>

              <button
                onClick={() => setViewMode('notes')}
                title="Concept Notes Review Only"
                style={{
                  background: viewMode === 'notes' ? '#ffffff' : 'transparent',
                  color: viewMode === 'notes' ? '#4338ca' : '#64748b',
                  border: 'none',
                  borderRadius: '7px',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  boxShadow: viewMode === 'notes' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <Eye size={13} /> Notes Only
              </button>
            </div>

            {/* Delete Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                if (window.confirm(`Delete note "${activeCard.title}"?`)) {
                  onDeleteCard(activeCard.id);
                }
              }}
              style={{
                background: '#ffe4e6',
                color: '#f43f5e',
                border: '1px solid #fecdd3',
                borderRadius: '8px',
                padding: '5px 10px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Trash2 size={13} /> Delete
            </motion.button>
          </div>
        </div>

        {/* Row 2: Editable Title Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={20} color="#6366f1" style={{ flexShrink: 0 }} />
          <input
            type="text"
            value={activeCard.title || ''}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Document & Code Snippet Title..."
            style={{
              width: '100%',
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#0f172a',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'var(--font-sans)'
            }}
          />
        </div>
      </div>

      {/* 2. Main Split Workspace: Left Side = Editable Code Block | Right Side = Notes & Review */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCard.id + '-' + viewMode}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          style={{
            display: 'grid',
            gridTemplateColumns: viewMode === 'split' ? '1fr 1fr' : '1fr',
            gap: '16px',
            alignItems: 'stretch'
          }}
        >
          {/* ================= LEFT PANE: EDITABLE CODE BLOCK SECTION ================= */}
          {(viewMode === 'split' || viewMode === 'code') && (
            <div style={{
              background: '#090d16',
              border: '1px solid #1f2937',
              borderRadius: '18px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
            }}>
              {/* Code Window Header Bar (macOS Style + Language Selector + Copy Button) */}
              <div style={{
                background: '#000000',
                borderBottom: '1px solid #1f2937',
                padding: '9px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#94a3b8',
                fontSize: '0.75rem',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {/* Left: Window Dots & Filename Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e2e8f0', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    <Code2 size={14} color="#6366f1" />
                    <span>{snippetFileName}</span>
                  </div>
                </div>

                {/* Right: Language Selector, Lines count & Copy Code Action */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Language Selector Dropdown */}
                  <select
                    value={cardLang}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    style={{
                      background: '#111827',
                      color: '#a5b4fc',
                      border: '1px solid #374151',
                      borderRadius: '6px',
                      padding: '3px 8px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      outline: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {SUPPORTED_LANGUAGES.map(lang => (
                      <option key={lang.id} value={lang.id}>{lang.name}</option>
                    ))}
                  </select>

                  <span style={{ color: '#64748b', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                    {codeLines.length} {codeLines.length === 1 ? 'line' : 'lines'}
                  </span>

                  {/* Copy Code Button with Quick Feedback */}
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    style={{
                      background: copiedCode ? '#065f46' : 'rgba(255, 255, 255, 0.08)',
                      color: copiedCode ? '#6ee7b7' : '#e2e8f0',
                      border: copiedCode ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '6px',
                      padding: '3px 8px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.15s ease'
                    }}
                    title="Copy code to clipboard"
                  >
                    {copiedCode ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                    <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
              </div>

              {/* Code Editor Body with Line Numbers Gutter */}
              <div style={{
                display: 'flex',
                flex: 1,
                minHeight: '440px',
                background: '#090d16',
                position: 'relative'
              }}>
                {/* Line Numbers Gutter */}
                <div style={{
                  padding: '16px 8px 16px 12px',
                  background: '#070a10',
                  borderRight: '1px solid #1f2937',
                  color: '#475569',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.825rem',
                  lineHeight: '1.6',
                  textAlign: 'right',
                  userSelect: 'none',
                  minWidth: '38px',
                  boxSizing: 'border-box'
                }}>
                  {codeLines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                {/* Pure Editable Code Textarea (No running engine, smooth copy/paste & review) */}
                <textarea
                  ref={codeTextareaRef}
                  value={cardCode}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  onKeyDown={handleCodeKeyDown}
                  placeholder={`// Paste or write ${activeLangObj.name} code here for future review...\n// Editable code block without runtime bloat for seamless snippet reference.`}
                  spellCheck="false"
                  style={{
                    flex: 1,
                    width: '100%',
                    minHeight: '440px',
                    height: '100%',
                    background: '#090d16',
                    color: '#a7f3d0',
                    border: 'none',
                    outline: 'none',
                    padding: '16px 16px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    lineHeight: '1.6',
                    resize: 'none',
                    boxSizing: 'border-box',
                    whiteSpace: 'pre',
                    overflowX: 'auto',
                    overflowY: 'auto'
                  }}
                />
              </div>

              {/* Bottom Subtle Status Bar */}
              <div style={{
                background: '#000000',
                borderTop: '1px solid #1f2937',
                padding: '6px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#64748b',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                  <span>Editable Snippet • UTF-8</span>
                </div>
                <span>Tab: 2 spaces</span>
              </div>
            </div>
          )}

          {/* ================= RIGHT PANE: NOTES & REVIEW SECTION ================= */}
          {(viewMode === 'split' || viewMode === 'notes') && (
            <div style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '18px',
              padding: '18px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              overflowY: 'auto',
              maxHeight: viewMode === 'split' ? '560px' : 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}>
              {/* Right Pane Header: Title & Preview/Edit Mode Toggle */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #f1f5f9',
                paddingBottom: '10px'
              }}>
                <div style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#6366f1',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <FileText size={14} /> Concept Notes & Documentation
                </div>

                <div style={{
                  display: 'flex',
                  background: '#f1f5f9',
                  borderRadius: '8px',
                  padding: '2px',
                  gap: '2px'
                }}>
                  <button
                    onClick={() => setNotesMode('preview')}
                    style={{
                      background: notesMode === 'preview' ? '#ffffff' : 'transparent',
                      color: notesMode === 'preview' ? '#4338ca' : '#64748b',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '3px 8px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: notesMode === 'preview' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'
                    }}
                  >
                    <Eye size={12} /> Rendered
                  </button>

                  <button
                    onClick={() => setNotesMode('edit')}
                    style={{
                      background: notesMode === 'edit' ? '#ffffff' : 'transparent',
                      color: notesMode === 'edit' ? '#4338ca' : '#64748b',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '3px 8px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: notesMode === 'edit' ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'
                    }}
                  >
                    <Edit3 size={12} /> Edit Notes
                  </button>
                </div>
              </div>

              {/* Notes Body: Rendered Markdown or Textarea Editor */}
              <div style={{ flex: 1 }}>
                {notesMode === 'preview' ? (
                  <div style={{ minHeight: '380px' }}>
                    <MarkdownRenderer content={cardNotes || `# ${activeCard.title || 'Untitled Note'}\n\nNo concept notes written yet. Switch to "Edit Notes" above to add documentation, formulas, or explanations.`} />
                  </div>
                ) : (
                  <textarea
                    ref={notesTextareaRef}
                    value={cardNotes}
                    onChange={(e) => handleNotesChange(e.target.value)}
                    placeholder="# Document Title&#10;&#10;Write explanation notes, lists, key concepts, formulas, and analysis here..."
                    style={{
                      width: '100%',
                      minHeight: '400px',
                      background: '#f8fafc',
                      color: '#0f172a',
                      border: '1px solid #cbd5e1',
                      borderRadius: '12px',
                      padding: '14px 16px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
