// Appbar.jsx
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
// import { useHistory } from 'react-router-dom'; not working in in V6 react router dom
import { useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {userState} from '../store/atoms/user';
import {userEmailState} from '../store/selectors/userEmail';
import {isUserLoading} from '../store/selectors/isUserLoading';
// import  axios from 'axios';
function Appbar() {
  const navigate = useNavigate();    
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);
  
  if(userLoading){
    return <></>
  }  
  if(userEmail){
     
      return <div style={{
        display: 'flex',
        justifyContent: 'space-between' 
      }}>
        <div >
          <Typography  style={{ fontFamily:"cursive",fontWeight:700,color:"#0E5FD4"}}variant={"h4"}> 
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Coursera</Link>
          </Typography>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: 10
        }}>
          <div style={{ marginRight: 10}}>
          
            <Button
              variant="text" 
              component={Link} to="/courses"
            >Courses</Button>
          
            <Button
             variant="text"  
              component={Link} to="/addcourse"
            >Add Courses</Button>

            <Button
              variant="contained" 
              onClick={()=>{
                localStorage.setItem("token",null);
                setUser({
                  isLoading: false,
                  userEmail:null
                });
                // window.location = "/"
              }}
            >Logout</Button>
          
          </div>

          <div>
            {userEmail}
          </div>

        </div>
      </div>
    }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <div>
        <Typography style={{ fontFamily:"cursive",fontWeight:700,color:"#0E5FD4"}}variant={"h4"}
          > 
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={'/'}>Coursera</Link>
        </Typography>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: 10
      }}>
        <div style={{ marginRight: 10 }}>

          <Button
            variant="contained" 
            onClick={()=>{  
              navigate('/signin')
            }}
          >Sign In</Button>
        
        </div>
        <div>
          <Button variant="contained"
          // component={Link} to="/signup"
          onClick={()=>{
              navigate('/signup') 
            }}
          >Sign Up</Button>
          {/* <Button variant="contained" onClick={handleSignup} to="/signup">Sign Up</Button> */}
        </div>
      </div>
    </div>
  );
}

Appbar.propTypes = {
  userEmail: PropTypes.string,
  setUserEmail: PropTypes.func
};
export default Appbar;
