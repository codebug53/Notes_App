import React, { useState } from 'react';
import { Code2, Maximize2, Minimize2, Copy, Check, X, FileCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CodeSnippetViewer({
  code = '',
  language = 'JavaScript',
  title = 'Algorithm Code Snippet',
  onCodeChange
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editableCode, setEditableCode] = useState(code);

  // Sync prop changes
  React.useEffect(() => {
    setEditableCode(code);
  }, [code]);

  const handleCopy = (e) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(editableCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTextChange = (newVal) => {
    setEditableCode(newVal);
    if (onCodeChange) onCodeChange(newVal);
  };

  const lines = editableCode.split('\n');

  return (
    <>
      {/* 1. Compact Code Block Preview Card */}
      <motion.div
        whileHover={{ scale: 1.005, borderColor: '#6366f1' }}
        whileTap={{ scale: 0.995 }}
        onClick={() => setIsExpanded(true)}
        className="playground-card"
        style={{
          cursor: 'pointer',
          position: 'relative',
          borderRadius: '18px',
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
          border: '1px solid #1e293b',
          transition: 'border-color 0.2s ease'
        }}
      >
        {/* macOS Window Controls Header */}
        <div className="playground-header" style={{ background: '#0d1117', padding: '10px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
            </div>
            <span style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: 700, marginLeft: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <FileCode size={14} color="#6366f1" />
              {title}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={handleCopy}
              className="btn-icon"
              style={{ color: '#94a3b8', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255, 255, 255, 0.05)' }}
            >
              {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <div style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', fontSize: '0.725rem', padding: '3px 8px', borderRadius: '6px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Maximize2 size={12} />
              <span>Expand</span>
            </div>
          </div>
        </div>

        {/* Compact Code Preview Display */}
        <div style={{ position: 'relative', background: '#090d16', padding: '14px 16px', flex: 1, minHeight: '220px', display: 'flex', flexDirection: 'column' }}>
          <pre style={{
            margin: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.825rem',
            color: '#a7f3d0',
            lineHeight: 1.6,
            overflow: 'hidden',
            maxHeight: '240px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
          }}>
            {editableCode || '// Click to add code snippet...'}
          </pre>

          {/* Bottom Gradient Fade Overlay Prompting to Click */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50px',
            background: 'linear-gradient(transparent, #090d16)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: '8px',
            pointerEvents: 'none'
          }}>
            <span style={{ fontSize: '0.725rem', color: '#6366f1', fontWeight: 700, background: 'rgba(15, 23, 42, 0.85)', padding: '2px 10px', borderRadius: '99px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              Click to Open Full Panel
            </span>
          </div>
        </div>
      </motion.div>

      {/* 2. Apple-Style Pop Panel Modal Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 3000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(16px)'
              }}
            />

            {/* Apple Pop Panel Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '920px',
                height: '82vh',
                background: '#090d16',
                borderRadius: '22px',
                border: '1px solid #1e293b',
                boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.7)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Apple Header Window Bar */}
              <div style={{
                background: '#0d1117',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #1f2937'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '7px' }}>
                    <button
                      onClick={() => setIsExpanded(false)}
                      style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', border: 'none', cursor: 'pointer' }}
                      title="Close"
                    />
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
                  </div>

                  <span style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 800, marginLeft: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Code2 size={18} color="#6366f1" />
                    {title}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600 }}>
                    {lines.length} Lines
                  </span>

                  <button
                    type="button"
                    onClick={handleCopy}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid #334155',
                      color: '#ffffff',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied to Clipboard' : 'Copy Code'}</span>
                  </button>

                  <button
                    onClick={() => setIsExpanded(false)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: 'none',
                      color: '#94a3b8',
                      padding: '6px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Minimize"
                  >
                    <Minimize2 size={16} />
                  </button>
                </div>
              </div>

              {/* Full Expanded Code Editor Area with Line Numbers */}
              <div style={{ display: 'flex', flex: 1, overflow: 'hidden', background: '#090d16' }}>
                {/* Line Numbers Column */}
                <div style={{
                  padding: '16px 12px',
                  background: '#0d1117',
                  color: '#475569',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                  textAlign: 'right',
                  userSelect: 'none',
                  borderRight: '1px solid #1f2937'
                }}>
                  {lines.map((_, idx) => (
                    <div key={idx}>{idx + 1}</div>
                  ))}
                </div>

                {/* Textarea Editor */}
                <textarea
                  value={editableCode}
                  onChange={(e) => handleTextChange(e.target.value)}
                  spellCheck="false"
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    background: '#090d16',
                    color: '#a7f3d0',
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    padding: '16px 20px',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Footer Bar */}
              <div style={{
                background: '#0d1117',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid #1f2937',
                fontSize: '0.78rem',
                color: '#64748b'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1' }} />
                  <span>Syntax Highlight Mode: {language}</span>
                </div>
                <span>Press Esc or click X to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
