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


// PatientBox component, with order, Patient Name, Visit Reason, and onSave function arguments


function OwnerBox ({ownerName, phone, address, email}) {

    const [editing, setEditing] = useState(false);
    const [editedOwnerName, setEditedOwnerName] = useState(ownerName);
    const [editedPhone, setEditedPhone] = useState(phone);
    const [editedAddress, setEditedAddress] = useState(address);
    const [editedEmail, setEditedEmail] = useState(email);

    const handleChange = () => {
        setEditing(false);
        onSave(editedOwnerName, editedPhone, editedAddress, editedEmail)
    };

    return (
        <div className ="OwnerBox">
            {editing ? (
                <div>
                    <p><strong>Client Name: </strong> <input value={editedOwnerName} onChange={(event) => setEditedOwnerName(event.target.value)}/>
                    <strong>Address: </strong> <input value={editedAddress} onChange={(event) => setEditedAddress(event.target.value)}/>
                    </p>
                    <p><strong>Phone Number: </strong> <input value={editedPhone} onChange={(event) => setEditedPhone(event.target.value)}/>
                    <strong>Email: </strong> <input value={editedEmail} onChange={(event) => setEditedEmail(event.target.value)}/>
                    </p>
                </div>
            ) :
            (
                <div>
                <p><strong>Client Name: </strong> {ownerName} <strong>Address: </strong> {address} <button onClick={() => setEditing(true)}><img src={pencil} alt='pencil' style= {{width: '15px', height: '15px' }} /></button></p>
                <p><strong>Phone Number: </strong> {phone} <strong>Email: </strong> {email}</p>
                </div>
            )}
        </div>
    );
}


export default OwnerBox;