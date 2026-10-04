import React, { useState } from 'react';
import { INITIAL_FLASHCARDS } from '../data/flashcards';
import { Zap, RotateCw, CheckCircle, HelpCircle, Filter } from 'lucide-react';
import confetti from 'canvas-confetti';

export function FlashcardsView() {
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('devprep_flashcards');
    return saved ? JSON.parse(saved) : INITIAL_FLASHCARDS;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('All');

  const subjects = ['All', ...new Set(cards.map(c => c.subject))];

  const filteredCards = cards.filter(c => selectedSubject === 'All' || c.subject === selectedSubject);
  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const saveCards = (newCards) => {
    setCards(newCards);
    localStorage.setItem('devprep_flashcards', JSON.stringify(newCards));
  };

  const handleToggleMastered = (cardId) => {
    const updated = cards.map(c => c.id === cardId ? { ...c, mastered: !c.mastered } : c);
    saveCards(updated);
    if (!cards.find(c => c.id === cardId).mastered) {
      confetti({ particleCount: 40, spread: 50 });
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const masteredCount = cards.filter(c => c.mastered).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Subject Filter */}
      <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap color="var(--accent-amber)" fill="var(--accent-amber)" size={22} />
              <span>GATE & Placement Revision Flashcards</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Test your recall on core computer science definitions, time complexities, and theorems.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, background: 'var(--bg-input)', padding: '6px 14px', borderRadius: 'var(--radius-full)' }}>
              <CheckCircle size={16} color="var(--accent-emerald)" />
              <span>{masteredCount} / {cards.length} Mastered</span>
            </div>
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginTop: '16px' }}>
          {subjects.map(subj => (
            <button
              key={subj}
              onClick={() => {
                setSelectedSubject(subj);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: selectedSubject === subj ? 'var(--gradient-badge)' : 'var(--bg-input)',
                color: selectedSubject === subj ? '#ffffff' : 'var(--text-secondary)'
              }}
            >
              {subj}
            </button>
          ))}
        </div>
      </div>

      {/* Main Flashcard Display */}
      {filteredCards.length > 0 && currentCard ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '650px',
              minHeight: '280px',
              padding: '30px',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              perspective: '1000px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              background: isFlipped ? 'var(--bg-card-hover)' : 'var(--bg-card)',
              border: isFlipped ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Card Subject & Status */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge badge-gate">{currentCard.subject}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <RotateCw size={14} />
                <span>Click to Flip ({isFlipped ? 'Answer' : 'Question'})</span>
              </div>
            </div>

            {/* Card Content Text */}
            <div style={{ margin: '24px 0', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: isFlipped ? 'var(--accent-emerald)' : 'var(--accent-amber)', letterSpacing: '0.08em', marginBottom: '8px' }}>
                {isFlipped ? 'Answer Key' : 'Flashcard Question'}
              </div>
              <p style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.5, color: 'var(--text-primary)' }}>
                {isFlipped ? currentCard.answer : currentCard.question}
              </p>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Card {currentIndex + 1} of {filteredCards.length}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleMastered(currentCard.id);
                }}
                className="btn btn-sm"
                style={{
                  background: currentCard.mastered ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-input)',
                  color: currentCard.mastered ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                  border: currentCard.mastered ? '1px solid var(--accent-emerald)' : '1px solid var(--border-color)'
                }}
              >
                <CheckCircle size={14} />
                <span>{currentCard.mastered ? 'Mastered ✓' : 'Mark as Mastered'}</span>
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', gap: '14px' }}>
            <button onClick={prevCard} className="btn btn-secondary">
              ← Previous Card
            </button>
            <button onClick={nextCard} className="btn btn-primary">
              Next Card →
            </button>
          </div>

        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <HelpCircle size={32} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
          <p>No flashcards found for this category.</p>
        </div>
      )}
    </div>
  );
}
