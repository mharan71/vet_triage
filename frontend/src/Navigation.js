import React from 'react';
import './Navigation.css';
import logo from './images/VetTrack-logo.png';


function Navigation () {
    return (
        <nav className='navigation'>
            <img src={logo} alt='Vet Track' className='navigationLogo' />
            <div className='navigationTabs'>
            <a href='triage' className='tabs'>Triage</a>
            <a href='patients' className='tabs'>Patient</a>
            </div>
        </nav> 
    )

}

export default Navigation;