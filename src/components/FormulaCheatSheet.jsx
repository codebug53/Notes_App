import React, { useState } from 'react';
import { CHEAT_SHEET_DATA } from '../data/cheatSheets';
import { Layers, Copy, Check, Search, Calculator } from 'lucide-react';

export function FormulaCheatSheet() {
  const [filterQuery, setFilterQuery] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filteredData = CHEAT_SHEET_DATA.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      (item.formula && item.formula.toLowerCase().includes(filterQuery.toLowerCase()))
    )
  })).filter(group => group.items.length > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Search */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
              <Calculator color="#06b6d4" size={22} />
              <span>Multi-Subject Formula & Theorem Matrix</span>
            </h2>
            <p style={{ fontSize: '0.825rem', color: '#64748b' }}>
              Instant lookup for Algorithms, Linear Algebra, Electromagnetism, Chemistry, and OS formulas.
            </p>
          </div>

          <div style={{ flex: 1, maxWidth: '300px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search formulas or theorems..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '36px', fontSize: '0.825rem' }}
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredData.map((section, sIdx) => (
          <div key={sIdx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '14px', color: '#6366f1', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{section.category}</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
              {section.items.map((item, iIdx) => {
                const globalIdx = `${sIdx}-${iIdx}`;
                return (
                  <div
                    key={iIdx}
                    style={{
                      background: '#f8fafc',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      border: '1px solid #e2e8f0'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', marginBottom: '2px' }}>
                        {item.name}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#0284c7', fontWeight: 600, wordBreak: 'break-word' }}>
                        {item.formula}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(`${item.name}: ${item.formula}`, globalIdx)}
                      className="btn-icon"
                      title="Copy formula"
                      style={{ flexShrink: 0 }}
                    >
                      {copiedIndex === globalIdx ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
