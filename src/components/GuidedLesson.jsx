import React from 'react';
import { BookOpen, Edit2, Trash2, Tag, CheckCircle2, Circle, ListOrdered, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MarkdownRenderer } from './MarkdownRenderer';

export function GuidedLesson({
  note,
  allNotes = [],
  flashcards = [],
  onSelectNote,
  onEditNote,
  onDeleteNote
}) {
  if (!note) {
    return (
      <div style={{ border: '1px solid #e2e8f0', borderRadius: '18px', padding: '24px', background: '#ffffff', textAlign: 'center' }}>
        <p style={{ color: '#64748b' }}>No notes in this folder yet. Click "New Cornell Note" to create one!</p>
      </div>
    );
  }

  // Use flashcards as the syllabus index, or fall back to notes
  const syllabusItems = flashcards.length > 0 ? flashcards : allNotes.map(n => ({
    id: n.id,
    title: n.title,
    subject: n.subject || 'CS & Algorithms'
  }));

  // Group syllabus items by subject
  const syllabusBySubject = syllabusItems.reduce((acc, item) => {
    const subj = item.subject || 'General CS';
    if (!acc[subj]) acc[subj] = [];
    acc[subj].push(item);
    return acc;
  }, {});

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 1. Flashcard Titles Syllabus Index */}
      <div style={{
        border: '1px solid #e2e8f0',
        borderRadius: '18px',
        padding: '14px 16px',
        background: '#ffffff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ListOrdered size={16} color="#6366f1" />
            <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Flashcard Syllabus Index ({syllabusItems.length} Topics)
            </h3>
          </div>
          <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600 }}>Click title to select note</span>
        </div>

        {/* Grouped Syllabus List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '160px', overflowY: 'auto', paddingRight: '4px' }}>
          {Object.entries(syllabusBySubject).map(([subj, items]) => (
            <div key={subj}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <BookOpen size={12} color="#6366f1" />
                <span>{subj}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {items.map((item, idx) => {
                  const targetNote = allNotes.find(n => n.id === item.id || n.title === item.title) || allNotes[idx % allNotes.length];
                  const isSelected = note && (targetNote?.id === note.id || item.title === note.title);

                  return (
                    <motion.div
                      key={item.id || idx}
                      whileHover={{ x: 3 }}
                      onClick={() => targetNote && onSelectNote(targetNote)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        background: isSelected ? '#6366f1' : '#f8fafc',
                        color: isSelected ? '#ffffff' : '#1e293b',
                        fontSize: '0.78rem',
                        fontWeight: isSelected ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        border: isSelected ? '1px solid #4f46e5' : '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {isSelected ? <CheckCircle2 size={13} color="#ffffff" /> : <Circle size={13} color="#94a3b8" />}
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.title || item.question}
                        </span>
                      </div>
                      <ArrowRight size={12} style={{ opacity: isSelected ? 1 : 0.4, flexShrink: 0 }} />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Cornell Note Content Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={note.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.18 }}
          style={{
            border: '1px solid #cbd5e1',
            borderRadius: '18px',
            padding: '20px',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
          }}
        >
          {/* Note Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '0.725rem', color: '#6366f1', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {note.subject || 'Study Note'} • Edited {note.lastEdited}
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '2px', lineHeight: 1.3 }}>
                {note.title}
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEditNote(note)}
                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#6366f1', cursor: 'pointer', padding: '6px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Edit2 size={14} />
                <span>Edit</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDeleteNote(note.id)}
                style={{ background: '#ffe4e6', border: '1px solid #fecdd3', color: '#f43f5e', cursor: 'pointer', padding: '6px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Trash2 size={14} />
              </motion.button>
            </div>
          </div>

          {/* Cornell Split Layout: Left Cues + Right Detailed Content */}
          <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: '16px' }}>
            {/* Cues Column */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <HelpCircle size={13} /> Recall Cues
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(note.cues || ["Key concept questions", "Exam edge cases", "Formula derivation"]).map((cue, idx) => (
                  <div key={idx} style={{ fontSize: '0.725rem', fontWeight: 700, color: '#334155', background: '#ffffff', padding: '6px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                    <HelpCircle size={12} color="#6366f1" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{cue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Notes Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <MarkdownRenderer content={note.content || note.summary} />

              {/* Tags */}
              {note.tags && note.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                  {note.tags.map((t, idx) => (
                    <span key={idx} style={{ background: '#e0e7ff', color: '#4338ca', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Tag size={10} /> #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Key Takeaways & Formula Matrix */}
          {note.keyTakeaways && note.keyTakeaways.length > 0 && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '14px' }}>
              <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} /> Key Takeaways & Formula Matrix
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {note.keyTakeaways.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.8rem', color: '#166534', fontWeight: 600 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a', marginTop: '6px', flexShrink: 0 }} />
                    <MarkdownRenderer content={item} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Cornell Summary Bar */}
          <div style={{ background: '#eff6ff', borderLeft: '4px solid #3b82f6', padding: '12px 14px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase', marginBottom: '2px' }}>
              Cornell Summary Recap
            </div>
            <div style={{ fontSize: '0.825rem', color: '#1e40af', fontWeight: 600, lineHeight: 1.4 }}>
              <MarkdownRenderer content={note.summary} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
