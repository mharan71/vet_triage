import React from 'react';
import { useState, useEffect } from 'react';
import '../CSS/App.css';
import Navigation from './Navigation';
import OwnerBox from './OwnerBox';
import PatientBoxPatients from './PatientBoxPatients';
import PatientImageBox from "./PatientImageBox";
import Footer from './FooterComp';

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

  // State to manage patient, ID of chosen patient, toggle visibility, add message
  const [chosenPatient, setChosenPatient] = useState(null);
  const [patientID, setPatientID] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [addMessage, setAddMessage] = useState("");

  // State to manage patient data
  const [patientData, setPatientData] = useState ({
    patientName: '',
    DOB: '',
    species: '',
    sex: '',
    breed: '',
    regularVet: '',
    allergies: '',
    history: '',
    meds: '',
    vaccines: '',
    visitReason: '',
    ETA: '',
    location: '',
    imageURL: '',
  });

  // State to manage client data
  const [clientData, setClientData] = useState({
    ownerName: '',
    phone: '',
    altPhone:  '',
    address: '',
    email:  '',
    altEmail: '',
    altContact: '',
  });

  // Handles changes in patient fields
  const handlePatientChange = (event) => {
    const { name, value } = event.target;
    setPatientData({ ...patientData, [name]: value });
  };

  // Handles changes in client fields
  const handleClientChange = (event) => {
    const { name, value } = event.target;
    setClientData({ ...clientData, [name]: value });
  };

  // const checkEmptyPatient = () => {
  //   for (const field in patientData) {
  //     if (patientData[field].trim() === '') {
  //       alert('One or more of your fields are still empty. Please fill it out.')
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  // const checkEmptyClient = () => {
  //   for (const field in clientData) {
  //     if (clientData[field].trim() === '') {
  //       alert('One or more of your fields are still empty. Please fill it out.')
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  // Fetches data from backend from associated patient ID
  useEffect(() => {
    fetch(`https://vet-triage-backend.onrender.com/patients/${patientID}`)
    .then(response => {
      if (!response.ok) {
        return null;
      }
      return response.json();})
    .then(data => {setChosenPatient(data);})
    .catch(error => console.error('Error fetching patient data:', error));
  }, [patientID]);


  // Handles adding patient and client
  const handleAddPatientClient = async (event) => {
    event.preventDefault();
    // if (!checkEmptyPatient()) {
    //   return;
    // }
    // if (!checkEmptyClient()) {
    //   return;
    // }
    try {const response = await fetch('https://vet-triage-backend.onrender.com/patient-with-client', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({...clientData, ...patientData})
      });
    if (response.ok) {
      const result = await response.json();
      console.log('Patient and Client added successfully:', result.patient);
      setAddMessage("Patient and Client successfully added!");
      setTimeout(() => setAddMessage(""), 4000);

      // Updates chosen patient, resets form
      setChosenPatient(result.patient);
      setShowForm(false);

      setClientData({
        ownerName: '',
        phone: '',
        altPhone:  '',
        address: '',
        email:  '',
        altEmail: '',
        altContact: '',
      });

      setPatientData({ 
        patientName: '',
        DOB: '',
        species: '',
        sex: '',
        breed: '',
        regularVet: '',
        allergies: '',
        history: '',
        meds: '',
        vaccines: '',
        visitReason: '',
        ETA: '',
        location: '',
        imageURL: '',
      });
      setPatientID(result.patient.patientID);
    } else {
      console.error("Unable to add client and patient");
    }
    } catch (error) {
      console.error('Could not add client and patient:', error);
    }
  };

  // Interface when no specific patient/client is selected

  if (!chosenPatient) {
    return (
        <div className="Patients">
          <Navigation/>
          {addMessage && <div className='add-message'>{addMessage}</div>}
          <button onClick={() => setShowForm(!showForm)} className="show-form-button">
                  {showForm ? "Cancel" : "Add Patient and Client"}
          </button>
          {showForm && (
            <form onSubmit={handleAddPatientClient} className="add-patient-form">
              <h2><strong>Add New Client</strong></h2>
              <div className='form-group'>
                <label><strong>Client Name</strong></label>
                <input type="text" name="ownerName" placeholder='Client Name' value = {clientData.ownerName} onChange={handleClientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Aternate Client</strong></label>
                <input type="text" name="altContact" placeholder='Alternate Client Name' value = {clientData.altContact} onChange={handleClientChange} />
              </div>
              <div className='form-group'>
                <label><strong>Phone Number</strong></label>
                <input type="text" name="phone" placeholder='Phone Number' value = {clientData.phone} onChange={handleClientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Alternate Phone Number</strong></label>
                <input type="text" name="altPhone" placeholder='Alternate Phone Number' value = {clientData.altPhone} onChange={handleClientChange} />
              </div>
              <div className='form-group'>
                <label><strong>Home Address</strong></label>
                <input type="text" name="address" placeholder='Home Address' value = {clientData.address} onChange={handleClientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Email</strong></label>
                <input type="text" name="email" placeholder='Email' value = {clientData.email} onChange={handleClientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Alternate Email</strong></label>
                <input type="text" name="altEmail" placeholder='Alternate Email' value = {clientData.altEmail} onChange={handleClientChange} />
              </div>
              <h2><strong>Add New Patient</strong></h2>
              <div className='form-group'>
                <label><strong>Patient Name</strong></label>
                <input type="text" name="patientName" placeholder='Patient Name' value = {patientData.patientName} onChange={handlePatientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Date of Birth</strong></label>
                <input type="text" name="DOB" placeholder='Date of Birth' value = {patientData.DOB} onChange={handlePatientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Species</strong></label>
                <input type="text" name="species" placeholder='Species' value = {patientData.species} onChange={handlePatientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Sex</strong></label>
                <input type="text" name="sex" placeholder='Sex' value = {patientData.sex} onChange={handlePatientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Breed</strong></label>
                <input type="text" name="breed" placeholder='Breed' value = {patientData.breed} onChange={handlePatientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Regular Veterinarian</strong></label>
                <input type="text" name="regularVet" placeholder='Regular Veterinarian' value = {patientData.regularVet} onChange={handlePatientChange} />
              </div>
              <div className='form-group'>
                <label><strong>Allergies</strong></label>
                <input type="text" name="allergies" placeholder='Allergies' value = {patientData.allergies} onChange={handlePatientChange} />
              </div>
              <div className='form-group'>
                <label><strong>Medical History</strong></label>
                <textarea type="text" name="history" placeholder='Medical History' className='expanded-box' value = {patientData.history} onChange={handlePatientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Medications</strong></label>
                <input type="text" name="meds" placeholder='Medications' value = {patientData.meds} onChange={handlePatientChange} />
              </div>
              <div className='form-group'>
                <label><strong>Vaccinations</strong></label>
                <input type="text" name="vaccines" placeholder='Vaccinations' value = {patientData.vaccines} onChange={handlePatientChange} />
              </div>
              <div className='form-group'>
            	<label><strong>Image</strong></label>
                <input type="text" name="imageURL" placeholder='Image' value = {patientData.imageURL} onChange={handlePatientChange} />
              </div>
              <button type="submit" className='add-patient-client-button'>Add Patient and Client</button>
            </form>
          )}
        {!chosenPatient && !showForm && (<div className='no-patient-selected'><strong>No patient selected.</strong></div>)}
        <Footer/>
        </div>
    );
    }
    
  // Destructure of chosen patient properties for rendering
  const {patientName, DOB, species, breed, sex, regularVet, allergies, history, meds, vaccines, imageURL,
        ownerName, phone, altPhone, address, email, altEmail, altContact} = chosenPatient;
  
  // Renders patient and client details for updating
  return (
    <div className="Patients">
      <Navigation />
      {addMessage && <div className='add-message'>{addMessage}</div>}
      <button onClick={() => setShowForm(!showForm)} className="show-form-button">
              {showForm ? "Cancel" : "Add Patient and Client"}
      </button>
      {showForm && (
            <form onSubmit={handleAddPatientClient} className="add-patient-form">
              <h2><strong>Add New Client</strong></h2>
              <div className='form-group'>
                <label><strong>Client Name</strong></label>
                <input type="text" name="ownerName" placeholder='Client Name' value = {clientData.ownerName} onChange={handleClientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Aternate Client</strong></label>
                <input type="text" name="altContact" placeholder='Alternate Client Name' value = {clientData.altContact} onChange={handleClientChange} />
              </div>
              <div className='form-group'>
                <label><strong>Phone Number</strong></label>
                <input type="text" name="phone" placeholder='Phone Number' value = {clientData.phone} onChange={handleClientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Alternate Phone Number</strong></label>
                <input type="text" name="altPhone" placeholder='Alternate Phone Number' value = {clientData.altPhone} onChange={handleClientChange} />
              </div>
              <div className='form-group'>
                <label><strong>Home Address</strong></label>
                <input type="text" name="address" placeholder='Home Address' value = {clientData.address} onChange={handleClientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Email</strong></label>
                <input type="text" name="email" placeholder='Email' value = {clientData.email} onChange={handleClientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Alternate Email</strong></label>
                <input type="text" name="altEmail" placeholder='Alternate Email' value = {clientData.altEmail} onChange={handleClientChange} />
              </div>
              <h2><strong>Add New Patient</strong></h2>
              <div className='form-group'>
                <label><strong>Patient Name</strong></label>
                <input type="text" name="patientName" placeholder='Patient Name' value = {patientData.patientName} onChange={handlePatientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Date of Birth</strong></label>
                <input type="text" name="DOB" placeholder='Date of Birth' value = {patientData.DOB} onChange={handlePatientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Species</strong></label>
                <input type="text" name="species" placeholder='Species' value = {patientData.species} onChange={handlePatientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Sex</strong></label>
                <input type="text" name="sex" placeholder='Sex' value = {patientData.sex} onChange={handlePatientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Breed</strong></label>
                <input type="text" name="breed" placeholder='Breed' value = {patientData.breed} onChange={handlePatientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Regular Veterinarian</strong></label>
                <input type="text" name="regularVet" placeholder='Regular Veterinarian' value = {patientData.regularVet} onChange={handlePatientChange} />
              </div>
              <div className='form-group'>
                <label><strong>Allergies</strong></label>
                <input type="text" name="allergies" placeholder='Allergies' value = {patientData.allergies} onChange={handlePatientChange} />
              </div>
              <div className='form-group'>
                <label><strong>Medical History</strong></label>
                <textarea type="text" name="history" placeholder='Medical History' value = {patientData.history} onChange={handlePatientChange} required/>
              </div>
              <div className='form-group'>
                <label><strong>Medications</strong></label>
                <input type="text" name="meds" placeholder='Medications' value = {patientData.meds} onChange={handlePatientChange} />
              </div>
              <div className='form-group'>
                <label><strong>Vaccinations</strong></label>
                <input type="text" name="vaccines" placeholder='Vaccinations' value = {patientData.vaccines} onChange={handlePatientChange} />
              </div>
              <div className='form-group'>
                <label><strong>Image</strong></label>
                <input type="text" name="imageURL" placeholder='Image' value = {patientData.imageURL} onChange={handlePatientChange} />
              </div>
              <button type="submit" className='add-patient-client-button'>Add Patient and Client</button>
            </form>
          )}
      {/*Patient image box component */}
      <div className='patient-owner-container'>
        <PatientImageBox
        key={chosenPatient.patientID}
        imageURL={imageURL}
        patientName={patientName}
        onImageSave={(newImageURL) => {
            setChosenPatient({...chosenPatient, imageURL: newImageURL});
        }}
        />
        {/*Owner box component */}
        <OwnerBox
          key={chosenPatient.clientID}
          ownerName={ownerName}
          altContact={altContact}
          phone={phone}
          altPhone={altPhone}
          address={address}
          email={email}
          altEmail={altEmail}
          onSave={(newOwnerName, newAltContact, newPhone, newAltPhone, newAddress, newEmail, newAltEmail) => {
            const updatedClient = {...chosenPatient, ownerName: newOwnerName, altContact: newAltContact, 
                                  phone: newPhone, altPhone: newAltPhone, address: newAddress, email: newEmail, altEmail: newAltEmail};
            setChosenPatient(updatedClient);
          }}
        />
      </div>
      <div className='patient'>
        {/*Patient box patients component */}
        <PatientBoxPatients
        key={chosenPatient.patientID}
        patientName={patientName}
        DOB={DOB}
        species = {species}
        breed= {breed}
        sex= {sex}
        regularVet= {regularVet}
        allergies= {allergies}
        history = {history}
        meds = {meds}
        vaccines = {vaccines}
        onSave={(newPatientName, newDOB, newSpecies, newBreed, newSex, newRegularVet, newAllergies, newHistory, newMeds, newvaccines) => {
          const updatedPatient = {...chosenPatient, patientName: newPatientName, DOB: newDOB, species: newSpecies, breed: newBreed, sex: newSex, 
                regularVet: newRegularVet, allergies: newAllergies, history: newHistory, meds: newMeds, vaccines: newvaccines}; 
          setChosenPatient(updatedPatient);
          }}  
        />
      </div>
      <Footer/>
    </div>
  );
}


export default Patients;