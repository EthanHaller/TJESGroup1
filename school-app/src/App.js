import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import ClassSearch from './components/ClassSearch';
import StudentDirectoryPage from './components/StudentDirectoryComponents/StudentDirectoryPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/:id" element={<NavigationBar />} >
          <Route path="/:id/home" element={<Home />} />
          <Route path="/:id/classes" element={<ClassSearch />} />
          <Route path="/:id/students" element={<StudentDirectoryPage />} />
          {/* <Route path="/:id/staff" element={} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;