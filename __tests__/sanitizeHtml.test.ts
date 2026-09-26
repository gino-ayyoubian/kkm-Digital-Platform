import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { escapeHtml, sanitizeHtml } from '../utils/sanitizeHtml';

describe('sanitizeHtml', () => {
  it('removes script tags and unsafe handlers', () => {
    const input = `<p>Hello</p><script>alert('x')</script><a href="javascript:alert(1)" onclick="alert(1)">Click</a>`;
    const output = sanitizeHtml(input);

    expect(output).toContain('<p>Hello</p>');
    expect(output).not.toContain('<script>');
    expect(output).not.toContain('onclick');
    expect(output).not.toContain('javascript:');
  });

  it('escapes raw html characters before markdown transformation', () => {
    expect(escapeHtml('<b>unsafe</b>')).toBe('&lt;b&gt;unsafe&lt;/b&gt;');
  });
});
