import React from 'react';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../CSS/App.css';
import Navigation from './Navigation';
import PatientBoxTriage from './PatientBoxTriage';

// Description: Managing state using React
// Source: Managing State document on React.dev
// Reference: https://react.dev/learn/managing-state

// Description: Handling State in React
// Source: React Forms: How To Handle State With A Single Change Handler?, Tapas Adhikary
// Reference: https://www.youtube.com/watch?v=nYazniAxwi8

// Description: Using forms in React
// Source: <forms> document on React.dev
// Reference: https://react.dev/reference/react-dom/components/form#noun-labs-1201738-(2)

// Description: Total web developer bootcamp
// Source: The Web Developer Bootcamp 2024, Colt Steele
// Reference: https://www.udemy.com/course/the-web-developer-bootcamp/?couponCode=NVD20PMUS


function Triage () {
    
    // Initialize patients; each comprising of ID, Name, and Reason for visit.

    const [patients, setPatients] = useState ([
        {id: 1, patientName: "Pickle", visitReason: "Difficulty breathing for past 24 hours."},
        {id: 2, patientName: "Mr. Ruffman", visitReason: "Laceration to right paw pad."},
        {id: 3, patientName: "Tippy", visitReason: "Non weight bearing on hind end."}
    ])

    // This function handles saving of edited patient name and reason for visit

    const handleSave = (id, newPatientName, newVisitReason) => {

        // Using map to iterate over patients, locating patient by specified ID
        setPatients(patients.map(patient =>
            patient.id === id
            ? {...patient, patientName: newPatientName, visitReason: newVisitReason}
            : patient
        ) 
        );
    };

    return (
        <div className="Triage">
            <Navigation />
            <header className= "Triage-header">
                <h1>
                 <strong>Triage</strong>
                </h1>            
            </header>
            {/* Description: Using map method to create list of patients in numbered order.
            Source: Rendering List document on React.dev
            Reference: https://react.dev/learn/rendering-lists, https://legacy.reactjs.org/docs/lists-and-keys.html */}

            {/* Iterating over patient list, creating PatientBoxTriage component for each */}
            <div className='queue'>
                {patients.map((patient, index) =>
                    <PatientBoxTriage
                    key={patient.id}
                    patientName={patient.patientName}
                    visitReason={patient.visitReason}
                    order = {index + 1}
                    onSave={(newPatientName, newVisitReason) => handleSave(patient.id, newPatientName, newVisitReason)}
                    />
                )
                }
            </div>
        </div>
    );
}

export default Triage;