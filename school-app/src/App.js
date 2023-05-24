import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClassPage from './components/ClassPage';
import ClassSearch from './components/ClassSearch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/class/:classId" element={<ClassPage />} />
        <Route path="/search" element={<ClassSearch />} />
        <Route path="/" element={<ClassSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
