// Description: Total web developer bootcamp
// Source: The Web Developer Bootcamp 2024, Colt Steele
// Reference: https://www.udemy.com/course/the-web-developer-bootcamp/?couponCode=NVD20PMUS

// Description: Backend Fundamentals Course
// Source: All Fundamentals of JavaScript | Part 1 - Backend Development, Sheryians Coding School
// Reference: https://www.youtube.com/watch?v=T55Kb8rrH1g&list=PLbtI3_MArDOkXRLxdMt1NOMtCS-84ibHH

// Description: MySQL bootcamp
// Source: The Ultimate MySQL Bootcamp: Go from SQL Beginner to Expert, Colt Steele
// Reference: https://www.udemy.com/course/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert

// Description: Using findIndex, splice, and parseInt in JavaScript
// Source: Array.prototype.findIndex(), Array.prototype.splice(), parseInt()
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript

// backend.js file for handling data requests

// Import express, cors, env, mysql2 modules

const express = require('express');  
const cors = require('cors');        
const env = require('dotenv'); 
const sql = require('mysql2');      
const application = express();

// Load data from .env file

env.config();

// Middleware initialization 

application.use(express.json());   
application.use(cors());           


// Configuration of database

const dataBase = sql.createConnection({
  host: process.env.HOST,         
  user: process.env.DB_USER || 'admin',         
  password: process.env.PASSWORD,
  database: process.env.NAME,  
  port: process.env.PORT,
});


// Databse connection function

dataBase.connect((error) => {
  if (error)
  {
    console.error('Unable to connect to the database', error);
    return;
  }
  else {
    console.log('Successful connection to the database');
  }});


// Test of get request to localhost root

// application.get('/', (request, response) => {
//   if (response) {
//     response.send('Backend is functioning correctly');
//     return;
//   }
//   else {
//     console.log('Backend is not functioning properly')
//   }
// });


// Get Routes

// Gets patient data along with client information

application.get('/patients', (request, response) => {
  const query = `SELECT Patients.*, Clients.ownerName, Clients.phone, 
  Clients.altPhone, Clients.address, Clients.email, Clients.altEmail, 
  Clients.altContact From Patients 
  LEFT JOIN Clients ON Patients.clientID = Clients.clientID`;
  dataBase.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving all patients', error);
      response.status(500).send('Error fetching data');
      return;
    }
    response.json(results);
  });
});


// Gets client data

application.get('/clients', (request, response) => {
  const query = `SELECT * FROM Clients`;

  dataBase.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving all clients', error);
      response.status(500).send('Error fetching data');
      return;
    }
    response.json(results);
  });
});

// Get Patients from triage

// Triage patients array

let patientsTriage = [];

application.get('/triage', (request, response) => {
  response.json(patientsTriage);
});


// Post Routes

// Add patient data

