import { useState, useEffect } from 'react';
import silhouette from './silhouette.png';
import deleteIcon from './delete.png';
import Button from '@mui/material/Button';
import {doc, deleteDoc} from "firebase/firestore";
import db from '../../Firebase';
import TeacherView from './TeacherView';
export default function TeacherData({data, isEdit, changeIsDataChanged, isDataChanged}) {
    const [forTeacherView, setForTeacherView] = useState(-1);
    const [isTeacherView, setIsTeacherView] = useState(false);
    function toggleTeacherView(index) {
        setIsTeacherView(!isTeacherView);
        setForTeacherView(index);
    }
    function deleteTeacher(teacher) {
        deleteDoc(doc(db, "teachers", teacher.id));
        changeIsDataChanged(!isDataChanged);
    }
    return (
        <>
            {data.map((element, index) =>
            <div className="studentLine">
            <img src={silhouette} className='img' onClick={() => {toggleTeacherView(index)}}/>
            <div className='studentNameTextBox'>
            <h1 className='studentNameText'>Name: {element.data.name}</h1>
            </div>
            <div className='studentYearTextBox'>
            <h1 className='studentGradeText'>Grade Taught: {element.data.gradeTaught}</h1>
            </div>
            <div className= "buttonBox">
            {isEdit? 
            <Button className= "deleteButton" variant='contained' color='error'><img className = "deleteIcon" src= {deleteIcon} onClick= {() => {deleteTeacher(element)}}/></Button>
             : <p1></p1>
            }
            </div>
            </div>
            )}
             {!isTeacherView? <p1></p1> :
            <TeacherView data={data} isTeacherView={isTeacherView} toggleTeacherView={toggleTeacherView} 
            index={forTeacherView} changeIsDataChanged={changeIsDataChanged} isDataChanged={isDataChanged}/>
            }
        </>
    );

}