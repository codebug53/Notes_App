import React from 'react';
import { Bookmark, Heart, Clock, Edit2, Trash2, ArrowUpRight, Code, HelpCircle } from 'lucide-react';

export function PostCard({
  post,
  onSelectPost,
  onEditPost,
  onDeletePost,
  onToggleBookmark,
  onLikePost
}) {
  const getBadgeClass = (category) => {
    switch (category) {
      case 'GATE CS': return 'badge-gate';
      case 'Placement / DSA': return 'badge-dsa';
      case 'Operating Systems': return 'badge-os';
      case 'DBMS & Placement': return 'badge-dbms';
      case 'Interview Experience': return 'badge-interview';
      default: return 'badge-networks';
    }
  };

  return (
    <article
      className="glass-panel glass-panel-hover"
      style={{
        padding: '22px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 'var(--radius-lg)',
        position: 'relative'
      }}
    >
      <div>
        {/* Card Header: Category & Difficulty */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={`badge ${getBadgeClass(post.category)}`}>
              {post.category}
            </span>
            {post.difficulty && (
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.06)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)'
              }}>
                {post.difficulty}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {/* Bookmark */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(post.id);
              }}
              className="btn-icon"
              style={{ width: '32px', height: '32px', padding: 0 }}
              title={post.bookmarked ? 'Remove Bookmark' : 'Bookmark Note'}
            >
              <Bookmark size={15} fill={post.bookmarked ? 'var(--accent-amber)' : 'none'} color={post.bookmarked ? 'var(--accent-amber)' : 'var(--text-muted)'} />
            </button>

            {/* Edit Post */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditPost(post);
              }}
              className="btn-icon"
              style={{ width: '32px', height: '32px', padding: 0 }}
              title="Edit Note / Update Article"
            >
              <Edit2 size={15} color="var(--accent-primary)" />
            </button>

            {/* Delete Post */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
                  onDeletePost(post.id);
                }
              }}
              className="btn-icon"
              style={{ width: '32px', height: '32px', padding: 0 }}
              title="Delete Article"
            >
              <Trash2 size={15} color="var(--accent-rose)" />
            </button>
          </div>
        </div>

        {/* Post Title */}
        <h3
          onClick={() => onSelectPost(post)}
          style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            lineHeight: 1.4,
            marginBottom: '10px',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}
        >
          {post.title}
        </h3>

        {/* Post Summary */}
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          marginBottom: '16px',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {post.summary}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {post.tags.map((tag, idx) => (
              <span key={idx} style={{
                fontSize: '0.725rem',
                color: 'var(--accent-secondary)',
                background: 'rgba(6, 182, 212, 0.08)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontFamily: 'var(--font-mono)'
              }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Indicators: Code Snippet / Solved PYQs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {post.codeSnippet && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Code size={14} color="var(--accent-emerald)" />
              Code Snippet
            </span>
          )}
          {post.solvedPYQs && post.solvedPYQs.length > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <HelpCircle size={14} color="var(--accent-amber)" />
              {post.solvedPYQs.length} Solved PYQ
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Metadata & Read Action */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '14px',
        borderTop: '1px solid var(--border-color)',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} />
            {post.readTime || '5 min'}
          </span>
          <button
            onClick={() => onLikePost(post.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              color: 'var(--accent-rose)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem'
            }}
          >
            <Heart size={14} fill="rgba(244, 63, 94, 0.2)" />
            {post.likes || 0}
          </button>
        </div>

        <button
          onClick={() => onSelectPost(post)}
          className="btn btn-secondary btn-sm"
          style={{ gap: '4px' }}
        >
          <span>Read Article</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </article>
  );
}
