import React from 'react';
import { useState, useEffect } from 'react';
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

// Drag and Drop with react-beautiful-dnd
// Source: Drag and Drop with react-beautiful-dnd, Laith Academy
// Reference: https://www.youtube.com/watch?v=YJ5EMzyimfc

function Triage () {
    
    // Initialize patients; each comprising of ID, Name, and Reason for visit.

    const [patients, setPatients] = useState ([])
    //     {patientID: 1, patientName: "Pickle", species: "Canine", visitReason: "Difficulty breathing for past 24 hours.", ETA: "10:00 AM", location: "Lobby"},
    //     {patientID: 2, patientName: "Mr. Ruffman", species: "Canine", visitReason: "Laceration to right paw pad.", ETA: "10:20 AM"},
    //     {patientID: 3, patientName: "Tippy", species: "Feline", visitReason: "Non weight bearing on hind end.", ETA: "10:30 AM"},
    //     {patientID: 4, patientName: "Panda", species: "Canine", visitReason: "Consistent itching resulting in abrasions.", ETA: "10:50 AM"},
    //     {patientID: 5, patientName: "Bandit", species: "Feline", visitReason: "Ran out of diabetes medication.", ETA: "11:15 AM"},
    //     {patientID: 6, patientName: "Rocky", species: "Feline", visitReason: "Ingested a large quantity of salmon.", ETA: "11:45 AM"},

    // ])
    const [formData, setFormData] = useState ({
        patientName: '',
        species: '',
        visitReason: '',
        ETA: '',
        location: '',
      });
    
    const [showForm, setShowForm] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        fetch('https://vet-triage-backend.onrender.com/triage')
        .then(response => response.json())
        .then(data => {setPatients(data);})
        .catch(error => console.error('Error fetching triage data:', error));

    }, []);
       
    const checkEmpty = () => {
        for (const field in formData) {
          if (formData[field] === '') {
            alert('One or more of your fields are still empty. Please fill it out.')
            return false
          }
        }
        return true
      }
    
    // This function handles saving of edited patient name and reason for visit


    const handleAddPatient = async (event) => {
        event.preventDefault();
        if (!checkEmpty()) {
            return
        }

        try { const response = await fetch('https://vet-triage-backend.onrender.com/triage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            const result = await response.json();
            console.log('Triage patient added successfully:', result.patient);
        
        const updatedTriagePatients = await fetch('https://vet-triage-backend.onrender.com/triage')
            .then(resp => resp.json());
        setPatients(updatedTriagePatients);

        setFormData({
            patientName: '',
            species: '',
            visitReason: '',
            ETA: '',
            location: '',
        });
        setShowForm(false);
        } else {
            console.error('Failled to add triage patient');
        }
        } catch (error) {
            console.error('Could not add triage patient', error);
        }
    };

 
    const handleSave = async (triageID, newPatientName, newSpecies, newVisitReason, newETA, newLocation) => {

        // Using map to iterate over patients, locating patient by specified ID
        setPatients(patients.map(patient =>
            patient.triageID === triageID
            ? {...patient, patientName: newPatientName, species: newSpecies, visitReason: newVisitReason, ETA: newETA, location: newLocation}
            : patient
        ));

        try { const response = await fetch(`https://vet-triage-backend.onrender.com/triage/${triageID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({patientName: newPatientName, species: newSpecies, visitReason: newVisitReason, ETA: newETA, location: newLocation})
        });
        if (!response.ok) {
            console.error('Unable to update triage patient')
        } else {
            console.log('Triage patient updated successfully');
        }
        } catch (error) {
            console.error('Could not update triage patient', error);
        }
    };
        

// Description: Splicing Arrays
// Source: Array.prototype.splice(), Mozilla Developers
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

    const handleDrag = (res) => {

        if (!res.destination) return;
        const modPatients = Array.from(patients);
        const [changedPatient] = modPatients.splice(res.source.index, 1);
        modPatients.splice(res.destination.index, 0, changedPatient);
        setPatients(modPatients);

    };

    const handleDeletePatient = async (triageID) => {
        try {
            const response = await fetch(`https://vet-triage-backend.onrender.com/triage/${triageID}`, {
                method: 'DELETE', 
            });
            if (response.ok) {
                console.log('Patient deleted successfully');
                setPatients(patients.filter(patient => patient.triageID !== triageID));
            } else {
                console.error('Unable to delete triage patient');
            }
        } catch (error) {
            console.error('Error deleting triage patient:', error);
          }
        };
    
    return (
        <div className="Triage">
            <Navigation />
            <header className= "Triage-header">
                 <strong>Triage</strong>  
            </header>
            <button onClick={() => setShowForm(!showForm)} className="show-form-button">
                {showForm ? "Cancel" : "Add Patient"}
            </button>
            {showForm && (
            <form onSubmit={handleAddPatient} className="triage-form">
                <div className='form-group'>
                    <label><strong>Patient Name:</strong></label>
                    <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} required/>
                </div>
                <div className='form-group'>
                    <label><strong>Species:</strong></label>
                    <input type="text" name="species" value={formData.species} onChange={handleChange} required/>
                </div>
                <div className='form-group'>
                    <label><strong>Visit Reason:</strong></label>
                    <input type="text" name="visitReason" value={formData.visitReason} onChange={handleChange} required/>
                </div>
                <div className='form-group'>
                    <label><strong>ETA:</strong></label>
                    <input type="text" name="ETA" value={formData.ETA} onChange={handleChange}/>
                </div>
                <div className='form-group'>
                    <label><strong>Location:</strong></label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange}/>
                </div>
            <div className='add-patient-container'>
                <button className='add-patient-button' type="submit"><strong>Add Patient</strong></button>
            </div>
            </form>
            )}
            <DragDropContext onDragEnd={handleDrag}>
                <Droppable droppableId="patient">
                    {(provided) => (
                        <div className="queue" {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {/* Description: Using map method to create list of patients in numbered order.
                         Source: Rendering List document on React.dev
                        Reference: https://react.dev/learn/rendering-lists, https://legacy.reactjs.org/docs/lists-and-keys.html */}

                        {/* Iterating over patient list, creating PatientBoxTriage component for each */}
                        {patients.map((patient, index) => (
                            <Draggable key = {patient.triageID} draggableId={String(patient.triageID)} index = {index}>
                                {(provided) => (
                                    <div ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                  
                                        <PatientBoxTriage
                                        key={patient.triageID}
                                        patientName={patient.patientName}
                                        species={patient.species}
                                        visitReason={patient.visitReason}
                                        ETA={patient.ETA}
                                        location={patient.location}
                                        order = {index + 1}
                                        onSave={(newPatientName, newSpecies, newVisitReason, newETA, newLocation) => 
                                            handleSave(patient.triageID, newPatientName, newSpecies, newVisitReason, newETA, newLocation)}
                                            onDelete={()=> handleDeletePatient(patient.triageID)}
                                        />
                                        </div>
                                    )
                                    }
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default Triage;