import React, { useState } from 'react';
import LetterGlitch from './LetterGlitch';
import './VisitorForm.css';

interface VisitorFormProps {
  onSubmit: (name: string, animeCode?: string) => { success: boolean; message?: string; animeCode?: string };
}

const VisitorForm: React.FC<VisitorFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [animeCode, setAnimeCode] = useState('');
  const [error, setError] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const result = onSubmit(name.trim(), animeCode.trim() || undefined);
      
      if (result.success) {
        if (result.animeCode) {
          setSuccessMessage(`Welcome! Your unique anime character is: ${result.animeCode}. Save this name to return later!`);
        }
        setError('');
      } else {
        if (result.message === 'CODE_REQUIRED') {
          setShowCodeInput(true);
          setError('This name already exists! Please enter your anime character name to continue.');
        } else if (result.message === 'INVALID_CODE') {
          setError('Invalid anime character name! Please check your character name and try again.');
        } else {
          setError(result.message || 'An error occurred. Please try again.');
        }
      }
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error || successMessage) {
      setError('');
      setSuccessMessage('');
      setShowCodeInput(false);
      setAnimeCode('');
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimeCode(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <div className="visitor-form-wrapper">
      <div className="glitch-background">
        <LetterGlitch
          glitchColors={['#667eea', '#764ba2', '#ff6b6b']}
          glitchSpeed={80}
          centerVignette={true}
          outerVignette={true}
          smooth={true}
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
        />
      </div>
      <div className="visitor-form-container">
        <h2>Welcome! What's your name?</h2>
        <form onSubmit={handleSubmit} className="visitor-form">
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name..."
            className={`name-input ${error ? 'error' : ''}`}
            maxLength={50}
          />
          
          {showCodeInput && (
            <input
              type="text"
              value={animeCode}
              onChange={handleCodeChange}
              placeholder="Enter your anime character code (e.g., Luffy, Goku, Ichigo)"
              className={`name-input anime-code-input ${error ? 'error' : ''}`}
              maxLength={20}
            />
          )}
          
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
          
          <button type="submit" className="submit-btn">
            {showCodeInput ? 'Verify & Continue' : 'Join the Leaderboard!'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VisitorForm;