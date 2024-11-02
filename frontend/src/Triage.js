import React from 'react';
import './App.css';
import Navigation from './Navigation';
import logo from './images/VetTrack-logo.png';


function Triage () {
    return (
        <div className="Triage">
            <Navigation />
            <header className= "Triage-header">
                <h1>
                 Triage
                </h1>            
            </header>
        </div>
    );
}

export default Triage;