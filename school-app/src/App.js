import React from 'react';
import Events from './components/Events'

function App() {
  return (
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
    </BrowserRouter>
  );
}

export default App;