import React, { useState } from 'react';
import { Sparkles, HelpCircle, FileText, Lightbulb, Copy, Check, ArrowRight, Bot } from 'lucide-react';
import confetti from 'canvas-confetti';

export function AIAssistantPanel({ activeNote }) {
  const [outputType, setOutputType] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiOutput, setAiOutput] = useState('');
  const [copied, setCopied] = useState(false);

  if (!activeNote) {
    return (
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '24px', textAlign: 'center' }}>
        <p style={{ color: '#64748b' }}>Select a study note to use AI Context Helper features.</p>
      </div>
    );
  }

  const handleGenerate = (type) => {
    setOutputType(type);
    setIsGenerating(true);
    setCopied(false);

    setTimeout(() => {
      let result = '';
      if (type === 'summary') {
        result = `📌 **AI Executive Summary for "${activeNote.title}"**:\n\n` +
                 `1. **Core Concept**: ${activeNote.summary}\n` +
                 `2. **Key Equation/Formula**: ${activeNote.keyTakeaways?.[0] || 'See main note body.'}\n` +
                 `3. **Exam Application**: High relevance for term exams and interview technical rounds.`;
      } else if (type === 'quiz') {
        result = `❓ **Generated 3 Practice Quiz Questions**:\n\n` +
                 `**Q1**: What is the primary theoretical goal of ${activeNote.title}?\n` +
                 `*Answer*: ${activeNote.keyTakeaways?.[0] || activeNote.summary}\n\n` +
                 `**Q2**: Under what specific boundary condition or edge case does this model fail?\n` +
                 `*Answer*: ${activeNote.keyTakeaways?.[1] || 'See edge cases in note code.'}\n\n` +
                 `**Q3**: How would you write or implement this concept in production?\n` +
                 `*Answer*: Inspect the attached algorithm implementation in the note workspace.`;
      } else if (type === 'flashcards') {
        result = `🎴 **Extracted Active Recall Flashcards**:\n\n` +
                 `**Card 1**:\n- Front: Define ${activeNote.title.split(':')[0] || activeNote.title}.\n- Back: ${activeNote.summary}\n\n` +
                 `**Card 2**:\n- Front: Key Formula / Takeaway\n- Back: ${activeNote.keyTakeaways?.[0] || 'N/A'}`;
      } else if (type === 'simplify') {
        result = `💡 **Simplified Explanation (ELI5)**:\n\n` +
                 `Imagine you are building a LEGO tower. "${activeNote.title}" is like choosing the strongest blocks first so your tower never wobbles! ` +
                 `${activeNote.summary.replace(/O\([^\)]+\)/g, 'a fast rule')}`;
      }

      setAiOutput(result);
      setIsGenerating(false);
      confetti({ particleCount: 30, spread: 40 });
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(aiOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Top Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', color: '#ffffff', border: '1px solid #4338ca', borderRadius: '18px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{ background: '#6366f1', padding: '8px', borderRadius: '10px', color: '#ffffff' }}>
            <Bot size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>AI Context Study Assistant</h2>
            <p style={{ fontSize: '0.78rem', color: '#c7d2fe' }}>Analyze active note: "{activeNote.title}"</p>
          </div>
        </div>
      </div>

      {/* Interactive Action Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
        <button
          onClick={() => handleGenerate('summary')}
          style={{
            background: '#ffffff',
            border: outputType === 'summary' ? '2px solid #6366f1' : '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '14px',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.875rem', color: '#6366f1', marginBottom: '4px' }}>
            <FileText size={16} />
            <span>Summarize Note</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Generate 3 key executive bullet points</p>
        </button>

        <button
          onClick={() => handleGenerate('quiz')}
          style={{
            background: '#ffffff',
            border: outputType === 'quiz' ? '2px solid #f59e0b' : '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '14px',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.875rem', color: '#f59e0b', marginBottom: '4px' }}>
            <HelpCircle size={16} />
            <span>Generate Exam Quiz</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Create 3 exam practice questions</p>
        </button>

        <button
          onClick={() => handleGenerate('flashcards')}
          style={{
            background: '#ffffff',
            border: outputType === 'flashcards' ? '2px solid #10b981' : '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '14px',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.875rem', color: '#10b981', marginBottom: '4px' }}>
            <Sparkles size={16} />
            <span>Extract Flashcards</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Turn cues into active recall cards</p>
        </button>

        <button
          onClick={() => handleGenerate('simplify')}
          style={{
            background: '#ffffff',
            border: outputType === 'simplify' ? '2px solid #06b6d4' : '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '14px',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.875rem', color: '#06b6d4', marginBottom: '4px' }}>
            <Lightbulb size={16} />
            <span>Simplify Concept</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Explain simply without heavy jargon</p>
        </button>
      </div>

      {/* AI Response Display Box */}
      {isGenerating ? (
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '30px', textAlign: 'center' }}>
          <Sparkles className="spin" size={28} color="#6366f1" style={{ margin: '0 auto 10px auto' }} />
          <p style={{ fontWeight: 700, color: '#334155' }}>AI Assistant analyzing context...</p>
        </div>
      ) : aiOutput ? (
        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '20px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              AI Response Output
            </span>
            <button
              onClick={handleCopy}
              style={{
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy Result'}</span>
            </button>
          </div>

          <div style={{ fontSize: '0.875rem', color: '#1e293b', lineHeight: 1.6, whitespace: 'pre-line' }}>
            {aiOutput}
          </div>
        </div>
      ) : null}
    </div>
  );
}
