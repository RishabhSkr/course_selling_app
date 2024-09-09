import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';  
import {Card,Typography} from '@mui/material';  
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';
import { useState } from 'react';
import axios from 'axios';

function Signin() {
    const navigate = useNavigate();
    const [email,setEmail] = useRecoilState(userState);
    const [password,setPassword] = useState("");
    const setUser= useSetRecoilState(userState);
    return (

        <div >
            <div style={{paddingTop:140,marginBottom:10,display:'flex',justifyContent:'center'}}>
                <Typography variant='h6'>
                    Welcome back!.Sign In to continue
                </Typography>
            </div>

            <div style={{display:'flex',justifyContent:'center'}}>           
                <Card variant="outlined" style={{width:400,padding:20}}>
                    <TextField 
                        onChange={(e)=>{
                            setEmail(e.target.value);
                        }}
                        id="outlined-basic" 
                        label="Username" 
                        variant="outlined" 
                        fullWidth = {true} 

                    />
                    <br/>
                    <br/>
                    <TextField 
                    onChange={
                            (e)=>{
                                setPassword(e.target.value);
                            }
                        }
                        id="outlined-basic" 
                        label="Password" 
                        variant="outlined" 
                        type='password' 
                        fullWidth={true}

                    />
                    <br/>
                    <br/>
                   <Button variant="contained" onClick={() => {
                       fetch('http://localhost:3000/admin/login',{
                            method:'POST',
                            headers:{
                                username:email,
                                password:password
                            }
                        }).then(res=>{
                            res.json().then(data=>{
                                localStorage.setItem('token',data.token);
                                // window.location = "/"
                                setUser({
                                    userEmail:email,
                                    isLoading:false
                                })
                                navigate("/");
                                console.log(data);
                            })
                        });
                    }}
                    >Login</Button>
                </Card>
            </div>

        </div>
        
    )
  }

  export default Signin;
