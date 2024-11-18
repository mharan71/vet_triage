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

// Drag and Drop with react-beautiful-dnd
// Source: Drag and Drop with react-beautiful-dnd, Laith Academy
// Reference: https://www.youtube.com/watch?v=YJ5EMzyimfc

function Triage () {
    
    // Initialize patients; each comprising of ID, Name, and Reason for visit.

    const [patients, setPatients] = useState ([
        {id: 1, patientName: "Pickle", species: "Canine", visitReason: "Difficulty breathing for past 24 hours.", ETA: "10:00 AM"},
        {id: 2, patientName: "Mr. Ruffman", species: "Canine", visitReason: "Laceration to right paw pad.", ETA: "10:20 AM"},
        {id: 3, patientName: "Tippy", species: "Feline", visitReason: "Non weight bearing on hind end.", ETA: "10:30 AM"},
        {id: 4, patientName: "Panda", species: "Canine", visitReason: "Consistent itching resulting in abrasions.", ETA: "10:50 AM"},
        {id: 5, patientName: "Bandit", species: "Feline", visitReason: "Ran out of diabetes medication.", ETA: "11:15 AM"},
        {id: 6, patientName: "Rocky", species: "Feline", visitReason: "Ingested a large quantity of salmon.", ETA: "11:45 AM"},

    ])

    // This function handles saving of edited patient name and reason for visit

    const handleSave = (id, newPatientName, newSpecies, newVisitReason, newETA) => {

        // Using map to iterate over patients, locating patient by specified ID
        setPatients(patients.map(patient =>
            patient.id === id
            ? {...patient, patientName: newPatientName, species: newSpecies, visitReason: newVisitReason, ETA: newETA}
            : patient
        ) 
        );
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

    }

    return (
        <div className="Triage">
            <Navigation />
            <header className= "Triage-header">
                 <strong>Triage</strong>  
            </header>
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
                            <Draggable key = {patient.id} draggableId={String(patient.id)} index = {index}>
                                {(provided) => (
                                    <div ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                  
                                        <PatientBoxTriage
                                        key={patient.id}
                                        patientName={patient.patientName}
                                        species={patient.species}
                                        visitReason={patient.visitReason}
                                        ETA={patient.ETA}
                                        order = {index + 1}
                                        onSave={(newPatientName, newSpecies, newVisitReason, newETA) => handleSave(patient.id, newPatientName, newSpecies, newVisitReason, newETA)}
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