import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import BlurUpImage from '../components/BlurUpImage';
import { NEWS_ITEMS, PROJECTS } from '../constants';

describe('BlurUpImage', () => {
  it('shows a blurred base64 placeholder until the full image loads', () => {
    const placeholder = 'data:image/svg+xml;base64,PHN2Zy8+';
    render(<BlurUpImage src="/image.jpg" placeholder={placeholder} alt="Project site" />);

    const fullImage = screen.getByRole('img', { name: 'Project site' });
    const placeholderImage = document.querySelector('img[aria-hidden="true"]');

    expect(placeholderImage).toHaveAttribute('src', placeholder);
    expect(placeholderImage).toHaveStyle({ filter: 'blur(20px)', opacity: '1' });
    expect(fullImage).toHaveStyle({ opacity: '0', transition: 'opacity 300ms ease' });

    fireEvent.load(fullImage);

    expect(fullImage).toHaveStyle({ opacity: '1' });
    expect(placeholderImage).toHaveStyle({ opacity: '0' });
  });

  it('provides a high-resolution source and base64 placeholder for news and projects', () => {
    expect(NEWS_ITEMS.every(item => item.thumbnail === item.image && item.placeholder?.startsWith('data:image/'))).toBe(true);
    expect(PROJECTS.every(project => project.thumbnail === project.image && project.placeholder?.startsWith('data:image/'))).toBe(true);
  });
});
