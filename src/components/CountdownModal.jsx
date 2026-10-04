import React, { useState, useEffect } from 'react';
import { X, Clock, Calendar, Target, Award, Sparkles } from 'lucide-react';

export function CountdownModal({ onClose }) {
  // Target GATE 2027 Date: February 7, 2027 (or configurable)
  const targetDate = new Date('2027-02-07T09:30:00');

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const diff = targetDate.getTime() - new Date().getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px', textAlign: 'center', padding: '30px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn-icon">
            <X size={20} />
          </button>
        </div>

        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'var(--gradient-badge)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          color: '#ffffff',
          boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)'
        }}>
          <Target size={32} />
        </div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
          GATE CS & Placement Target Countdown
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Target Exam Date: February 07, 2027 • Standard GATE Morning Session
        </p>

        {/* Big Countdown Timer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '28px'
        }}>
          {[
            { label: 'DAYS', val: timeLeft.days },
            { label: 'HOURS', val: timeLeft.hours },
            { label: 'MINUTES', val: timeLeft.minutes },
            { label: 'SECONDS', val: timeLeft.seconds }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px 8px'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-secondary)', fontFamily: 'var(--font-mono)' }}>
                {String(item.val).padStart(2, '0')}
              </div>
              <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', marginTop: '4px' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Card */}
        <div style={{
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid var(--border-glow)',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          textAlign: 'left',
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <Sparkles size={24} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '2px' }}>
              Consistency beats intensity!
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Solving 3 GATE PYQs and reviewing 1 core topic every day will put you in the top 1% rankers. Keep documenting your notes on DevPrep Desk!
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
