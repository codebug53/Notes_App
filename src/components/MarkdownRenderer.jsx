import React, { useMemo } from 'react';
import { marked } from 'marked';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Custom Marked options for clean rendering
marked.setOptions({
  gfm: true,
  breaks: true
});

export function MarkdownRenderer({ content = '', className = '' }) {
  const htmlContent = useMemo(() => {
    if (!content) return '';

    let text = String(content);

    // 1. Process Block Math: $$...$$ or \[...\]
    text = text.replace(/\$\$([\s\S]+?)\$\$/g, (match, math) => {
      try {
        return `<div class="katex-block-wrapper">${katex.renderToString(math.trim(), { displayMode: true, throwOnError: false })}</div>`;
      } catch (err) {
        return match;
      }
    });

    text = text.replace(/\\\[([\s\S]+?)\\\]/g, (match, math) => {
      try {
        return `<div class="katex-block-wrapper">${katex.renderToString(math.trim(), { displayMode: true, throwOnError: false })}</div>`;
      } catch (err) {
        return match;
      }
    });

    // 2. Process Inline Math: $...$ or \(...\)
    text = text.replace(/\$([^\$\n]+?)\$/g, (match, math) => {
      try {
        return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
      } catch (err) {
        return match;
      }
    });

    text = text.replace(/\\\(([\s\S]+?)\\\)/g, (match, math) => {
      try {
        return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
      } catch (err) {
        return match;
      }
    });

    // 3. Render Markdown to HTML via marked
    try {
      return marked.parse(text);
    } catch (e) {
      return text;
    }
  }, [content]);

  return (
    <div
      className={`markdown-body ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
