import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';  
import {Card,Typography} from '@mui/material';  
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import {useSetRecoilState} from "recoil";
import {userState} from "../store/atoms/user.js";
function Signup() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);
    return (
        <div >
            {email}  
            {password}  
            <div style={{paddingTop:140,marginBottom:10,display:'flex',justifyContent:'center'}}>
                <Typography variant='h6'>
                    Welcome to Coursera.Sign Up to continue
                </Typography>
            </div>

            <div style={{display:'flex',justifyContent:'center'}}>           
                <Card variant="outlined" style={{width:400,padding:20}}>
                    <TextField 
                    onChange={
                        (e)=>{
                            console.log(e);
                            setEmail(e.target.value);
                        }
                    }
                        label="Username" 
                        variant="outlined" 
                        fullWidth = {true}
                    />
                    <br/><br/>
                    <TextField 
                    onChange={(e)=>{setPassword(e.target.value)}}
                        id={"password"}
                        label="Password" 
                        variant="outlined" 
                        type='password' 
                        fullWidth={true}

                    />
                    <br/><br/>
                    <Button variant="contained" onClick={() => {
                        // let username = document.getElementById('username').value;
                        // let password = document.getElementById('password').value;
                        // console.log(username, password);
                        // fetch('http://localhost:3000/admin/signup', {
                        // method: 'POST',
                        // headers: {
                        //     'Content-Type': 'application/json',
                        // },
                        // body: JSON.stringify({ username:email, password:password })
                        // })
                        // .then(res => res.json())
                        // .then(data => {
                        // })
                        axios.post('http://localhost:3000/admin/signup',{
                            username:email,
                            password:password
                        }).then(res=>{
                            const data = res.data;
                            localStorage.setItem('token',data.token);
                            setUser({userEmail:email,isLoading:false});
                            navigate("/");
                            // window.location="/"
                            console.log(data);
                        });
                        }}
                    >Sign Up</Button>
                </Card>
            </div>
        </div>
    )
  }

Signup.propTypes= {
    setUserEmail: PropTypes.func
};
  export default Signup;
