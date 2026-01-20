import React, { useState } from 'react';
import { Visitor } from '../types';
import './Leaderboard.css';

interface LeaderboardProps {
  visitors: Visitor[];
  currentVisitor: Visitor | null;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ visitors, currentVisitor }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter out admin from leaderboard display and counts
  const nonAdminVisitors = visitors.filter(visitor => visitor.name !== 'j1o2s3e4p5hJoestar');
  
  // Filter by search term
  const filteredVisitors = nonAdminVisitors.filter(visitor =>
    visitor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort by first visit date (earliest first) - who came first gets higher rank
  const sortedVisitors = [...filteredVisitors].sort((a, b) => new Date(a.firstVisit).getTime() - new Date(b.firstVisit).getTime());

  const getRankIcon = (index: number) => {
    // Get the original rank from the full list
    const originalIndex = nonAdminVisitors
      .sort((a, b) => new Date(a.firstVisit).getTime() - new Date(b.firstVisit).getTime())
      .findIndex(v => v.id === sortedVisitors[index].id);
    
    switch (originalIndex) {
      case 0: return '1';
      case 1: return '2';
      case 2: return '3';
      default: return `#${originalIndex + 1}`;
    }
  };

  return (
    <div className="leaderboard">
      <h2>🎯 Visitor Arrival Order</h2>
      <div className="leaderboard-stats">
        <p>How many people visited so far: <span className="stat-number">{nonAdminVisitors.length}</span></p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input cursor-target"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="clear-search cursor-target"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      <div className="leaderboard-list">
        {sortedVisitors.map((visitor, index) => (
          <div 
            key={visitor.id} 
            className={`leaderboard-item ${visitor.id === currentVisitor?.id && currentVisitor?.name !== 'j1o2s3e4p5hJoestar' ? 'current-visitor' : ''}`}
          >
            <div className="rank">
              {getRankIcon(index)}
            </div>
            <div className="visitor-info">
              <span className="visitor-name">{visitor.name}</span>
              <span className="visit-count">{visitor.visitCount} visits</span>
            </div>
            <div className="visitor-meta">
              <div className="anime-code">{visitor.animeCode}</div>
              <div className="first-visit">
                Joined: {new Date(visitor.firstVisit).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {sortedVisitors.length === 0 && (
        <div className="empty-leaderboard">
          {searchTerm ? (
            <p>No visitors found matching "{searchTerm}" 🔍</p>
          ) : (
            <p>No visitors yet! Be the first to join! 🚀</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;