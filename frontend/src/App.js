import React from 'react';
import './App.css';
import Navigation from './Navigation';
import logo from './images/VetTrack-logo.png';

function App() {
  return (
    <div className="App">
      <Navigation />
      <header className="App-header">
        <h1>
        Vet Track - Veterinary Triage system
        </h1>
        <p>
        This is the home page for my veterinary triage management system.
        </p>
      </header>
    </div>
  );
}

export default App;
