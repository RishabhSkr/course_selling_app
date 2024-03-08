import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';  
import {Card,Typography} from '@mui/material';  
// import { useNavigate } from "react-router-dom";
import { useState } from 'react';
function Signin() {
    // const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
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
                        onChange={
                            (e)=>{
                                console.log(e);
                                setEmail(e.target.value);
                            }
                        }
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
                                console.log(e);
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
                                window.location = "/"
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
