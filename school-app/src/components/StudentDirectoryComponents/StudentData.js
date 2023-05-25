import { useState, useEffect } from 'react';
import silhouette from './silhouette.png';
import deleteIcon from './delete.png';
import Button from '@mui/material/Button';
import {doc, deleteDoc} from "firebase/firestore";
import db from '../../Firebase';
import StudentView from './StudentView';
export default function StudentData({data, isEdit, changeIsDataChanged, isDataChanged, currentUser}) {
    const [forStudentView, setForStudentView] = useState(-1);
    const [isStudentView, setIsStudentView] = useState(false);
    function toggleStudentView(index) {
        setIsStudentView(!isStudentView);
        setForStudentView(index);
    }
    async function deleteStudent(student) {
        await deleteDoc(doc(db, "students", student.id));
        changeIsDataChanged(!isDataChanged);
    }
    return (
        <>
            {data.map((element, index) =>
            <div className="studentLine">
            <img src={silhouette} className='img' onClick={() => {toggleStudentView(index)}}/>
            <div className='studentNameTextBox'>
            <h1 className='studentNameText'>Name: {element.data.name}</h1>
            </div>
            <div className='studentYearTextBox'>
            <h1 className='studentGradeText'>Year: {element.data.year}</h1>
            </div>
            <div className= "buttonBox">
            {isEdit? 
            <Button className= "deleteButton" variant='contained' color='error'><img className = "deleteIcon" src= {deleteIcon} onClick= {() => {deleteStudent(element)}}/></Button>
             : <p1></p1>
            }
            </div>
            </div>
            )}
             {!isStudentView? <p1></p1> :
            <StudentView data={data} isStudentView={isStudentView} toggleStudentView={toggleStudentView} 
            index={forStudentView} changeIsDataChanged={changeIsDataChanged} isDataChanged={isDataChanged} currentUser={currentUser}/>
            }
        </>
    );

}