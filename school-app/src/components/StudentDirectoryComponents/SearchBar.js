import {useState} from 'react';
import StudentData from './StudentData';
import AddStudent from './addStudent';
/*todo: fix search bar and add filter
finish add student feature
*/
export default function SearchBar({data}) {
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    function handleClick() {
      setIsEdit(!isEdit);
    }
    const [searchInput, setSearchInput] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };
      
      if (searchInput.length > 0) {
          data.filter((student) => {
          return student.data.name.match(searchInput);
      });
      }

      function addStudent() {
          setIsAdd(true);
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
            {isEdit? <button className= "editButton" onClick={addStudent}>Add Student</button> :
            <p1></p1>
            }
            </div>
            <div className='resultsTable'>
                    <StudentData data= {data} isEdit={isEdit}/>
            </div>
            {isAdd? <AddStudent/> : <p1></p1>}
            
        </div>
      );

}