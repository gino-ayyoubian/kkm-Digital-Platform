const ALLOWED_TAGS = new Set([
  'a',
  'article',
  'blockquote',
  'br',
  'code',
  'div',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'li',
  'ol',
  'p',
  'pre',
  'section',
  'span',
  'strong',
  'sub',
  'sup',
  'ul',
]);

const ALLOWED_ATTRS = new Set(['href', 'target', 'rel']);
const SAFE_HREF = /^(https?:|mailto:|tel:|\/|#)/i;

function sanitizeNode(node: Node) {
  if (node.nodeType === Node.COMMENT_NODE) {
    node.parentNode?.removeChild(node);
    return;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return;

  const element = node as HTMLElement;
  const tagName = element.tagName.toLowerCase();

  if (!ALLOWED_TAGS.has(tagName)) {
    const parent = element.parentNode;
    if (!parent) return;
    while (element.firstChild) {
      parent.insertBefore(element.firstChild, element);
    }
    parent.removeChild(element);
    return;
  }

  for (const attr of Array.from(element.attributes)) {
    const name = attr.name.toLowerCase();
    if (!ALLOWED_ATTRS.has(name)) {
      element.removeAttribute(attr.name);
      continue;
    }

    if (name === 'href') {
      const href = element.getAttribute('href') ?? '';
      if (!SAFE_HREF.test(href)) {
        element.removeAttribute('href');
      }
    }
  }

  if (tagName === 'a') {
    const href = element.getAttribute('href');
    if (!href) {
      element.removeAttribute('target');
      element.removeAttribute('rel');
    } else {
      if (element.getAttribute('target') === '_blank') {
        element.setAttribute('rel', 'noopener noreferrer');
      } else {
        element.removeAttribute('target');
        element.removeAttribute('rel');
      }
    }
  }

  Array.from(element.childNodes).forEach(sanitizeNode);
}

export function sanitizeHtml(html: string) {
  if (typeof window === 'undefined') return html;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  Array.from(doc.body.childNodes).forEach(sanitizeNode);
  return doc.body.innerHTML;
}

export function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
