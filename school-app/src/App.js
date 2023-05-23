import React from 'react';
import NavigaionBar from './components/NavigationBar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <NavigaionBar />
      <Outlet />
    </React.Fragment>
  );
}

export default App;
