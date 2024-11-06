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


// OwnerBox component, with owner name, phone, address, email, and onSave function arguments

function OwnerBox ({ownerName, phone, address, email, onSave}) {

    // Enables toggling between view and edit, holds the edited owner values
    const [editing, setEditing] = useState(false);
    const [editedOwnerName, setEditedOwnerName] = useState(ownerName);
    const [editedPhone, setEditedPhone] = useState(phone);
    const [editedAddress, setEditedAddress] = useState(address);
    const [editedEmail, setEditedEmail] = useState(email);

    // Function that enables saved changes
    const handleChange = () => {
        setEditing(false);
        onSave(editedOwnerName, editedPhone, editedAddress, editedEmail)
    };

    return (
        <div className ="OwnerBox">
            {/*} Editing mode that enables editing of owner details{*/}
            {editing ? (
                <div>
                    <p><strong>Client Name: </strong> <input value={editedOwnerName} onChange={(event) => setEditedOwnerName(event.target.value)}/>
                    <strong>Address: </strong> <input value={editedAddress} onChange={(event) => setEditedAddress(event.target.value)}/>
                    <button onClick={handleChange}><strong>Save</strong></button>
                    </p>
                    <p><strong>Phone Number: </strong> <input value={editedPhone} onChange={(event) => setEditedPhone(event.target.value)}/>
                    <strong>Email: </strong> <input value={editedEmail} onChange={(event) => setEditedEmail(event.target.value)}/>
                    </p>
                </div>
            ) :
            (
                // Viewing mode that displays owner information, pencil icon displayed to enable editing.
                <div>
                <p><strong>Client Name: </strong> {ownerName} <strong>Address: </strong> {address} <button onClick={() => setEditing(true)}><img src={pencil} alt='pencil' style= {{width: '15px', height: '15px' }} /></button></p>
                <p><strong>Phone Number: </strong> {phone} <strong>Email: </strong> {email}</p>
                </div>
            )}
        </div>
    );
}


export default OwnerBox;