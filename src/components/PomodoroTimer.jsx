import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Flame, CheckCircle, Volume2, Sparkles, Coffee } from 'lucide-react';
import confetti from 'canvas-confetti';

export function PomodoroTimer() {
  const [mode, setMode] = useState('focus'); // 'focus' (25m), 'shortBreak' (5m), 'longBreak' (15m)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(3);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(75);

  const MODE_CONFIG = {
    focus: { label: 'Study Focus', seconds: 25 * 60, color: '#6366f1', icon: Flame },
    shortBreak: { label: 'Short Break', seconds: 5 * 60, color: '#10b981', icon: Coffee },
    longBreak: { label: 'Long Break', seconds: 15 * 60, color: '#06b6d4', icon: Sparkles }
  };

  // Play synthesized completion chime using Web Audio API
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      console.log("Audio play unavailable");
    }
  };

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      playChime();
      confetti({ particleCount: 50, spread: 60 });
      if (mode === 'focus') {
        setSessionsCompleted(prev => prev + 1);
        setTotalFocusMinutes(prev => prev + 25);
        setMode('shortBreak');
        setTimeLeft(5 * 60);
      } else {
        setMode('focus');
        setTimeLeft(25 * 60);
      }
      setIsRunning(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft, mode]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(MODE_CONFIG[newMode].seconds);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(MODE_CONFIG[mode].seconds);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  const currentConfig = MODE_CONFIG[mode];
  const progressPercent = ((currentConfig.seconds - timeLeft) / currentConfig.seconds) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '4px', color: '#0f172a' }}>
          Pomodoro Study Focus Timer
        </h2>
        <p style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '20px' }}>
          Boost retention with 25-minute deep work intervals & active breaks.
        </p>

        {/* Mode Selector Tabs */}
        <div style={{ display: 'inline-flex', background: '#f1f5f9', padding: '4px', borderRadius: '99px', gap: '4px', marginBottom: '24px' }}>
          {Object.keys(MODE_CONFIG).map((mKey) => {
            const isSel = mode === mKey;
            const cfg = MODE_CONFIG[mKey];
            return (
              <button
                key={mKey}
                onClick={() => switchMode(mKey)}
                style={{
                  padding: '7px 18px',
                  borderRadius: '99px',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: isSel ? cfg.color : 'transparent',
                  color: isSel ? '#ffffff' : '#64748b',
                  transition: 'all 0.15s ease'
                }}
              >
                {cfg.label}
              </button>
            );
          })}
        </div>

        {/* Circular Clock Graphic Display */}
        <div style={{
          position: 'relative',
          width: '240px',
          height: '240px',
          margin: '0 auto 24px auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background: `conic-gradient(${currentConfig.color} ${progressPercent}%, #f1f5f9 0deg)`,
          padding: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.06)'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '3.2rem', fontWeight: 900, color: '#0f172a', fontFamily: 'var(--font-mono)', letterSpacing: '-0.04em' }}>
              {formattedTime}
            </span>
            <span style={{ fontSize: '0.78rem', color: currentConfig.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '-4px' }}>
              {currentConfig.label}
            </span>
          </div>
        </div>

        {/* Control Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={toggleTimer}
            style={{
              background: currentConfig.color,
              color: '#ffffff',
              border: 'none',
              padding: '12px 32px',
              borderRadius: '99px',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: `0 6px 18px ${currentConfig.color}40`
            }}
            className="btn-action"
          >
            {isRunning ? <Pause size={18} fill="#ffffff" /> : <Play size={18} fill="#ffffff" />}
            <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
          </button>

          <button
            onClick={resetTimer}
            style={{
              background: '#f1f5f9',
              color: '#475569',
              border: '1px solid #cbd5e1',
              padding: '12px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Reset Timer"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Focus Session Stats Card */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '20px' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '14px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Flame size={18} color="#f59e0b" />
          <span>Today's Study Focus Statistics</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Sessions Done</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#6366f1', marginTop: '2px' }}>{sessionsCompleted}</div>
            <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Pomodoros</div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Total Focus</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10b981', marginTop: '2px' }}>{totalFocusMinutes} m</div>
            <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Deep study</div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Daily Goal</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#06b6d4', marginTop: '2px' }}>
              {Math.min(100, Math.round((totalFocusMinutes / 120) * 100))}%
            </div>
            <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>120 mins goal</div>
          </div>
        </div>
      </div>
    </div>
  );
}
