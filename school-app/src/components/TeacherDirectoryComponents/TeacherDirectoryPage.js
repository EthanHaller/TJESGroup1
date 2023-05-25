
import SearchBar from './SearchBar';
import './Directory.css';
import { useOutletContext } from 'react-router-dom';
export default function TeacherDirectory() {
    const currentUser = useOutletContext();

        return (
            <>

            <div className='searchArea'>
            <SearchBar currentUser={currentUser}/>
            </div>
            </>
        );
}