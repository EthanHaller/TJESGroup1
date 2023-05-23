import React from 'react';
<<<<<<< HEAD
import LoginPage from './components/LoginPage';

function App() {
  return (
    <LoginPage />
=======
import NavigaionBar from './components/NavigationBar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <NavigaionBar />
      <Outlet />
    </React.Fragment>
>>>>>>> navigationBar
  );
}

export default App;
