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


// PatientBox component, with order, Patient Name, Visit Reason, and onSave function arguments

function PatientBoxTriage ({order, patientName, visitReason, onSave}) {

    const [editing, setEditing] = useState(false);
    const [editedPatientName, setEditedPatientName] = useState(patientName);
    const [editedVisitReason, setEditedVisitReason] = useState(visitReason);

    const handleChange = () => {
        setEditing(false);
        onSave(editedPatientName, editedVisitReason);
    };


    return (
        <div className ="PatientBoxTriage">
            {editing ? (
                <div>
                    <p>{order}. <input value={editedPatientName} onChange={(event) => setEditedPatientName(event.target.value)}/> <button onClick={handleChange}><strong>Save</strong></button></p>
                    <p>Reason for visit: <input value={editedVisitReason} onChange={(event) => setEditedVisitReason(event.target.value)}/></p>
                </div>
            ) : 
            (
                <div>
                    <p>{order}. <strong>{patientName}</strong><button onClick={() => setEditing(true)}><img src={pencil} alt='pencil' style= {{width: '15px', height: '15px' }} /></button></p> 
                    <p>Reason for visit: {visitReason}</p>
                </div>
            )}
        </div>
    );
}

export default PatientBoxTriage;
