import SearchBar from './SearchBar';
import './Directory.css';
import { useOutletContext } from 'react-router-dom';
export default function StudentDirectory() {
    const currentUser = useOutletContext();

        return (
            <>
            <div className='searchArea'>
            <SearchBar currentUser={currentUser}/>
            </div>
            </>
        );
}