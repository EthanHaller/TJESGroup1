import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import db from '../Firebase';
import { Grid, TextField, Button, Typography, Container } from '@mui/material';
import { useParams } from 'react-router-dom';


function ClassPage() {

  const [classData, setClassData] = useState(null);
  const [studentsData, setStudentsData] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState({});

  // Use a specific class ID
  const { classId } = useParams();

  

  useEffect(() => {
    const fetchClassData = async () => {
      const classDoc = doc(db, 'classes', classId);
      const classDataSnapshot = await getDoc(classDoc);

      if (classDataSnapshot.exists) {
        const data = classDataSnapshot.data();
        setClassData(data);

        const studentsPromises = data.roster.map((studentId) => getDoc(doc(db, 'students', studentId)));
        const studentsSnapshots = await Promise.all(studentsPromises);

        const studentsData = studentsSnapshots.map(snapshot => ({
          ...snapshot.data(),
          grade: snapshot.data().grades[data.subject], // replaced classId with data.subject
        }));
        setStudentsData(studentsData);
      } else {
        console.log('No such document!');
      }
    };

    fetchClassData();
  }, [classId]);


  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditValue({
      name: studentsData[index].name,
      grade: studentsData[index].grade
    });
  }

  const handleSaveClick = async () => {
    if (editIndex !== -1) {
      const newStudentsData = [...studentsData];
      newStudentsData[editIndex].name = editValue.name;
      newStudentsData[editIndex].grade = editValue.grade;
  
      const studentId = classData.roster[editIndex];
  
      await setDoc(doc(db, 'students', studentId), {
        name: editValue.name,
        grades: {
          ...newStudentsData[editIndex].grades,
          [classData.subject]: editValue.grade,
        },
      });
  
      // Update the local state with the updated student data
      setStudentsData(newStudentsData);
      setEditIndex(-1);
      setEditValue({});
    }
  };
  const handleEditChange = (field, value) => {
    setEditValue({
      ...editValue,
      [field]: value
    });
  }
  if (!classData || studentsData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2>{classData.name}</h2>
      <div>
      <h2>Class Page</h2>
        <Typography variant="h6">Subject: {classData.subject}</Typography>
        <Typography variant="h6">Grade: {classData.grade}</Typography>
        <Typography variant="h6">Teacher: {classData.teacher}</Typography>
        <Typography variant="h6">Class Size: {classData.num}</Typography>
      </div>
      {studentsData && studentsData.length > 0 &&
        <div style={{ marginTop: '2rem' }}>
          <Container>
            <Typography variant="h5" style={{textAlign: 'center' }}>Roster:</Typography>
            <Grid container spacing={3} style={{ marginTop: '1rem', maxWidth: '500px', margin: 'auto' }}>
              <Grid item xs={4}><Typography variant="h6">Name</Typography></Grid>
              <Grid item xs={4}><Typography variant="h6">Grade</Typography></Grid>
              <Grid item xs={4}><Typography variant="h6">Action</Typography></Grid>
              {studentsData.map((student, index) => (
                editIndex === index ? (
                  <React.Fragment key={index}>
                    <Grid item xs={4}><TextField value={editValue.name} onChange={(e) => handleEditChange('name', e.target.value)} label="Name" /></Grid>
                    <Grid item xs={4}><TextField value={editValue.grade} onChange={(e) => handleEditChange('grade', e.target.value)} label="Grade" /></Grid>
                    <Grid item xs={4}><Button variant="contained" onClick={handleSaveClick}>Save</Button></Grid>
                  </React.Fragment>
                ) : (
                  <React.Fragment key={index}>
                    <Grid item xs={4}><Typography variant="body1">{student.name}</Typography></Grid>
                    <Grid item xs={4}><Typography variant="body1">{student.grade}</Typography></Grid>
                    <Grid item xs={4}><Button variant="contained" onClick={() => handleEditClick(index)}>Edit</Button></Grid>
                  </React.Fragment>
                )
              ))}
            </Grid>
          </Container>
        </div>
      }
    </div>
  );
  }

export default ClassPage;