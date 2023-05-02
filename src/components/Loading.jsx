import React, { useState, useEffect } from 'react';

const LoadingPage = () => {
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEmoji(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const emojis = [
    '🐶', '🐱', '🐰', '🐹', '🐭', '🦊', '🐻', '🦁', '🐯', '🐮', '🐷', '🐸', '🐵'
  ];

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      {showEmoji && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          height: 'auto',
          width: '50%',
        }}>
          {emojis.map((emoji, index) => (
            <span
              key={index}
              style={{
                fontSize: '3rem',
                animation: `fade-in 1s ${0.1 * index}s ease-in`,
              }}
            >
              {emoji}
            </span>
          ))}
          <style>{`
            @keyframes fade-in {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default LoadingPage;
