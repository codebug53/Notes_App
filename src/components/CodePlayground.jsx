import React, { useState } from 'react';
import { Play, CheckCircle, AlertCircle, RefreshCw, Terminal, Code2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export function CodePlayground({
  initialCode,
  testCases = [],
  onLessonPassed
}) {
  const [code, setCode] = useState(initialCode);
  const [consoleLogs, setConsoleLogs] = useState(['// Algorithm execution logs will appear here...']);
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Safe JavaScript Execution Engine
  const runCode = () => {
    setIsRunning(true);
    const logs = [];
    
    // Custom logger interceptor
    const customConsole = {
      log: (...args) => {
        logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
      },
      error: (...args) => {
        logs.push(`[Error] ${args.join(' ')}`);
      },
      warn: (...args) => {
        logs.push(`[Warn] ${args.join(' ')}`);
      }
    };

    try {
      // Execute code with custom console
      const execFunc = new Function('console', `${code}`);
      const evalResult = execFunc(customConsole);

      if (evalResult !== undefined) {
        logs.push(`> Output: ${typeof evalResult === 'object' ? JSON.stringify(evalResult) : evalResult}`);
      }

      setConsoleLogs(logs.length > 0 ? logs : ['Code executed successfully with zero errors.']);
      confetti({ particleCount: 30, spread: 50 });

    } catch (err) {
      setConsoleLogs([`Runtime Exception: ${err.message}`]);
    }

    setIsRunning(false);
  };

  const resetCode = () => {
    setCode(initialCode);
    setConsoleLogs(['// Code reset to initial state']);
    setTestResults(null);
  };

  return (
    <div className="playground-card">
      {/* Window Controls Header */}
      <div className="playground-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
          </div>
          <span style={{ color: '#ffffff', fontSize: '0.78rem', fontWeight: 700, marginLeft: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Code2 size={13} color="#10b981" />
            Algorithm Code Sandbox
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.68rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
            Live JS Engine
          </span>
        </div>
      </div>

      {/* Code Textarea Editor */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="code-textarea"
        spellCheck="false"
      />

      {/* Action Bar */}
      <div style={{
        background: '#111827',
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid #1f2937'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={runCode}
            disabled={isRunning}
            style={{
              background: '#10b981',
              color: '#ffffff',
              border: 'none',
              padding: '7px 16px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            className="btn-action"
          >
            <Play size={14} fill="#ffffff" />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>

          <button
            onClick={resetCode}
            style={{
              background: 'transparent',
              color: '#94a3b8',
              border: '1px solid #374151',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 600
            }}
          >
            <RefreshCw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Console Output Footer */}
      <div className="console-output">
        <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '4px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Terminal size={12} /> &gt;_ CONSOLE OUTPUT:
        </div>
        {consoleLogs.map((log, idx) => (
          <div key={idx} style={{ lineHeight: 1.4 }}>{log}</div>
        ))}
      </div>
    </div>
  );
}
