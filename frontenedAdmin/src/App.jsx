import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Signup from './AdminFrontend/Signup.jsx';
import Appbar from './Appbar.jsx';
import Signin from './AdminFrontend/Signin.jsx';
import Courses from './AdminFrontend/Courses.jsx';
import AddCourse from './AdminFrontend/AddCourse.jsx';
import Course from './AdminFrontend/Course.jsx';
import LandingMain from './LandingMain.jsx';
import UserSignup from './UserFrontend/UserSignup.jsx';
import UserSignin from './UserFrontend/UserSignin.jsx';
import {useEffect} from 'react';
import axios from 'axios';
import { RecoilRoot,useSetRecoilState} from 'recoil';
import {userState} from './store/atoms/user.js'
import {adminState} from './store/atoms/admin.js';
import RecoilizeDebugger from 'recoilize';
import {BASE_URL} from './utils/config.js';
import LandingUser from './UserFrontend/UserLanding.jsx';
import LandingAdmin from './AdminFrontend/AdminLanding.jsx';
import { MyCourses } from './UserFrontend/MyCourses.jsx';
import { UserCourses } from './UserFrontend/UserCourses.jsx';
import { SuperLogin } from './superfrontened/Login.jsx';
import { SuperSignup } from './superfrontened/Signup.jsx';
import  BillingInfo  from './UserFrontend/BillingInfo.jsx';
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
                          <Route path={"/"} element={<LandingMain />} />
                          <Route path={"/signin"} element={<SuperLogin />} />
                          <Route path={"/signup"} element={<SuperSignup />} />
                          <Route path={"/admin"} element={<LandingAdmin />} />
                          <Route path={"/admin/addcourse"} element={<AddCourse />} />
                          <Route path={"/admin/course/:courseId"} element={<Course />} />
                          <Route path={"/admin/courses"} element={<Courses />} />
                          <Route path={"/admin/signin"} element={<Signin />} />
                          <Route path={"/admin/signup"} element={<Signup />} />
                          <Route path={"/user"} element={<LandingUser />} />
                          <Route path={"/user/signup/"} element={<UserSignup />} />
                          <Route path={"/user/signin/"} element={<UserSignin />} />
                          <Route path={"/user/courses/"} element={<UserCourses />} />
                          <Route path={"/user/courses/purchased/"} element={<MyCourses />} />
                          <Route path={"/user/billingInfo"} element={<BillingInfo />} />
                      </Routes>
                  </Router>
          </div>
      </RecoilRoot>
  );
}


function InitUser() {
    const setAdmin = useSetRecoilState(adminState);
    const setUser = useSetRecoilState(userState);
  
    const init = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // No token found, reset both admin and user states
        setAdmin({ isLoading: false, adminEmail: null });
        setUser({ isLoading: false, userEmail: null });
        return;
      }
  
      try {
        // Check Admin Session
        const adminResponse = await axios.get(`${BASE_URL}/admin/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (adminResponse.data.username) {
          setAdmin({
            isLoading: false,
            adminEmail: adminResponse.data.username,
          });
          // Persist Admin Session
          localStorage.setItem("role", "admin");
          return; // Exit early if admin session is valid
        }
      } catch (e) {
        // Reset admin state if no valid admin session
        setAdmin({ isLoading: false, adminEmail: null });
      }
  
      try {
        // Check User Session
        const userResponse = await axios.get(`${BASE_URL}/users/u/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (userResponse.data.username) {
          setUser({
            isLoading: false,
            userEmail: userResponse.data.username,
          });
          // Persist User Session
          localStorage.setItem("role", "user");
          return; // Exit early if user session is valid
        }
      } catch (e) {
        // Reset user state if no valid user session
        setUser({ isLoading: false, userEmail: null });
      }
  
      // If no session is valid, reset both states and remove role
      localStorage.removeItem("role");
      setAdmin({ isLoading: false, adminEmail: null });
      setUser({ isLoading: false, userEmail: null });
    };
  
    useEffect(() => {
      init();
    }, []); // Run only on component mount
  
    return null; // No UI needed for this component
  }
  
  
export default App;