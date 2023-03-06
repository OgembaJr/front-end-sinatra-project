import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import PoemList from './PoemList';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPoem, setSelectedPoem] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  function handleLogin(token) {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setSelectedPoem(null);
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        <PoemList
          onLogout={handleLogout}
          selectedPoem={selectedPoem}
          onPoemSelect={setSelectedPoem}
        />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
