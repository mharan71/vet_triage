import React from 'react';
import { useState } from 'react';
import '../CSS/App.css';
import Navigation from './Navigation';
import PatientBoxTriage from './PatientBoxPatients';
import OwnerBox from './OwnerBox';

// Description: Managing state using React
// Source: Managing State document on React.dev
// Reference: https://react.dev/learn/managing-state

// Description: Handling State in React
// Source: React Forms: How To Handle State With A Single Change Handler?, Tapas Adhikary
// Reference: https://www.youtube.com/watch?v=nYazniAxwi8

// Description: Using forms in React
// Source: <forms> document on React.dev
// Reference: https://react.dev/reference/react-dom/components/form#noun-labs-1201738-(2)

function Patients () {

    const [patients, setPatients] = useState ([
        {id: 1, patientName: "Pickle", visitReason: "Difficulty breathing for past 24 hours."},
        {id: 2, patientName: "Mr. Ruffman", visitReason: "Laceration to right paw pad."},
        {id: 3, patientName: "Tippy", visitReason: "Non weight bearing on hind end."}
    ])


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
