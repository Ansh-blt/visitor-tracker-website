import React, { useState, useEffect } from 'react';
import VisitorForm from './components/VisitorForm';
import Leaderboard from './components/Leaderboard';
import ExternalLinks from './components/ExternalLinks';
import Waves from './components/Waves';
import TargetCursor from './components/TargetCursor';
import { Visitor } from './types';
import { externalLinks } from './data/externalLinks';
import { generateAnimeCode, isValidAnimeCode } from './utils/animeCodeGenerator';
import { ADMIN_CONFIG, isAdminUser } from './config/admin';
import { 
  getVisitors, 
  saveVisitors, 
  getCurrentVisitor, 
  saveCurrentVisitor, 
  generateVisitorId 
} from './utils/storage';
import './App.css';

const App: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [currentVisitor, setCurrentVisitor] = useState<Visitor | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminCode, setAdminCode] = useState('');

  useEffect(() => {
    // Load existing data
    const storedVisitors = getVisitors();
    const storedCurrentVisitor = getCurrentVisitor();
    
    // Migrate old visitors to include anime codes if they don't have them
    const migratedVisitors = storedVisitors.map(visitor => {
      if (!visitor.animeCode) {
        return {
          ...visitor,
          animeCode: generateAnimeCode()
        };
      }
      return visitor;
    });
    
    // Save migrated data if changes were made
    if (migratedVisitors.some((v, i) => v.animeCode !== storedVisitors[i]?.animeCode)) {
      saveVisitors(migratedVisitors);
    }
    
    setVisitors(migratedVisitors);
    
    if (storedCurrentVisitor) {
      // Migrate current visitor if needed
      const migratedCurrentVisitor = storedCurrentVisitor.animeCode 
        ? storedCurrentVisitor 
        : { ...storedCurrentVisitor, animeCode: generateAnimeCode() };
      
      // Update visit count for returning visitor
      const updatedVisitor = {
        ...migratedCurrentVisitor,
        visitCount: migratedCurrentVisitor.visitCount + 1,
        lastVisit: new Date()
      };
      
      const updatedVisitors = migratedVisitors.map(v => 
        v.id === updatedVisitor.id ? updatedVisitor : v
      );
      
      setCurrentVisitor(updatedVisitor);
      setVisitors(updatedVisitors);
      saveCurrentVisitor(updatedVisitor);
      saveVisitors(updatedVisitors);
    } else {
      setShowForm(true);
    }
  }, []);

  const handleVisitorSubmit = (name: string, animeCode?: string): { success: boolean; message?: string; animeCode?: string } => {
    // Allow admin to enter multiple times without any code requirements
    const isAdmin = isAdminUser(name);
    
    if (!isAdmin) {
      // Check if name already exists (case-insensitive) for non-admin users
      const existingVisitor = visitors.find(visitor => 
        visitor.name.toLowerCase() === name.toLowerCase()
      );

      if (existingVisitor) {
        // Name exists, check if anime code is provided and valid
        if (!animeCode) {
          return { success: false, message: 'CODE_REQUIRED' };
        }
        
        if (!isValidAnimeCode(animeCode) || existingVisitor.animeCode.toLowerCase() !== animeCode.toLowerCase()) {
          return { success: false, message: 'INVALID_CODE' };
        }
        
        // Valid returning visitor - update their visit count
        const updatedVisitor = {
          ...existingVisitor,
          visitCount: existingVisitor.visitCount + 1,
          lastVisit: new Date()
        };
        
        const updatedVisitors = visitors.map(v => 
          v.id === existingVisitor.id ? updatedVisitor : v
        );
        
        setCurrentVisitor(updatedVisitor);
        setVisitors(updatedVisitors);
        setShowForm(false);
        
        saveCurrentVisitor(updatedVisitor);
        saveVisitors(updatedVisitors);
        
        return { success: true };
      }
    }

    // New visitor or admin - admin gets a code but doesn't need to use it
    const newAnimeCode = generateAnimeCode();
    const newVisitor: Visitor = {
      id: generateVisitorId(),
      name,
      visitCount: 1,
      lastVisit: new Date(),
      firstVisit: new Date(),
      animeCode: newAnimeCode
    };

    const updatedVisitors = [...visitors, newVisitor];
    
    setCurrentVisitor(newVisitor);
    setVisitors(updatedVisitors);
    setShowForm(false);
    
    saveCurrentVisitor(newVisitor);
    saveVisitors(updatedVisitors);
    
    // Only show anime code to non-admin users
    return { success: true, animeCode: isAdmin ? undefined : newAnimeCode };
  };

  const resetVisitor = () => {
    localStorage.removeItem('visitor-tracker-current');
    setCurrentVisitor(null);
    setShowForm(true);
  };

  const resetAllData = () => {
    if (window.confirm('Are you sure you want to reset ALL visitor data? This cannot be undone!')) {
      localStorage.removeItem('visitor-tracker-visitors');
      localStorage.removeItem('visitor-tracker-current');
      setVisitors([]);
      setCurrentVisitor(null);
      setShowForm(true);
    }
  };

  const handleAdminAccess = () => {
    if (isAdminUser(currentVisitor?.name || '') && adminCode === ADMIN_CONFIG.code) {
      setShowAdminPanel(true);
      setAdminCode('');
    } else {
      alert('Access denied!');
      setAdminCode('');
    }
  };

  const isAdmin = isAdminUser(currentVisitor?.name || '');

  return (
    <div className="app">
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
        disabled={showForm}
      />
      
      <Waves
        lineColor="rgba(255, 255, 255, 0.6)"
        backgroundColor="transparent"
        waveSpeedX={0.008}
        waveSpeedY={0.012}
        waveAmpX={25}
        waveAmpY={15}
        friction={0.92}
        tension={0.008}
        maxCursorMove={80}
        xGap={15}
        yGap={40}
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0 
        }}
      />
      
      <header className="app-header">
        <h1> Visitor Tracker</h1>
        <p>Welcome to the site!</p>
        {currentVisitor && (
          <div className="current-visitor-info">
            <p>Hey <strong>{currentVisitor.name}</strong>! This is visit #{currentVisitor.visitCount}</p>
            <p className="join-info">
              First joined: {new Date(currentVisitor.firstVisit).toLocaleDateString()} at {new Date(currentVisitor.firstVisit).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
              })}
            </p>
            <div className="visitor-buttons">
              <button onClick={resetVisitor} className="reset-btn cursor-target">
                Switch User
              </button>
              {isAdmin && !showAdminPanel && (
                <button onClick={() => setShowAdminPanel(true)} className="admin-btn cursor-target">
                  Admin
                </button>
              )}
              {isAdmin && showAdminPanel && (
                <div className="admin-panel">
                  <input
                    type="password"
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                    placeholder="Enter admin code"
                    className="admin-input cursor-target"
                  />
                  <button onClick={handleAdminAccess} className="admin-submit-btn cursor-target">
                    Access
                  </button>
                  <button onClick={() => {setShowAdminPanel(false); setAdminCode('');}} className="admin-cancel-btn cursor-target">
                    Cancel
                  </button>
                </div>
              )}
              {isAdmin && showAdminPanel && adminCode === ADMIN_CONFIG.code && (
                <button onClick={resetAllData} className="reset-all-btn cursor-target">
                  Reset All Data
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {showForm ? (
        <div className="fullscreen-form">
          <VisitorForm onSubmit={handleVisitorSubmit} />
        </div>
      ) : (
        <main className="app-main">
          <Leaderboard visitors={visitors} currentVisitor={currentVisitor} />
          <ExternalLinks links={externalLinks} />
        </main>
      )}

      <footer className="app-footer">
        <p>Made with ❤️ using React & TypeScript</p>
      </footer>
    </div>
  );
};

export default App;