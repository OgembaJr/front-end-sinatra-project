import React from 'react';
import PoemList from './PoemList';
import './App.css';
import LoginPage from './LoginPage';

function App() {
  return (
    <div className="App">
     <LoginPage/>
      <PoemList/>
    </div>
  );
}

export default App;
