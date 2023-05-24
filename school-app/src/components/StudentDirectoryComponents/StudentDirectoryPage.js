import {useEffect, useState} from 'react';
import SearchBar from './SearchBar';
import './Directory.css';
export default function StudentDirectory() {

    // const [students, setStudents] = useState([])
    // useEffect(() => {
    //     getStudents()
    // }, [])
    
    // useEffect(() => {
    // }, [students])
    // function getStudents() {
    //     const studentCollectionRef = collection(db, 'students')
    //     getDocs(studentCollectionRef)
    //     .then(response => {
    //         const students = response.docs.map(doc => ({
    //             data: doc.data(), 
    //             id: doc.id,
    //         }))
    //         setStudents(students)
    //     }).catch(error => console.log(error.message))
    // }
        return (
            <>

            <div className='searchArea'>
            <SearchBar/>
            </div>
            </>
        );
}