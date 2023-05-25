import {useState, useEffect} from 'react';
import TeacherData from './TeacherData';
import AddTeacher from './AddTeacher';
import db from '../../Firebase';
import {collection, getDocs} from 'firebase/firestore';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
export default function SearchBar({ currentUser }) {

  //useStates to load components
  const [isEdit, setIsEdit] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [sortedTeachers, setSortedTeachers] = useState([])
  //fetching database data
  const [teachers, setTeachers] = useState([])
    useEffect(() => {
        getTeachers()
    }, [isDataChanged])
    
    useEffect(() => {
    }, [teachers, sortedTeachers])

    function getTeachers() {
        const teacherCollectionRef = collection(db, 'teachers')
        getDocs(teacherCollectionRef)
        .then(response => {
            const teachers = response.docs.map(doc => ({
                data: doc.data(), 
                id: doc.id,
            }))
            setTeachers(teachers)
            setSortedTeachers(teachers.sort((a,b) => {
                return a.data.gradeTaught > b.data.gradeTaught ? 1 : -1
            }))
            if (searchInput.length > 0) {
                setSortedTeachers(sortedTeachers.filter((element) => {
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
      

      return (
        <div>
            <div className='searchBar'>
            <form method="post" onSubmit= {handleChange}>
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
            {(currentUser.role === "admin") && (isEdit? <Button className="editButton" onClick={handleClick} variant='contained' color='error'>Stop Editing</Button> : 
            <Button className="editButton" onClick={handleClick} variant='contained'>Edit</Button>
            )}
            {isEdit? <AddTeacher changeIsDataChanged={changeIsDataChanged} isDataChanged={isDataChanged}/> :
            <p1></p1>
            }
            </div>
            {!sortedTeachers? <p1></p1> : 
            <div className='resultsTable'>
                <div className='scrollBox'>
                    <TeacherData data= {sortedTeachers} isEdit={isEdit} changeIsDataChanged={changeIsDataChanged} isDataChanged={isDataChanged}/>
                    </div>
            </div>
            }
            
        </div>
      );

}