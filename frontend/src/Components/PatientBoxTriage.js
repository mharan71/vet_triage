import React from 'react';
import { useState } from 'react';
import '../CSS/App.css';
import pencil from '../images/pencil.png';

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


// PatientBoxTriage component, with order, Patient Name, Visit Reason, and onSave function arguments

function PatientBoxTriage ({order, patientName, visitReason, onSave}) {

    // Enables toggling between view and edit, holds the edited PAtient name and visit reason values
    const [editing, setEditing] = useState(false);
    const [editedPatientName, setEditedPatientName] = useState(patientName);
    const [editedVisitReason, setEditedVisitReason] = useState(visitReason);

    // Function that enables saved changes
    const handleChange = () => {
        setEditing(false);
        onSave(editedPatientName, editedVisitReason);
    };


    return (
        <div className ="PatientBoxTriage">
            {/*} Editing mode that enables editing of patient details{*/}
            {editing ? (
                <div>
                    <p>{order}. <input value={editedPatientName} onChange={(event) => setEditedPatientName(event.target.value)}/> <button onClick={handleChange}><strong>Save</strong></button></p>
                    <p>Reason for visit: <input value={editedVisitReason} onChange={(event) => setEditedVisitReason(event.target.value)}/></p>
                </div>
            ) : 
            (
                // Viewing mode that displays patient information, pencil icon displayed to enable editing.
                <div>
                    <p>{order}. <strong>{patientName}</strong><button onClick={() => setEditing(true)}><img src={pencil} alt='pencil' style= {{width: '15px', height: '15px' }} /></button></p> 
                    <p>Reason for visit: {visitReason}</p>
                </div>
            )}
        </div>
    );
}

export default PatientBoxTriage;
