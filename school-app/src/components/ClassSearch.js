import React, { useState, useEffect } from 'react';
import db from '../Firebase';
import ClassAdding from './ClassAdding';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Link, useOutletContext, useParams } from 'react-router-dom';

function ClassSearch() {
  const [isAdmin, setIsAdmin] = useState(false);
  const userId = useParams().id
  const currentUser = useOutletContext()
  const [selectedGrade, setSelectedGrade] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
  };

  const handleNameChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    let filteredData = classes;

    if (selectedGrade && selectedGrade !== '' && selectedGrade !== 'Select a grade') {
      filteredData = filteredData.filter((item) => {
        const itemGrade = typeof item.grade === 'string' ? parseInt(item.grade) : item.grade;
        const selectedGradeValue = typeof selectedGrade === 'string' ? parseInt(selectedGrade) : selectedGrade;
        return itemGrade === selectedGradeValue;
      });
    }

    if (inputValue && inputValue !== '' && inputValue !== undefined) {
      filteredData = filteredData.filter((item) =>
        item.teacherName && item.teacherName.toLowerCase().includes(inputValue.toLowerCase())
      );
    }

    setFilteredClasses(filteredData);
  };

  useEffect(() => {
    if(currentUser && currentUser.role === 'admin') {
      setIsAdmin(true);
    }
    const fetchDocs = async () => {
      try {
        const classCollection = collection(db, 'classes');
        const querySnapshot = await getDocs(classCollection);
        const data = [];

        for (const docSnap of querySnapshot.docs) {
          const docRef = doc(db, 'teachers', docSnap.data().teacher);
          const teacherDocSnap = await getDoc(docRef);
          const teacherName = teacherDocSnap.exists() ? teacherDocSnap.data().name : '';
          const classData = {
            id: docSnap.id,
            ...docSnap.data(),
            teacherName: teacherName,
          };
          data.push(classData);
        }

        data.sort((a, b) => {
          if (a.grade !== b.grade) {
            return a.grade - b.grade;
          }
          return a.teacherName.localeCompare(b.teacherName);
        });

        setClasses(data);
        setFilteredClasses(data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchDocs();
  }, [currentUser]);

  return (
    <div>
      <h2>TJES Class Search Page</h2>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <TextField id="outlined-basic" label="Teacher Last Name" variant="outlined" value={inputValue} onChange={handleNameChange} />
        <FormControl>
          <InputLabel>Grade</InputLabel>
          <Select
            labelId="gradelabel"
            id="gradelabel"
            value={selectedGrade}
            label="Grade"
            onChange={handleGradeChange}
            style={{ width: '200px' }}
          >
            <MenuItem value={0}>Any</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleSearch} variant="contained" style={{ height: '56px' }}>
          Search
        </Button>
      </div>
      {(isAdmin) && <ClassAdding />}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>
                <Button>Teacher</Button>
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Subject</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Grade Level</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClasses.map((classData) => (
              <TableRow key={classData.id}>
                <TableCell>{classData.teacherName}</TableCell>
                <TableCell>{classData.subject}</TableCell>
                <TableCell>{classData.grade}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/${userId}/classes/${classData.id}`}>More Info</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ClassSearch;