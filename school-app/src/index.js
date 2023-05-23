import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App';
import LoginPage from './components/LoginPage';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<LoginPage/>} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
