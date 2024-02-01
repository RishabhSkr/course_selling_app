import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Signup from './components/Signup.jsx';
import Appbar from './components/Appbar.jsx';
import Signin from './components/Signin.jsx';
import Courses from './components/Courses.jsx';
import AddCourse from './components/AddCourse.jsx';
import Course from './components/Course.jsx';
// import { useState } from 'react';



function App() {
  return (
    <div style={{ backgroundColor: "lightcyan", height: '100vh', width: '100vw' }}>
      <Router>
        <Appbar /> 
        <Routes>
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<Course />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>   
      </Router>
    </div>
  );
}

export default App;
