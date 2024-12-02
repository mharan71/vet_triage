import React, {useState} from "react";
import '../CSS/PatientImageBox.css';

// Description: Total web developer bootcamp
// Source: The Web Developer Bootcamp 2024, Colt Steele
// Reference: https://www.udemy.com/course/the-web-developer-bootcamp/?couponCode=NVD20PMUS

// Description: createObjectURL method
// Source: URL: createObjectURL() static method
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static

// PatientImageBox component, with imageURL, onImageSave, and patientName function arugments
function PatientImageBox ({imageURL, onImageSave, patientName}) {

    // Holds current image URL
    // Enables toggling between showing patient name/upload button, and hiding patient name/upload button
    const [currImage, setCurrImage] = useState(imageURL);
    const [hideUploadButton, setHideUploadButton] = useState(Boolean(imageURL));
    const [showPatientName, setShowPatientName] = useState(Boolean(patientName))
    

    // Function that handles the image upload, hiding upload button and showing patient name
    const handleImageSave = (event) => {

        const imageFile = event.target.files[0]
        if (!imageFile) return;
        const newImageURL = URL.createObjectURL(imageFile);
        setCurrImage(newImageURL);
        onImageSave(newImageURL);
        setHideUploadButton(true);
        setShowPatientName(true);

    };

    //Function that handles deletion of image, showing upload button and hiding patient name

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
                        {/* Displays uploaded image of patient or default no image placeholder*/}
                        {currImage ? (
                        <img src={currImage} alt= "Patient" className="patient-image"/>
                        ) 
                        :( 
                        <div className="no-image">No Image Uploaded</div>
                    )}
                    </div>
                {/* Displays uploaded patient image along with patient's name*/}
                {showPatientName && currImage &&(
                <div className="show-patient-name">
                            {patientName}
                </div>
                )}
            </div>
            </div>
            <div className="delete-upload-container">
                <div className="form-group">
                {/* Displays upload image button if there is no patient image uploaded*/}
                    {!hideUploadButton && (
                        <>
                    <label htmlFor="upload" className="file-upload">
                        Upload Image
                    </label>
                    <input id="upload" type = "file" onChange={handleImageSave}/>
                    </>
                )}
                </div>
                {/* Displays delete image button if there is patient image uploaded*/}
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