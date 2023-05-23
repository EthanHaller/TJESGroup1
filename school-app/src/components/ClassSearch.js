import React, {useState, useEffect} from 'react';
import { db } from './Firebase';
import {collection, doc, getDocs} from "firebase/firestore";
import { FormControl, MenuItem, Select, InputLabel, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


function ClassSearch() {

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
      filteredData = filteredData.filter((item) => item.grade === parseInt(selectedGrade));
    }

    if (inputValue && inputValue !== '' && inputValue !== undefined) {
      filteredData = filteredData.filter((item) =>
        item.teacher && item.teacher.toLowerCase().includes(inputValue.toLowerCase())
      );
    }

    console.log(filteredData);
    console.log(classes);

    setFilteredClasses(filteredData);
  };

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const classCollection = collection(db, "classes");
        const querySnapshot = await getDocs(classCollection);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        data.sort((a, b) => {
          if (a.grade !== b.grade) {
            return a.grade - b.grade; 
          }
          return a.teacher.localeCompare(b.teacher); 
        });

        setClasses(data);
        setFilteredClasses(data);
      } catch (error) {
        console.error("Error fetching classes RIP OH NOOOOO ):", error);
      }
    };

    fetchDocs();
  }, []);

  

  return (
    <div>
      <h2>TJES Class Search Page</h2>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
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
    </div>

    <button onClick={handleSearch}>Search</button>
      
     

      <TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell style={{ fontWeight: 'bold' }}>Teacher</TableCell>
        <TableCell style={{ fontWeight: 'bold' }}>Subject</TableCell>
        <TableCell style={{ fontWeight: 'bold' }}>Grade Level</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {filteredClasses.map((poll) => (
        <TableRow key={poll.id}>
          <TableCell>{poll.teacher}</TableCell>
          <TableCell>{poll.subject}</TableCell>
          <TableCell>{poll.grade}</TableCell>
          <TableCell><button>More Info</button></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
      

      
    </div>
  );


}

export default ClassSearch;