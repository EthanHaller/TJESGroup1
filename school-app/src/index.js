import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import NavigationBar from './components/NavigationBar';
import ClassSearch from './components/ClassSearch';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/:id" element={<NavigationBar />} >
        <Route path="/:id/home" element={<Home />} />
        <Route path="/:id/classes" element={<ClassSearch />} />
        {/* <Route path="/:id/students" element={} /> */}
        {/* <Route path="/:id/staff" element={} /> */}
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
