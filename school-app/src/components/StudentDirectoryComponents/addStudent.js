import Popup from "./Popup";
import {useState} from 'react';
import SubmitForm from "./SubmitForm";
import { Button } from "@mui/material";
export default function AddStudent({changeIsDataChanged, isDataChanged}) {

const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

    return (
        <div>
    <Button
    className="editButton"
      onClick={togglePopup}
      variant="contained"
      color="success"
    >Add Student</Button>
    
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