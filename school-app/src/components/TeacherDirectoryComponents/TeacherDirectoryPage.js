
import SearchBar from './SearchBar';
import './TeacherDirectory.css';
import { useOutletContext } from 'react-router-dom';
export default function TeacherDirectory() {
    const currentUser = useOutletContext();

        return (
            <>
            <h1>Staff Directory</h1>
            <div className='searchArea'>
            <SearchBar currentUser={currentUser}/>
            </div>
            </>
        );
}