application.post("/patients", (request, response) => {
  console.log(request.body)
  const {patientName, DOB, species, sex, breed, regularVet, allergies, 
    history, meds, vaccines, visitReason, ETA, location, imageURL, clientID} = request.body;
  const query =   `INSERT INTO Patients (patientName, DOB, species, sex, breed, regularVet, allergies, 
                  history, meds, vaccines, visitReason, ETA, location, imageURL, clientID) 
                  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  const values = [patientName, DOB, species, sex, breed, regularVet, allergies, 
                  history, meds, vaccines, visitReason, ETA, location, imageURL, clientID || null];

  dataBase.query(query, values, (error) => {
    if (error) {console.error('Error executing query:', error);
    response.status(500).send('Error executing query');
    return;
  }
  console.log('Patient added successfully');
  response.status(200).json({message: 'Patient added successfully'});
});
});


// Add client data

application.post("/clients", (request, response) => {
  console.log(request.body)
  const {ownerName, phone, altPhone, address, email, altEmail, altContact} = request.body;
  const query =   `INSERT INTO Clients (ownerName, phone, altPhone, address, email, altEmail, altContact) 
                  VALUES(?,?,?,?,?,?,?)`;
  const values = [ownerName, phone, altPhone, address, email, altEmail, altContact];

  dataBase.query(query, values, (error) => {
    if (error) {console.error('Error executing query:', error);
    response.status(500).send('Error executing query');
    return;
  }
  console.log('Client added successfully');
  response.status(200).json({message: 'Client added successfully'});
});
});


// Add patient to triage array

application.post("/triage", (request, response) => {
  const {patientID, patientName, species, visitReason, ETA, location} = request.body;
  const triageNewPatient = {triageID: patientsTriage.length + 1, patientName, species, visitReason, ETA, location};

  patientsTriage.push(triageNewPatient);
  response.status(200).json({message: 'Patient added successfully to triage', patient: triageNewPatient});
});


// Update Routes
 
// Update Patient

application.put("/patients/:patientID", (request, response) => {
  const {patientName, DOB, species, sex, breed, regularVet, allergies, 
    history, meds, vaccines, visitReason, ETA, location, imageURL, clientID} = request.body;

    const patientID = request.params.patientID;

    const query = `UPDATE Patients SET patientName = ?, DOB = ?, species = ?, 
                  sex = ?, breed = ?, regularVet = ?, allergies = ?, history = ?, 
                  meds = ?, vaccines = ?, visitReason = ?, ETA = ?, location = ?, imageURL = ?, clientID = ?
                  WHERE patientID = ?`;

    dataBase.query(query, [patientName, DOB, species, sex, breed, regularVet, allergies, 
      history, meds, vaccines, visitReason, ETA, location, imageURL, clientID, patientID], (error, result) => {
        if (error) {
          console.error('Error updating patient:', error);
          response.status(500).json({error: 'Failed to update patient'});
          return;
        }
        if (result.affectedRows === 0) {
          response.status(404).send(`Could not locate patient with Patient ID of ${patientID}.`);
          return;
        }
        console.log('Patient updated successfully');
        response.status(200).json({message: 'Patient successfully updated'});
    });
});

// Update Client

application.put("/clients/:clientID", (request, response) => {
  const {ownerName, phone, altPhone, address, email, altEmail, altContact} = request.body;
  const clientID = request.params.clientID;

  const query = `UPDATE Clients SET ownerName = ?, phone = ?, 
                altPhone = ?, address = ?, email = ?, altEmail = ?, altContact = ?
                WHERE clientID = ?`

  dataBase.query(query, [ownerName, phone, altPhone, address, email, altEmail, altContact, clientID], (error, result) => {
      if (error) {
        console.error('Error updating client:', error);
        response.status(500).json({error: 'Failed to update client'});
        return;
      }
      if (result.affectedRows === 0) {
        response.status(404).send(`Could not locate client with Client ID of ${clientID}.`);
        return;
      }
      console.log('Client updated succesfully');
      response.status(200).json({message: 'Client successfully updated'});
  });
});

// Update Patient in triage array

application.put("/triage/:triageID", (request, response) => {

  const triageID = parseInt(request.params.triageID, 10);
  const {patientName, species, visitReason, ETA, location} = request.body;
  const triageIndex =  patientsTriage.findIndex(patient => patient.triageID === triageID);

  if (triageIndex === -1) {
    response.status(404).send(`Could not locate and update patient with Patient Triage ID of ${triageID}.`);
    return;
  }

  patientsTriage[triageIndex] = {...patientsTriage[triageIndex], patientName, species, visitReason, ETA, location};
 
  console.log('Patient added to triage successfully');
  response.status(200).json({message: 'Patient added to triage successfully', updatedTriagePatient: patientsTriage[triageIndex]});
});



// Delete Routes

// Delete Patient

application.delete('/patients/:patientID', (request, response) => {
  const patientID = request.params.patientID;
  const query = 'DELETE FROM Patients WHERE patientID = ?';

  dataBase.query(query, [patientID], (error) => {
    if (error) {
      console.error('Error deleting patient:', error);
      response.status(500).json({error: 'Failed to delete patient'});
      return;
    }
    console.log('Patient deleted successfully');
    response.sendStatus(204); 
  });
});

// Delete client

application.delete('/clients/:clientID', (request, response) => {
  const clientID = request.params.clientID;
  const query = 'DELETE FROM Clients WHERE clientID = ?';
  
  dataBase.query(query, [clientID], (error) => {
    if (error) {
      console.error('Error deleting client:', error);
      response.status(500).json({error: 'Failed to delete client'});
      return;
    }
    console.log('Client deleted successfully');
    response.sendStatus(204);
  });
});

// Delete patient from triage array

application.delete('/triage/:triageID', (request, response) => {
  const triageID = request.params.triageID;
  const triageIndex = patientsTriage.findIndex(patient => patient.triageID === triageID);

  if (triageIndex === -1) {
    response.status(404).send(`Could not locate patient with Patient Triage ID of ${triageID}.`);
    return;
  }

  patientsTriage.splice(triageIndex, 1);
  response.sendStatus(204);
});
    
  
// Move patient from the triage into the patient database

