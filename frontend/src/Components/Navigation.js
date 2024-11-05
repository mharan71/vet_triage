import React from 'react';
import '../CSS/Navigation.css';
import { Link } from 'react-router-dom';
import logo from '../images/VetTrack-logo.png';


function Navigation () {
    return (
        <nav className='navigation'>
            <img src={logo} alt='Vet Track' className='navigationLogo' />
            <div className='navigationTabs'>
            <Link to="/" className='tabs'>Triage</Link>
            <Link to="/patients" className='tabs'>Patients</Link>
            </div>
        </nav> 
    )

}

export default Navigation;