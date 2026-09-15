import React from 'react';

const SkipToContent: React.FC = () => {
  return (
    <a 
      href="#main-content" 
      className="absolute top-[-40px] left-0 bg-primary text-white p-2 z-[9999] transition-all focus:top-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-yellow rounded-br-md"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
