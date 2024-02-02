import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Signup from './components/Signup.jsx';
import Appbar from './components/Appbar.jsx';
import Signin from './components/Signin.jsx';
import Courses from './components/Courses.jsx';
import AddCourse from './components/AddCourse.jsx';
import Course from './components/Course.jsx';
import Landing from './components/Landing.jsx';
import { useState ,useEffect} from 'react';
import axios from 'axios';

function App() {
  const [userEmail, setEmail]=useState(null);

  const init  = async ()=>{

    const response= await axios.get("http://localhost:3000/admin/me",{
      headers:{
        'Authorization':"Bearer "+localStorage.getItem('token')
      }
    })
      if(response.data.username){
        setEmail(response.data.username);
      }
    }

  useEffect(()=>{
    init();
  },[])

  return (
    <div style={{ backgroundColor: "lightcyan", height: '100vh', width: '100vw' }}>
      <Router>
        {/* <Appbar/>  */}
        <Appbar userEmail={userEmail} setUserEmail={setEmail} />
        <Routes>
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<Course />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/login" element={<Signin setEmail = {setEmail} />} />
          <Route path="/signup" element={<Signup setUserEmail = {setEmail} />} />
          <Route path="/" element={<Landing userEmail = {userEmail}/>} />

        </Routes>   
      </Router>
    </div>
  );
}

export default App;
