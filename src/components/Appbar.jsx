// Appbar.jsx
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom'; not working in in V6 react router dom
import { useNavigate } from "react-router-dom";
import  axios from 'axios';

function Appbar() {
  const navigate = useNavigate();
  const [userEmail,setEmail]=useState(null);

    useEffect(()=>{
      axios.get("http://localhost:3000/admin/me",{
        headers:{
          'Authorization':"Bearer "+localStorage.getItem('token')
        }
      }).then(res=>{
        const data = res.data;
        if(data.username){
          setEmail(data.username);
        }
        console.log(data);
      })
    },[])

    if(userEmail){
     
      return <div style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <div >
          <Typography  style={{ fontFamily:"cursive",fontWeight:700,color:"#0E5FD4"}}variant={"h4"}> Coursera</Typography>
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
               window.location = "/"
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
          >   Coursera
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
              navigate('/login')
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

export default Appbar;
