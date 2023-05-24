import React, { useState } from 'react';
import { db } from './Firebase';
import { collection, doc, getDocs, addDoc } from 'firebase/firestore';
import {Button, TextField} from '@mui/material';

function ClassAdding() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [classData, setClassData] = useState({
    teacher: '',
    subject: '',
    grade: 0,
    num: 0
  });

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can perform any necessary actions with the classData, such as saving it to a database
    try {
      // Save classData to the database using Firebase Firestore
      await addDoc(collection(db, 'classes'), classData);
      // Reset the classData state
      setClassData({ teacher: '', subject: '', grade: 0, num: 0 });
      // Close the popup
      setIsPopupOpen(false);
    } catch (error) {
      console.log('Error adding class:', error);
    }
  };

  return (
    <div>
      <br></br>
      <Button onClick={handlePopupOpen} variant='outlined'>Add a new Class!</Button>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handlePopupClose}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Teacher"
                type="text"
                name="teacher"
                value={classData.teacher}
                onChange={handleInputChange}
                size="small"
                sx={{ width: '200px' }}
                margin="normal"
              />
              <TextField
                label="Subject"
                type="text"
                name="subject"
                value={classData.subject}
                onChange={handleInputChange}
                size="small"
                sx={{ width: '200px' }}
                margin="normal"
              />
              <TextField
                label="Grade Level"
                type="text"
                name="grade"
                value={classData.grade}
                onChange={handleInputChange}
                size="small"
                sx={{ width: '200px' }}
                margin="normal"
              />
              <TextField
                label="Number of Students"
                type="text"
                name="num"
                value={classData.num}
                onChange={handleInputChange}
                size="small"
                sx={{ width: '200px' }}
                margin="normal"
              />
              <Button variant='contained' type="submit">Confirm</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassAdding;
