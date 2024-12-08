import React from 'react';
import { useState } from 'react';
import '../CSS/PatientBoxTriage.css';
import {FaPencilAlt} from 'react-icons/fa';
import CountUpTimer from './CountUpTimer';

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

// Description: React Icons
// Source: react-icons
// https://react-icons.github.io/react-icons/search/#q=download


// PatientBoxTriage component, with order, Patient Name, Visit Reason, and onSave function arguments

function PatientBoxTriage ({order, patientName, species, visitReason, ETA, location, onSave, onDelete}) {

    // Enables toggling between view and edit, holds the edited PAtient name and visit reason values
    const [editing, setEditing] = useState(false);
    const [critical, setCritical] = useState(false);
    const [timer, setTimer] = useState(false);
    const [editedPatientName, setEditedPatientName] = useState(patientName);
    const [editedSpecies, setEditedSpecies] = useState(species);
    const [editedVisitReason, setEditedVisitReason] = useState(visitReason);
    const [editedETA, setEditedETA] = useState(ETA);
    const [editedLocation, setEditedLocation] = useState(location);
    const [hideETA, setHideETA] = useState(false);
    const [showLocation, setShowLocation] = useState(true);

    // Function that enables saved changes
    const handleChange = () => {
        setEditing(false);
        onSave(editedPatientName, editedSpecies, editedVisitReason, editedETA, editedLocation);
    };

    // Function that handles setting patient to critical
    const handleCritical = () => {
        setCritical(!critical);
        
    };

    // Function that handles timer state, hides/shows ETA, and hide/shows location of patient
    const handleTimer = () => {
        setTimer(!timer);
        setHideETA(!hideETA);
        setShowLocation(!showLocation);
    };

    return (
        
        <div className={`PatientBoxTriage ${critical ? 'critical' : ''}`}>
            <button onClick={handleCritical} className='button-critical'>
                {critical ? 'Unmark Patient Critical' : 'Mark Patient Critical'}
            </button>
            <button onClick={handleTimer} className="here-button">
                {timer ? 'Left Hospital': 'At Hospital'}
            </button>
            {timer && <CountUpTimer running={true}/>}
            <div className='delete-button-div'>
            <button onClick={onDelete} className="delete-button">
                Delete
            </button>
            </div>

            {/*} Editing mode that enables editing of patient details{*/}
            {editing ? (
                <div>
                    <button onClick={handleChange} className="save-edit-button">
                        <strong>Save</strong>
                    </button>
                    <div className='form-group'>
                        <label><strong>Place in Queue: </strong></label>
                        <label>{order}</label>
                    </div>
                    <div className='form-group'>
                        <label><strong>Patient Name: </strong></label>
                        <input type= 'text' value={editedPatientName} onChange={(event) => setEditedPatientName(event.target.value)}/>
                    </div>
                    <div className='form-group'>
                        <label><strong>Species: </strong></label>
                        <input type='text' value={editedSpecies} onChange={(event) => setEditedSpecies(event.target.value)}/>
                    </div>
                    <div className='form-group'>
                        <label><strong>Reason for Visit: </strong></label>
                        <textarea type='text' value={editedVisitReason} className='expanded-box' onChange={(event) => setEditedVisitReason(event.target.value)}/>
                    </div>
                    {!hideETA && (
                        <div className='form-group'>
                            <label><strong>ETA: </strong></label>
                            <input type='text' value={editedETA} onChange={(event) => setEditedETA(event.target.value)}/>
                        </div>
                    )}
                    {!showLocation && (
                        <div className='form-group'>
                            <label><strong>Location: </strong></label>
                            <input type='text' value={editedLocation} onChange={(event) => setEditedLocation(event.target.value)}/>
                        </div>
                    )}
                </div>
            ) : 
            (
                // Viewing mode that displays patient information, pencil icon displayed to enable editing.
                <div>
                    <button onClick={() => setEditing(true)} className="save-edit-button">
                        <FaPencilAlt className='edit-button-icon'/>
                    </button>
                    <div className='form-group'>
                        <strong>Place in Queue: </strong><span>{order}</span>
                    </div>
                    <div className='form-group'>
                        <strong>Patient Name: </strong><span>{patientName}</span>
                    </div>
                    <div className='form-group'>
                        <strong>Species: </strong><span>{species}</span>
                    </div>
                    <div className='form-group'>
                        <strong>Reason for Visit: </strong><span>{visitReason}</span>
                    </div>
                    {!hideETA && (
                        <div className='form-group'>
                            <strong>ETA: </strong><span>{editedETA}</span>
                        </div>
                    )}
                    {!showLocation && (
                        <div className='form-group'>
                            <strong>Location: </strong><span>{editedLocation}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}


export default PatientBoxTriage;
