import React, { useState } from 'react';
import  db  from '../Firebase';
import { collection, doc, getDocs, addDoc } from 'firebase/firestore';
import {Button, TextField} from '@mui/material';

function ClassAdding() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [teacherError, setTeacherError] = useState(false);
  const [classData, setClassData] = useState({
    teacher: '',
    subject: '',
    grade: 0,
    num: 0,
  });

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setDisplayError(false);
    setTeacherError(false);
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
  
    try {
      // Check if there is an existing class with the same name, subject, and grade
      const querySnapshot = await getDocs(collection(db, 'classes'));
      const existingClass = querySnapshot.docs.find((doc) => {
        const data = doc.data();
        return (
          data.name === classData.name &&
          data.subject === classData.subject &&
          data.grade === classData.grade
        );
      });
  
      if (existingClass) {
        // Display an error message to the user
        console.log('Error: Class already exists with the same name, subject, and grade.');
        setClassData({ teacher: '', subject: '', grade: 0, num: 0 });
        setDisplayError(true);
      } else {
        // Check if the entered teacher name exists in the "teachers" collection
        const teacherQuerySnapshot = await getDocs(collection(db, 'teachers'));
        const teacherDoc = teacherQuerySnapshot.docs.find((doc) => doc.data().name === classData.teacher);
  
        if (teacherDoc) {
          // Save the class data with the teacher field as the Document ID of the teacher
          const teacherId = teacherDoc.id;
          const classDataWithTeacherId = { ...classData, teacher: teacherId, roster: [] };
          await addDoc(collection(db, 'classes'), classDataWithTeacherId);
          // Reset the classData state
          setClassData({ teacher: '', subject: '', grade: 0, num: 0});
          setDisplayError(false);
          // Close the popup
          setIsPopupOpen(false);
        } else {
          // Display an error message if the teacher doesn't exist
          console.log('Error: Teacher does not exist.');
          setClassData({ teacher: '', subject: '', grade: 0, num: 0 });
          setTeacherError(true);
        }
      }
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
          <div className="popup-content"> <br></br>
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
              
              
            </form>
            

            <Button varient='contained' className="close" sx={{ color: 'red' }} onClick={handlePopupClose}>
              Close
            </Button>
            <Button variant='contained' type="submit" onClick={handleSubmit}>Confirm</Button>
            {displayError && <p>Error: Class already exists with the same name, subject, and grade.</p>}
            {teacherError && <p style={{ color: 'red', fontWeight: 'bold', fontFamily: 'Arial' }}>Error: That teacher does not exist in the directory.</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassAdding;
