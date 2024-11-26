import React from 'react';
import { useState } from 'react';
import {FaPencilAlt} from 'react-icons/fa';
import '../CSS/PatientBoxPatient.css';

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


// PatientBoxPatients component, with patient name, date of birth, species, breed, sex, regular veterinarian, allergies, history,
// medications, vaccinations, and onSave function arguments

function PatientBoxPatients ({patientName, DOB, species, breed, sex, regularVet, allergies, history, meds, vaccines, onSave}) {

    // Enables toggling between view and edit, holds the edited Patient values
    const [editing, setEditing] = useState(false);
    const [editedPatientName, setEditedPatientName] = useState(patientName);
    const [editedDOB, setEditedDOB] = useState(DOB);
    const [editedSpecies, setEditedSpecies] = useState(species);
    const [editedBreed, setEditedBreed] = useState(breed);
    const [editedSex, setEditedSex] = useState(sex);
    const [editedRegularVet, setEditedRegularVet] = useState(regularVet);
    const [editedAllergies, setEditedAllergies] = useState(allergies);
    const [editedHistory, setEditedHistory] = useState(history);
    const [editedMeds, setEditedMeds] = useState(meds);
    const [editedVaccines, setEditedVaccines] = useState(vaccines);


    const sexOptions = ["Male Neutered", "Male", "Female Spayed", "Female"]

    // Function that enables saved changes
    const handleChange = (event) => {
        event.preventDefault();
        setEditing(false);
        onSave(editedPatientName, editedDOB, editedSpecies, editedBreed, editedSex, 
            editedRegularVet, editedAllergies, editedHistory, editedMeds, editedVaccines);
    };


    return (
        <div className="PatientBoxPatients">
            <h2><strong>Patient Information</strong></h2>
            {/*} Editing mode that enables editing of patient details{*/}
            {editing ? (
                <div>
                    <button onClick={handleChange} className="save-edit-button">
                        <strong>Save</strong>
                    </button>
                    <div className='form-group'>
                        <label><strong>Name: </strong></label>
                        <input type='text' value={editedPatientName} onChange={(event) => setEditedPatientName(event.target.value)}/>
                    </div>
                    <div className= 'form-group'>
                        <label><strong>Species: </strong></label>
                        <input type='text' value={editedSpecies} onChange={(event) => setEditedSpecies(event.target.value)}/>
                    </div>
                    <div className= 'form-group'>
                        <label><strong>Regular DVM: </strong></label>
                        <input type='text' value={editedRegularVet} onChange={(event) => setEditedRegularVet(event.target.value)}/>
                    </div>
                    <div className= 'form-group'>
                        <label><strong>Allergies </strong></label>
                        <input type='text' value={editedAllergies} onChange={(event) => setEditedAllergies(event.target.value)}/>
                    </div>
                    <div className= 'form-group'>
                        <label><strong>Date of Birth: </strong></label>
                        <input type='text' value={editedDOB} onChange={(event) => setEditedDOB(event.target.value)}/>
                    </div>
                    <div className= 'form-group'>
                        <label><strong>Breed: </strong></label>
                        <input type='text' value={editedBreed} onChange={(event) => setEditedBreed(event.target.value)}/>
                    </div>
                    <div className= 'form-group'>
                        <label><strong>Sex: </strong></label>
                        <select value={editedSex} onChange={(event) => setEditedSex(event.target.value)}>
                            <option value="">Select Sex</option>
                            {sexOptions.map((sexOption, index) => (
                                <option key={index} value={sexOption}>
                                    {sexOption}
                                </option>
                        
                            )
                            )}
                        </select>
                    </div>
                    <div className= 'form-group'>
                        <label><strong>Medications: </strong></label>
                        <input type='text' value={editedMeds} onChange={(event) => setEditedMeds(event.target.value)}/>
                    </div>
                    <div className= 'form-group'>
                        <label><strong>Vaccinations: </strong></label>
                        <input type='text' value={editedVaccines} onChange={(event) => setEditedVaccines(event.target.value)}/>
                    </div>
                    <div className= 'form-group'>
                        <label><strong>Medical History: </strong></label>
                        <textarea type='text' value={editedHistory} className='expanded-box' onChange={(event) => setEditedHistory(event.target.value)}
                        rows = "5"
                        cols = "40"
                        />
                    </div>
                </div>
            ) :
            ( 
                // Viewing mode that displays patient information, pencil icon displayed to enable editing.
                <div className='view'>
                    <div className='details'>
                        <button onClick={() => setEditing(true)} className="save-edit-button">
                            <FaPencilAlt className='edit-button-icon'/>
                        </button>
                        <div className= 'form-group'>
                        <strong>Name: </strong><span>{patientName}</span>
                        </div>
                        <div className= 'form-group'>
                        <strong>Species: </strong><span>{species}</span> 
                        </div>
                        <div className= 'form-group'>
                        <strong>Regular DVM: </strong><span>{regularVet}</span>
                        </div>
                        <div className= 'form-group'>
                        <strong>Allergies: </strong><span>{allergies}</span> 
                        </div>
                        <div className= 'form-group'>
                        <strong>DOB: </strong><span>{DOB}</span>
                        </div>
                        <div className= 'form-group'>
                        <strong>Breed: </strong><span>{breed}</span>
                        </div>
                        <div className= 'form-group'>
                        <strong> Sex: </strong><span> {sex}</span>
                        </div>
                        <div className= 'form-group'>
                        <strong>Medications: </strong><span> {meds} </span>
                        </div>
                        <div className= 'form-group'>
                        <strong>Vaccinations: </strong><span> {vaccines}</span>
                        </div>
                        <div className= 'form-group'>
                        <strong>History: </strong><span> {history} </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


export default PatientBoxPatients;