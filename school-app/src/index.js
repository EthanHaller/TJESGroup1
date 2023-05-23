import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import LoginPage from './components/LoginPage';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
