import {useState, useEffect} from 'react';
import StudentData from './StudentData';
import AddStudent from './addStudent';
import db from '../../Firebase';
import {collection, getDocs} from 'firebase/firestore';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
export default function SearchBar({ currentUser }) {

  //useStates to load components
  const [isEdit, setIsEdit] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [sortedStudents, setSortedStudents] = useState([])
  //fetching database data
  const [students, setStudents] = useState([])
    useEffect(() => {
        getStudents()
    }, [isDataChanged])
    
    useEffect(() => {
    }, [students, sortedStudents])

    function getStudents() {
        const studentCollectionRef = collection(db, 'students')
        getDocs(studentCollectionRef)
        .then(response => {
            const students = response.docs.map(doc => ({
                data: doc.data(), 
                id: doc.id,
            }))
            setStudents(students)
            setSortedStudents(students.sort((a,b) => {
                return a.data.year > b.data.year ? 1 : -1
            }))
            if (searchInput.length > 0) {
                setSortedStudents(sortedStudents.filter((element) => {
                return element.data.name.toString().match(searchInput);
            }));
            setSearchInput("")
            }
        }).catch(error => console.log(error.message))
    }


    function changeIsDataChanged (update) {
        setIsDataChanged(update);
    }
    //edit button handle click
    function handleClick() {
      setIsEdit(!isEdit);
    }

    //search bar functionality
    const [searchInput, setSearchInput] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        setSearchInput(formJson.searched)
        changeIsDataChanged(!isDataChanged);
      };

      //clear search button
      function clearSearch() {
        setSearchInput("");
        changeIsDataChanged(!isDataChanged);
      }

      if(currentUser === null) return ( <p>Loading...</p> )
      return (
        <div>
            <div className='searchBar'>
            <form method="post" onSubmit= {handleChange} className='searchForm'>
            <label className='searchLabel'> Search:
            <TextField
            className='searchInput'
            name='searched'
            type= "text"
            placeholder= "Search Names"
            size='small'
            />
            </label> 
            <Button type='submit' variant='contained'>Search</Button>
            </form>
            <Button variant='contained' onClick={clearSearch} className='editButton'>Clear Search</Button>
            {(currentUser.role === "admin") && (isEdit? <Button className="editButton" onClick={handleClick} variant='contained' color='error'>Stop Editing</Button> : 
            <Button className="editButton" onClick={handleClick} variant='contained'>Edit</Button>
            )}
            {isEdit? <AddStudent changeIsDataChanged={changeIsDataChanged} isDataChanged={isDataChanged}/> :
            <p></p>
            }
            </div>
            {!sortedStudents? <p></p> : 
            <div className='resultsTable'>
                <div className='scrollBox'>
                    <StudentData data= {sortedStudents} isEdit={isEdit} changeIsDataChanged={changeIsDataChanged} isDataChanged={isDataChanged} currentUser={currentUser}/>
                    </div>
            </div>
            }
            
        </div>
      );

}