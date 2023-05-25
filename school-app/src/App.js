import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import ClassSearch from './components/ClassSearch';
import StudentDirectoryPage from './components/StudentDirectoryComponents/StudentDirectoryPage'
import TeacherDirectoryPage from './components/TeacherDirectoryComponents/TeacherDirectoryPage'
import ClassPage from './components/ClassPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/:id" element={<NavigationBar />} >
          <Route path="/:id/home" element={<Home />} />
          <Route path="/:id/classes" element={<ClassSearch />} />
          <Route path="/:id/classes/:classId" element={<ClassPage />} />
          <Route path="/:id/students" element={<StudentDirectoryPage />} />
          <Route path="/:id/staff" element={<TeacherDirectoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;