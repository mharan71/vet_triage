import React, {useState} from "react";
import '../CSS/PatientImageBox.css';

function PatientImageBox ({imageURL, onImageSave, patientName}) {

    // 
    const [currImage, setCurrImage] = useState(imageURL);
    const [hideUploadButton, setHideUploadButton] = useState(Boolean(imageURL));
    const [showPatientName, setShowPatientName] = useState(Boolean(patientName))
    

    // Function that enables saved changes
    const handleImageSave = (event) => {

        const imageFile = event.target.files[0]
        if (!imageFile) return;
        const newImageURL = URL.createObjectURL(imageFile);
        setCurrImage(newImageURL);
        onImageSave(newImageURL);
        setHideUploadButton(true);
        setShowPatientName(true);

    };

    const handleImageDelete = () => {
        setCurrImage(null);
        onImageSave(null);
        setHideUploadButton(false);
        setShowPatientName(false);
    }

    return (
        <div className="PatientBoxImage">
            <div className="header-image">
                <h2><strong>Patient Image</strong></h2>
                <div className="name-image-container">
                    <div className="image-container">
                        {currImage ? (
                        <img src={currImage} alt= "Patient" className="patient-image"/>
                        ) 
                        :( 
                        <div className="no-image">No Image Uploaded</div>
                    )}
                    </div>
                {showPatientName && currImage &&(
                <div className="show-patient-name">
                            {patientName}
                </div>
                )}
            </div>
            </div>
            <div className="delete-upload-container">
                <div className="form-group">
                    {!hideUploadButton && (
                        <>
                    <label htmlFor="upload" className="file-upload">
                        Upload Image
                    </label>
                    <input id="upload" type = "file" onChange={handleImageSave}/>
                    </>
                )}
                </div>
                {currImage && (

                <div className="delete-container">
                    <button onClick={handleImageDelete} className= "delete-button">
                        Delete Image
                    </button>
                </div>     
            )}
            </div>
        </div>
    );
}


export default PatientImageBox;