import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import  db  from '../Firebase';
import { TextField, Button, Typography, Box, Container, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';



function ClassPage() {
  const [classData, setClassData] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState({});

  // Use a specific class ID
  const classId = 'OZQAjh82nJN2wsg3wXEs';

  useEffect(() => {
    const fetchClassData = async () => {
      const classDoc = doc(db, 'classes', classId);
      const classData = await getDoc(classDoc);

      if (classData.exists) {
        setClassData(classData.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchClassData();
  }, []);

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditValue({
      name: classData.roster[index].name,
      grade: classData.roster[index].grade
    });
  }

  const handleSaveClick = async () => {
    const newRoster = [...classData.roster];
    newRoster[editIndex] = editValue;

    await setDoc(doc(db, 'classes', classId), {
      ...classData,
      roster: newRoster
    });

    setClassData({
      ...classData,
      roster: newRoster
    });

    setEditIndex(-1);
    setEditValue({});
  }

  if (!classData) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h2" align="center" gutterBottom>XYZ Class Page</Typography>
      <Typography variant="h5">Teacher: {classData.teacher}</Typography>
      <Typography variant="h5">Grade: {classData.grade}</Typography>
      <Typography variant="h5">Subject: {classData.subject}</Typography>
      <Typography variant="h5">Class Size: {classData.num}</Typography>
      <Typography variant="h5" gutterBottom>Roster</Typography>
      <List>
        {classData.roster.map((student, index) => {
          if (index === editIndex) {
            return (
              <ListItem key={index}>
                <ListItemText>
                  <TextField label="Name" variant="outlined" value={editValue.name} onChange={e => setEditValue({ ...editValue, name: e.target.value })} />
                  <TextField label="Grade" variant="outlined" type="number" value={editValue.grade} onChange={e => setEditValue({ ...editValue, grade: e.target.value })} />
                </ListItemText>
                <ListItemSecondaryAction>
                  <Button variant="contained" color="primary" onClick={handleSaveClick}>Save</Button>
                </ListItemSecondaryAction>
              </ListItem>
            );
          } else {
            return (
              <ListItem key={index}>
                <ListItemText primary={`Name: ${student.name}`} secondary={`Grade: ${student.grade}`} />
                <ListItemSecondaryAction>
                  <Button variant="contained" color="secondary" onClick={() => handleEditClick(index)}>Edit</Button>
                </ListItemSecondaryAction>
              </ListItem>
            );
          }
        })}
      </List>
    </Container>
  );
}

export default ClassPage;