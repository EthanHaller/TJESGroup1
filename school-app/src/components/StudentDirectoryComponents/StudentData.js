import silhouette from './silhouette.png';
import deleteIcon from './delete.png';
import Button from '@mui/material/Button';
import {doc, deleteDoc} from "firebase/firestore";
import db from '../../Firebase';
export default function StudentData({data, isEdit}) {

    function deleteStudent(student) {
        deleteDoc(doc(db, "students", student.id));
    }

    return (
        <>
            {data.map((element) =>
            <div className="studentLine">
            <img src={silhouette} className='img'/>
            <h1 className='studentNameText'>Name: {element.data.name}</h1>
            <h1 className='studentGradeText'>Grade: {element.data.grade}</h1>
            <div className= "buttonBox">
            {isEdit? 
            <button className= "deleteButton"><img className = "deleteIcon" src= {deleteIcon} onClick= {() => {deleteStudent(element)}}/></button>
             : <p1></p1>
            }
            </div>
            </div>
            )}
        </>
    );

}