import Popup from "./Popup";
import {useState} from 'react';
import SubmitForm from "./SubmitForm";
export default function AddStudent({changeIsDataChanged, isDataChanged}) {

const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

    return (
        <div>
    <button
    className='editButton'
      onClick={togglePopup}
    >Add Student</button>
    
    {isOpen && <Popup
      content={<div>
        <b>Add New Student</b>
        <SubmitForm changeIsDataChanged={changeIsDataChanged} isDataChanged={isDataChanged} togglePopup={togglePopup}/>
      </div>}
      handleClose={togglePopup}
    />}
  </div>
    );
}