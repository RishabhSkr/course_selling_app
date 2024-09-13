import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Signup from './components/Signup.jsx';
import Appbar from './components/Appbar.jsx';
import Signin from './components/Signin.jsx';
import Courses from './components/Courses.jsx';
import AddCourse from './components/AddCourse.jsx';
import Course from './components/Course.jsx';
import Landing from './components/Landing.jsx';
import {useEffect} from 'react';
import axios from 'axios';
import { RecoilRoot,useSetRecoilState} from 'recoil';
import {userState} from './store/atoms/user.js'
import RecoilizeDebugger from 'recoilize';


function App() {
  return (
      <RecoilRoot>
      <RecoilizeDebugger/>
          <div style={{width: "100vw",
              height: "100vh",
              backgroundColor: "#eeeeee"}}
          >
                  <Router>
                      <Appbar />
                      <InitUser />
                      <Routes>
                          <Route path={"/addcourse"} element={<AddCourse />} />
                          <Route path={"/course/:courseId"} element={<Course />} />
                          <Route path={"/courses"} element={<Courses />} />
                          <Route path={"/signin"} element={<Signin />} />
                          <Route path={"/signup"} element={<Signup />} />
                          <Route path={"/"} element={<Landing />} />
                      </Routes>
                  </Router>
          </div>
      </RecoilRoot>
  );
}


function InitUser() {
  const setUser = useSetRecoilState(userState);
   const URL = `https://course-selling-app-a73w.onrender.com`
  const init = async() => {
      try {
          const response = await axios.get(`${URL}/admin/me`, {
              headers: {
                  "Authorization": "Bearer " + localStorage.getItem("token")
              }
          })
          if (response.data.username) {
              setUser({
                  isLoading: false,
                  userEmail: response.data.username
              })
          } else {
              setUser({
                  isLoading: true,
                  userEmail: null
              })
          }
      } catch (e) {

          setUser({
              isLoading: false,
              userEmail: null
          })
      }
  };

  useEffect(() => {
      init();
  });

  return <></>
}

export default App;