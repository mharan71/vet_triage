import React from 'react';
import './App.css';
import Navigation from './Navigation';
import logo from './images/VetTrack-logo.png';


function Patients () {
    return (
        <div className="Patients">
            <Navigation />
            <header className= "Patients-header">
                <h1>
                 Patients
                </h1>            
            </header>
        </div>
    );
}

export default Patients;