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


// PatientBoxPatients component, with patient name, date of birth, species, breed, sex, regular veterinarian, allergies, history,
// medications, vaccinations, and onSave function arguments

function PatientBoxPatients ({patientName, DOB, species, breed, sex, regularVet, allergies, history, meds, VX, onSave}) {

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
    const [editedVX, setEditedVX] = useState(VX);

    // Function that enables saved changes
    const handleChange = () => {
        setEditing(false);
        onSave(editedPatientName, editedDOB, editedSpecies, editedBreed, editedSex, editedRegularVet, editedAllergies, editedHistory, editedMeds, editedVX);
    };


    return (
        <div className="PatientBoxPatients">
            {/*} Editing mode that enables editing of patient details{*/}
            {editing ? (
                <div>
                    <p><strong>Patient: </strong>{patientName} <input value ={editedPatientName} onChange={(event) => setEditedPatientName(event.target.value)}/>
                    <button onClick={handleChange}><strong>Save</strong></button>
                    <strong>Species: </strong>{species} <input value ={editedSpecies} onChange={(event) => setEditedSpecies(event.target.value)}/>
                    <strong>Regular DVM: </strong>{regularVet} <input value ={editedRegularVet} onChange={(event) => setEditedRegularVet(event.target.value)}/>
                    <strong>Allergies: </strong>{allergies} <input value ={editedAllergies} onChange={(event) => setEditedAllergies(event.target.value)}/>
                    <button onClick={handleChange}><strong>Save</strong></button>
                    </p>
                    <p><strong>DOB: </strong>{DOB} <input value ={editedDOB} onChange={(event) => setEditedDOB(event.target.value)}/>
                    <strong>Breed: </strong>{breed} <input value ={editedBreed} onChange={(event) => setEditedBreed(event.target.value)}/>
                    <strong>Sex: </strong>{sex} <input value ={editedSex} onChange={(event) => setEditedSex(event.target.value)}/>
                    </p>
                    <p><strong>Medical History: </strong>{history} <input value ={editedHistory} onChange={(event) => setEditedHistory(event.target.value)}/>
                    <strong>Medications: </strong>{meds} <input value ={editedMeds} onChange={(event) => setEditedMeds(event.target.value)}/>
                    <strong>Vaccinations: </strong>{VX} <input value ={editedVX} onChange={(event) => setEditedVX(event.target.value)}/>
                    </p>
                </div>
            ) :
            ( 
                // Viewing mode that displays patient information, pencil icon displayed to enable editing.
                <div>
                    <p><strong>Patient: </strong>{patientName}
                    <strong>Species: </strong> {species}
                    <strong>Regular DVM: </strong> {regularVet}
                    <strong>Allergies: </strong> {allergies} 
                    <button onClick={() => setEditing(true)}><img src={pencil} alt='pencil' style= {{width: '15px', height: '15px' }} /></button>
                    </p>
                    <p><strong>DOB: </strong>{DOB} <strong>Breed: </strong> {breed} <strong> Sex: </strong> {sex}</p>
                    <p><strong>History: </strong> {history} <strong>Medications: </strong> {meds} <strong>Vaccinations: </strong> {VX}</p>
                </div>
            )}
        </div>
    );
}


export default PatientBoxPatients;