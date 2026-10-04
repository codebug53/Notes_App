import React, { useState } from 'react';
import { X, Heart, Bookmark, Edit2, Share2, Copy, Check, Clock, Calendar, Code, HelpCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function PostDetailModal({
  post,
  onClose,
  onEditPost,
  onToggleBookmark,
  onLikePost
}) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPyqAnswers, setShowPyqAnswers] = useState({});

  if (!post) return null;

  const handleLike = () => {
    onLikePost(post.id);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const handleCopyCode = () => {
    if (post.codeSnippet) {
      navigator.clipboard.writeText(post.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const togglePyqAnswer = (idx) => {
    setShowPyqAnswers(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '900px', height: '90vh' }}
      >
        {/* Modal Top Navigation Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-gate">{post.category}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>•</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} /> {post.readTime || '5 min read'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Edit Button inside Reader Mode */}
            <button
              onClick={() => {
                onClose();
                onEditPost(post);
              }}
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px' }}
            >
              <Edit2 size={14} color="var(--accent-primary)" />
              <span>Edit Article</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(post.id)}
              className="btn-icon"
              title={post.bookmarked ? 'Bookmarked' : 'Bookmark'}
            >
              <Bookmark size={18} fill={post.bookmarked ? 'var(--accent-amber)' : 'none'} color={post.bookmarked ? 'var(--accent-amber)' : 'var(--text-muted)'} />
            </button>

            {/* Share */}
            <button
              onClick={handleCopyLink}
              className="btn-icon"
              title="Copy Article Link"
            >
              {copiedLink ? <Check size={18} color="var(--accent-emerald)" /> : <Share2 size={18} />}
            </button>

            {/* Close */}
            <button onClick={onClose} className="btn-icon">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Article Content */}
        <div style={{ padding: '30px 40px', overflowY: 'auto', flex: 1 }}>
          {/* Article Title */}
          <h1 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '16px' }}>
            {post.title}
          </h1>

          {/* Author & Date Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '20px',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--gradient-badge)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: '#ffffff'
              }}>
                {post.author ? post.author[0] : 'A'}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{post.author || 'Mahammad Azhar'}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} /> {post.date}
                </div>
              </div>
            </div>

            {/* Like Counter Button */}
            <button
              onClick={handleLike}
              className="btn btn-secondary"
              style={{ borderRadius: 'var(--radius-full)', color: 'var(--accent-rose)', gap: '6px' }}
            >
              <Heart size={16} fill="rgba(244, 63, 94, 0.3)" />
              <span>{post.likes || 0} Likes</span>
            </button>
          </div>

          {/* Key Formulas Box */}
          {post.keyFormulas && post.keyFormulas.length > 0 && (
            <div className="formula-callout" style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} /> Key Formulas & Takeaways
              </h4>
              <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                {post.keyFormulas.map((formula, idx) => (
                  <li key={idx}>{formula}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Main Text Content */}
          <div
            style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'var(--text-primary)',
              whiteSpace: 'pre-wrap',
              marginBottom: '30px'
            }}
          >
            {post.content}
          </div>

          {/* Code Snippet Box with Copy Button */}
          {post.codeSnippet && (
            <div style={{ marginBottom: '30px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#161b22',
                padding: '10px 16px',
                borderTopLeftRadius: 'var(--radius-md)',
                borderTopRightRadius: 'var(--radius-md)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderBottom: 'none'
              }}>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                  <Code size={16} /> Solution Code Implementation
                </span>
                <button
                  onClick={handleCopyCode}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '4px', padding: '4px 8px' }}
                >
                  {copiedCode ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre style={{ marginTop: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                <code>{post.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Solved GATE PYQs Section */}
          {post.solvedPYQs && post.solvedPYQs.length > 0 && (
            <div style={{ marginTop: '30px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-amber)' }}>
                <HelpCircle size={20} /> Solved GATE PYQ Practice
              </h3>
              {post.solvedPYQs.map((pyq, idx) => (
                <div key={idx} className="pyq-box">
                  <p style={{ fontWeight: 700, marginBottom: '12px', fontSize: '0.95rem' }}>{pyq.question}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                    {pyq.options && pyq.options.map((opt, oIdx) => (
                      <div key={oIdx} style={{ background: 'var(--bg-input)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                        {opt}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => togglePyqAnswer(idx)}
                    className="btn btn-secondary btn-sm"
                    style={{ marginBottom: showPyqAnswers[idx] ? '12px' : 0 }}
                  >
                    {showPyqAnswers[idx] ? 'Hide Answer & Explanation' : 'Reveal GATE Solution'}
                  </button>

                  {showPyqAnswers[idx] && (
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', borderLeft: '3px solid var(--accent-emerald)', padding: '12px', borderRadius: '4px', fontSize: '0.875rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '4px' }}>
                        Correct Answer: {pyq.correctOption}
                      </div>
                      <p style={{ color: 'var(--text-secondary)' }}>{pyq.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
