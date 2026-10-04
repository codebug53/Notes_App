import React, { useState } from 'react';
import { PostCard } from './PostCard';
import { SlidersHorizontal, Grid, List, Sparkles, PlusCircle } from 'lucide-react';

export function PostList({
  posts,
  selectedCategory,
  setSelectedCategory,
  onSelectPost,
  onEditPost,
  onDeletePost,
  onToggleBookmark,
  onLikePost,
  onOpenNewPost
}) {
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');
  const [activeTag, setActiveTag] = useState('All');

  // Extract all unique tags
  const allTags = ['All', ...new Set(posts.flatMap(p => p.tags || []))];

  // Filter & Sort posts
  const filteredPosts = posts.filter(post => {
    const matchesCat = selectedCategory === 'All Categories' || post.category === selectedCategory;
    const matchesTag = activeTag === 'All' || (post.tags && post.tags.includes(activeTag));
    return matchesCat && matchesTag;
  }).sort((a, b) => {
    if (sortBy === 'latest') return new Date(b.date || 0) - new Date(a.date || 0);
    if (sortBy === 'likes') return (b.likes || 0) - (a.likes || 0);
    if (sortBy === 'readTime') return parseInt(b.readTime || 0) - parseInt(a.readTime || 0);
    return 0;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Controls: Filter Pills & Sorting */}
      <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          
          {/* Active Header & Count */}
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{selectedCategory}</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', background: 'var(--bg-input)', padding: '2px 10px', borderRadius: 'var(--radius-full)' }}>
                {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'}
              </span>
            </h2>
          </div>

          {/* Controls: Sort & Layout Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Sort Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <SlidersHorizontal size={15} color="var(--text-muted)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{ padding: '6px 12px', fontSize: '0.85rem', width: 'auto' }}
              >
                <option value="latest">Latest First</option>
                <option value="likes">Most Popular</option>
                <option value="readTime">Longest Read</option>
              </select>
            </div>

            {/* Layout Mode */}
            <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '3px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <button
                onClick={() => setViewMode('grid')}
                className="btn-icon"
                style={{
                  width: '30px', height: '30px', padding: 0,
                  background: viewMode === 'grid' ? 'var(--accent-primary)' : 'transparent',
                  color: viewMode === 'grid' ? '#ffffff' : 'var(--text-muted)',
                  border: 'none'
                }}
              >
                <Grid size={15} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className="btn-icon"
                style={{
                  width: '30px', height: '30px', padding: 0,
                  background: viewMode === 'list' ? 'var(--accent-primary)' : 'transparent',
                  color: viewMode === 'list' ? '#ffffff' : 'var(--text-muted)',
                  border: 'none'
                }}
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Tag Pills Bar */}
        {allTags.length > 1 && (
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingTop: '14px', marginTop: '14px', borderTop: '1px solid var(--border-color)' }}>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  background: activeTag === tag ? 'var(--accent-primary)' : 'var(--bg-input)',
                  color: activeTag === tag ? '#ffffff' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease'
                }}
              >
                {tag === 'All' ? 'All Tags' : `#${tag}`}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Posts Grid / List */}
      {filteredPosts.length === 0 ? (
        <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
          <Sparkles size={40} color="var(--accent-primary)" style={{ margin: '0 auto 16px auto', opacity: 0.6 }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>No Articles Found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px', maxWidth: '400px', margin: '0 auto 20px auto' }}>
            There are no blog posts matching your search criteria. Create your first study note or change the filters!
          </p>
          <button onClick={onOpenNewPost} className="btn btn-primary">
            <PlusCircle size={18} />
            <span>Create Blog Post</span>
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr',
          gap: '20px'
        }}>
          {filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onSelectPost={onSelectPost}
              onEditPost={onEditPost}
              onDeletePost={onDeletePost}
              onToggleBookmark={onToggleBookmark}
              onLikePost={onLikePost}
            />
          ))}
        </div>
      )}
    </div>
  );
}
