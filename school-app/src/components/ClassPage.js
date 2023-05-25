import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import db from '../Firebase';
import { Box, Card, CardContent, TextField, Button, Typography, Container, Grid, Paper } from '@mui/material';
import { useParams, Link } from 'react-router-dom';



function ClassPage() {

  const [classData, setClassData] = useState(null);
  const [studentsData, setStudentsData] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState({});
  const [teacherData, setTeacherData] = useState(null);

  // Use a specific class ID
  const params = useParams();
  const classId = params.classId
  const userId = params.id

  useEffect(() => {
    const fetchClassData = async () => {
      const classDoc = doc(db, 'classes', classId);
      const classDataSnapshot = await getDoc(classDoc);
  
      if (classDataSnapshot.exists) {
        const data = classDataSnapshot.data();
        setClassData(data);
  
        // Fetch the students data
        const studentsPromises = data.roster.map((studentId) => getDoc(doc(db, 'students', studentId)));
        const studentsSnapshots = await Promise.all(studentsPromises);
  
        const studentsData = studentsSnapshots.map(snapshot => ({
          ...snapshot.data(),
          grade: snapshot.data().grades[data.subject],
        }));
        setStudentsData(studentsData);
  
        // Fetch the teacher data
        const teacherDoc = doc(db, 'teachers', data.teacher);
        const teacherDataSnapshot = await getDoc(teacherDoc);
  
        if (teacherDataSnapshot.exists) {
          setTeacherData(teacherDataSnapshot.data());
        } else {
          console.log('No such teacher document!');
        }
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
    <Container maxWidth="md">
      <Box my={4}>
        <Button variant='contained' component={Link} to={`/${userId}/classes`}>Back to Classes</Button>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom>{classData.name}</Typography>
            <Typography variant="h6" component="div"><b>Subject:</b> {classData.subject}</Typography>
            <Typography variant="h6" component="div"><b>Grade:</b> {classData.grade}</Typography>
            <Typography variant="h6" component="div"><b>Teacher:</b> {teacherData ? teacherData.name : 'Loading...'}</Typography>
            <Typography variant="h6" component="div"><b>Class Size:</b> {classData.num}</Typography>
          </CardContent>
        </Card>
        <Box my={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom><b>Roster</b></Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}><Typography variant="h6" style={{ textDecoration: 'underline' }}>Name</Typography></Grid>
              <Grid item xs={4}><Typography variant="h6" style={{ textDecoration: 'underline' }}>Grade</Typography></Grid>
              <Grid item xs={4}><Typography variant="h6" style={{ textDecoration: 'underline' }}>Action</Typography></Grid>

              {studentsData.map((student, index) => (
                editIndex === index ? (
                  <React.Fragment key={index}>
                    <Grid item xs={4}>
                      <TextField value={editValue.name || ''} onChange={(e) => handleEditChange('name', e.target.value)} label="Name" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField value={editValue.grade || ''} onChange={(e) => handleEditChange('grade', e.target.value)} label="Grade" />
                    </Grid>
                    <Grid item xs={4}>
                      <Button variant="contained" color="primary" onClick={handleSaveClick}>Save</Button>
                    </Grid>
                  </React.Fragment>
                ) : (
                  <React.Fragment key={index}>
                    <Grid item xs={4}><Typography variant="body1">{student.name || 'N/A'}</Typography></Grid>
                    <Grid item xs={4}><Typography variant="body1">{student.grade || 'N/A'}</Typography></Grid>
                    <Grid item xs={4}><Button variant="contained" onClick={() => handleEditClick(index)}>Edit</Button></Grid>
                  </React.Fragment>
                )
              ))}
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default ClassPage;