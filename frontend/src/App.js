import React from 'react';
import './App.css';
import Navigation from './Navigation';
import logo from './images/VetTrack-logo.png';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Triage from './Triage';
import Patients from './Patients';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path= "/" element= {<Triage/>} />
        <Route path= "/patients" element= {<Patients/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
