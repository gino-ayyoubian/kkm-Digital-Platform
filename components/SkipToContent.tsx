import React from 'react';

const SkipToContent: React.FC = () => {
  return (
    <a 
      href="#main-content" 
      className="absolute top-[-56px] left-0 inline-flex min-h-12 min-w-12 items-center bg-primary px-4 py-3 text-white z-[9999] transition-all focus:top-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-yellow rounded-br-md"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
