import SearchBar from './SearchBar';
import './StudentDirectory.css';
import { useOutletContext } from 'react-router-dom';
export default function StudentDirectory() {
    const currentUser = useOutletContext();

        return (
            <>
            <h1>Student Directory</h1>
            <div className='searchArea'>
            <SearchBar currentUser={currentUser}/>
            </div>
            </>
        );
}