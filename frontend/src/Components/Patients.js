import React from 'react';
import { useState } from 'react';
import '../CSS/App.css';
import Navigation from './Navigation';
import OwnerBox from './OwnerBox';
import PatientBoxPatients from './PatientBoxPatients';
import PatientImageBox from "./PatientImageBox";

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

function Patients () {

    // Initialize owner with owner ID, name, phone, address, and email values
    const [owners, setOwner] = useState ([
        {OID: 23423, ownerName: "Erica Morris", altContact: "Sam Morris", phone: "253-222-2222", altPhone: "253-222-1111",
            address: "1111 Stevens Pass, Orting, WA 98360", email: "e@oregonstate.edu", altEmail: "z@oregonstate.edu"}
    ])

     // This function handles saving of edited owner values
    const handleSaveOwner = (OID, newOwnerName, newAltContact, newPhone, newAltPhone, newAddress, newEmail, newAltEmail) => {

        // Using map to iterate over owners, locating patient by specified ID
        setOwner(owners.map(owner =>
            owner.OID === OID
            ? {...owner, ownerName: newOwnerName, altContact: newAltContact, 
                phone: newPhone, altPhone: newAltPhone, address: newAddress, email: newEmail,
            altEmail: newAltEmail}
            : owner
        )
        );
    };
 

    // Initialize patient with patient ID, name, date of birth, species, sex, breed, regular veterinarian, history, meds, and vaccinations
    const [patients, setPatient] = useState ([
        {PID: 12545, patientName: "Pickle", DOB: "12/12/19", species: "Canine",sex: "Female", breed: "Husky", regularVet: "Dr. Phillips - Portland, OR", allergies: "No known Allergies",
            history: "Patient has no known history of dyspnea.  Owner states patient had run a few miles with her in elevated temperatures prior to bringing patient in for visit.",
            meds: "No current medications.", VX: "Rabies: 10/08/24", imageURL: null}
    ])

    // This function handles saving of edited patient values
    const handleSavePatient = (PID, alteredFields) => {

        // Using map to iterate over patients, locating patient by specified ID
        setPatient(patients.map(patient =>
            patient.PID === PID
            ? {...patient, ...alteredFields}
            : patient
        ) 
        );
    };

    return (
        <div className="Patients">
            <Navigation />
            {/* <header className="Owner-header">
                    <strong>Owner</strong>
            </header> */}
             {/* Description: Using map method to create list of patients in numbered order.
            Source: Rendering List document on React.dev
            Reference: https://react.dev/learn/rendering-lists, https://legacy.reactjs.org/docs/lists-and-keys.html */}
        <div className='patient-owner-container'>
            
            {patients.map((patient) =>
                    <PatientImageBox
                    key={patient.PID}
                    imageURL={patient.imageURL}
                    patientName={patient.patientName}
                    onImageSave={(newImageURL) => 
                        handleSavePatient(patient.PID, {imageURL: newImageURL})}
                    />
                )
                }
         

            {/* Iterating over owners, creating OwnerBox component for each */}
            
            {owners.map((owner) =>
                <OwnerBox
                key={owner.OID}
                ownerName={owner.ownerName}
                altContact={owner.altContact}
                phone={owner.phone}
                altPhone={owner.altPhone}
                address={owner.address}
                email={owner.email}
                altEmail={owner.altEmail}
                onSave={(newOwnerName, newAltContact, newPhone, newAltPhone, newAddress, newEmail, newAltEmail) => 
                    handleSaveOwner(owner.OID, newOwnerName, newAltContact, newPhone, newAltPhone, newAddress, newEmail, newAltEmail)}
                />
            )
            }
        </div>

            {/* <header className= "Patient-header">
                 <strong>Patient</strong>  
            </header> */}

            {/* Iterating over patients, creating PatientBoxPatients component for each */}
            <div className='patient'>
                {patients.map((patient) =>
                    <PatientBoxPatients
                    key={patient.PID}
                    patientName={patient.patientName}
                    DOB={patient.DOB}
                    species = {patient.species}
                    breed= {patient.breed}
                    sex= {patient.sex}
                    regularVet= {patient.regularVet}
                    allergies= {patient.allergies}
                    history = {patient.history}
                    meds = {patient.meds}
                    VX = {patient.VX}
                    onSave={(newPatientName, newDOB, newSpecies, newBreed, newSex, newRegularVet, newAllergies, newHistory, newMeds, newVX) => 
                        handleSavePatient(patient.PID, {patientName: newPatientName, DOB: newDOB, species: newSpecies, breed: newBreed, sex: newSex, 
                            regularvet: newRegularVet, allergies: newAllergies, history: newHistory, meds: newMeds, VX: newVX})}     
                    />
                )
                }
            </div>
        </div>

    );
}


export default Patients;