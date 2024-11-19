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
  user: process.env.USER,         
  password: process.env.PASSWORD,
  database: process.env.NAME    
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

application.get('http://localhost:5000/', (request, response) => {
  if (response) {
    response.send('Backend is functioning correctly');
    return;
  }
  else {
    console.log('Backend is not functioning properly')
  }
});

// Define port variable

const PORT = process.env.PORT || 8000;

// Start and listen to port on port 8000

application.listen(PORT, (error) => {
  if (error) {
    console.log('Server not properly running');
  }
  else {
    console.log(`Server is running correctly on port ${PORT}`);
  }
});