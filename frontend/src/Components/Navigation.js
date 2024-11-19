import React from 'react';
import '../CSS/Navigation.css';
import { Link } from 'react-router-dom';
import icon from '../images/VetTrackLogo.png';

// Description: Total web developer bootcamp
// Source: The Web Developer Bootcamp 2024, Colt Steele
// Reference: https://www.udemy.com/course/the-web-developer-bootcamp/?couponCode=NVD20PMUS

// Navigation component, displays links to triage.js and patients.js pages

function Navigation () {
    return (
        <nav className='navigation'>
            <Link to= "/">
                <img src={icon} alt='Vet Track' className='navigationLogo' />
            </Link>
            <div className='navigationTabs'>
            <Link to="/" className='tabs'>Triage</Link>
            <Link to="/patients" className='tabs'>Patients</Link>
            </div>
        </nav> 
    )
}


export default Navigation;