import {useState, useEffect} from 'react';
import StudentData from './StudentData';
import AddStudent from './addStudent';
import db from '../../Firebase';
import {collection, getDocs} from 'firebase/firestore';
/*todo: fix search bar and add filter
finish add student feature
*/
export default function SearchBar() {

  //useStates to load components
  const [isEdit, setIsEdit] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);

  //fetching database data
  const [students, setStudents] = useState([])
    useEffect(() => {
        getStudents()
    }, [isDataChanged])
    
    useEffect(() => {
    }, [students])
    function getStudents() {
        const studentCollectionRef = collection(db, 'students')
        getDocs(studentCollectionRef)
        .then(response => {
            const students = response.docs.map(doc => ({
                data: doc.data(), 
                id: doc.id,
            }))
            setStudents(students)
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
        setSearchInput(e.target.value);
      };
      
      if (searchInput.length > 0) {
          students.filter((student) => {
          return student.data.name.match(searchInput);
      });
      }
      return (
        <div>
            <div className='searchBar'>
            <form method="post" onSubmit= {handleChange}>
            <label> Search:
            <input
            type= "text"
            placeholder= "Search Names"
            onChange= {handleChange}
            value= {searchInput}
            />
            </label> 
            <button>Search</button>
            </form>
            {isEdit? <button className='editButton' onClick={handleClick}>Stop Editing</button> : 
            <button className='editButton' onClick={handleClick}>Edit</button>
            }
            {isEdit? <AddStudent changeIsDataChanged={changeIsDataChanged} isDataChanged={isDataChanged}/> :
            <p1></p1>
            }
            </div>
    
            <div className='resultsTable'>
                    <StudentData data= {students} isEdit={isEdit} changeIsDataChanged={changeIsDataChanged} isDataChanged={isDataChanged}/>
            </div>
            
        </div>
      );

}