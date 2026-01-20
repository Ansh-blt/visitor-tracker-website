import React, { useState } from 'react';
import { ExternalLink } from '../types';
import './ExternalLinks.css';

interface ExternalLinksProps {
  links: ExternalLink[];
}

const ExternalLinks: React.FC<ExternalLinksProps> = ({ links }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', ...Array.from(new Set(links.map(link => link.category)))];
  const filteredLinks = selectedCategory === 'All' 
    ? links 
    : links.filter(link => link.category === selectedCategory);

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="external-links">
      <h2>🌐 Explore More</h2>
      <p className="section-description">
        Check out these awesome websites you might find interesting!
      </p>
      
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn cursor-target ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="links-grid">
        {filteredLinks.map(link => (
          <div key={link.id} className="link-card cursor-target">
            <h3 className="link-title">{link.title}</h3>
            <p className="link-description">{link.description}</p>
            <div className="link-footer">
              <span className="link-category">{link.category}</span>
              <button 
                className="visit-btn cursor-target"
                onClick={() => handleLinkClick(link.url)}
              >
                Visit Site →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExternalLinks;