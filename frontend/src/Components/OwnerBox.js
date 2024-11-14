import React from 'react';
import { useState } from 'react';
import '../CSS/App.css';
import pencil from '../images/pencil.png';
import '../CSS/OwnerBox.css';

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
            <h2><strong>Owner Information</strong></h2>

            {/*} Editing mode that enables editing of owner details{*/}
            {editing ? (
                <div>
                    <button onClick={handleChange} className="save-button">
                        <strong>Save</strong>
                    </button>
                    <div className='form-group'>
                    <label><strong>Client Name: </strong></label> 
                    <input type= 'text' value={editedOwnerName} onChange={(event) => setEditedOwnerName(event.target.value)}/>
                    </div>
                    <div className='form-group'>
                    <label><strong>Address: </strong></label> 
                    <input type= 'text' value={editedAddress} onChange={(event) => setEditedAddress(event.target.value)}/>
                    </div>
                    <div className='form-group'>
                    <label><strong>Phone Number: </strong></label> 
                    <input type='text' value={editedPhone} onChange={(event) => setEditedPhone(event.target.value)}/>
                    </div>
                    <div className='form-group'>
                    <label><strong>Email: </strong></label> 
                    <input type='text' value={editedEmail} onChange={(event) => setEditedEmail(event.target.value)}/>
                    </div>
                </div>

            ) :
            (
                    // Viewing mode that displays owner information, pencil icon displayed to enable editing.
                <div className='details'>
                    <button onClick={() => setEditing(true)} className="edit-button">
                            <img src={pencil} alt='edit'/>
                    </button>
                    <div className= 'form-group'>
                    <strong>Client Name: </strong>  <span>{ownerName}</span>
                    </div>
                    <div className= 'form-group'>
                    <strong>Address: </strong> <span>{address}</span>
                    </div>
                    <div className= 'form-group'>
                    <strong>Phone Number: </strong> <span>{phone}</span>
                    </div>
                    <div className= 'form-group'>
                    <strong>Email: </strong><span>{email}</span>
                    </div>
                </div>  
            
            )}
        </div>
    );}

export default OwnerBox;