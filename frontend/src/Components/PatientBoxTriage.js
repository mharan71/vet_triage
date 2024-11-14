import React from 'react';
import { useState } from 'react';
import '../CSS/PatientBoxTriage.css';
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
                    <button onClick={handleChange} className="save-button">
                        <strong>Save</strong>
                    </button>
                    <div className='form-group'>
                        <label><strong>Place in Queue: </strong></label>
                        <label>{order}.</label>
                    </div>
                    <div className='form-group'>
                        <label><strong>Patient Name: </strong></label>
                        <input type= 'text' value={editedPatientName} onChange={(event) => setEditedPatientName(event.target.value)}/>
                    </div>
                    <div className='form-group'>
                        <label><strong>Reason for Visit: </strong></label>
                        <input type='text' value={editedVisitReason} onChange={(event) => setEditedVisitReason(event.target.value)}/>
                    </div>
                </div>
            ) : 
            (
                // Viewing mode that displays patient information, pencil icon displayed to enable editing.
                <div>
                    <button onClick={() => setEditing(true)} className="edit-button">
                        <img src={pencil} alt='edit'/>
                    </button>
                    <div className='form-group'>
                        <strong>Place in Queue: </strong><span>{order}</span>
                    </div>
                    <div className='form-group'>
                        <strong>Patient Name: </strong><span>{patientName}</span>
                    </div>
                    <div className='form-group'>
                        <strong>Reason for Visit: </strong><span>{visitReason}</span>
                    </div>
                </div>
            )}
        </div>
    );
}


export default PatientBoxTriage;
