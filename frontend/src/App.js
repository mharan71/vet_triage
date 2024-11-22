import React from 'react';
import './CSS/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Triage from './Components/Triage';
import Patients from './Components/Patients';

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
