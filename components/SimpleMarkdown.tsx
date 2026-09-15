import * as React from 'react';

// A simple component to render basic markdown
const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
    if (typeof text !== 'string' || !text) {
        return null;
    }

    const html = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            // Bold
            line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            // Headers (simplified)
            if (line.startsWith('### ')) return `<h3>${line.substring(4)}</h3>`;
            if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`;
            if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`;
            // List items
            if (line.startsWith('* ')) return `<li>${line.substring(2)}</li>`;
            // Paragraphs
            return `<p>${line}</p>`;
        })
        .join('')
        .replace(/<\/li><p><\/p><li>/g, '</li><li>') // Clean up empty paragraphs between list items
        .replace(/((?:<li>.*?<\/li>)+)/g, '<ul>$1</ul>'); // Group consecutive LIs into a UL

    return <div className="prose dark:prose-invert max-w-none text-text-light dark:text-slate-300" dangerouslySetInnerHTML={{ __html: html }} />;
};

export default SimpleMarkdown;