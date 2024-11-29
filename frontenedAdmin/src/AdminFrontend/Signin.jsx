import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';  
import { Card, Typography, Snackbar } from '@mui/material';  
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { adminState } from '../store/atoms/admin';
import { BASE_URL } from '../utils/config';
import axios from 'axios';
import useRoleRedirect from '../Hooks/useRoleRedirect';
function Signin() {
    // useRoleRedirect();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error message
    const [success, setSuccess] = useState(""); // State for success message
    const [open, setOpen] = useState(false); // State to control Snackbar visibility
    const [severity, setSeverity] = useState("success"); // State to control Snackbar severity
    const navigate = useNavigate();
    const [admin,setAdmin] = useRecoilState(adminState);

    const handleCloseSnackbar = () => {
        setOpen(false);
    };
   

    const handleSignin = async () => {
        try {
          const res = await axios.post(`${BASE_URL}/admin/login`, {}, {
            headers: {
              'username': email,
              'password': password,
            }
          });
          const data = res.data;
          localStorage.setItem('token', data.token);
          localStorage.setItem('adminId', data.adminId);
          
      
          setAdmin({
            adminEmail: email,
            isLoading: false,
          }); // Correctly set admin state here
        
          setSuccess("Login successful! Redirecting...");
          setSeverity("success");
          setOpen(true);
          navigate("/admin");
        } catch (err) {
            setError("Login failed! Check your credentials.");
            setSeverity("error");
            setOpen(true);
        }
        
       
      };
      

    return (
        <div>
            <div style={{ paddingTop: 140, marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h6'>
                    Welcome back! Sign In to continue
                </Typography>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>           
                <Card variant="outlined" style={{ width: 400, padding: 20 }}>
                    <TextField 
                        onChange={(e) => setEmail(e.target.value)}
                        label="Username" 
                        variant="outlined" 
                        fullWidth 
                    />
                    <br />
                    <br />
                    <TextField 
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password" 
                        variant="outlined" 
                        type='password' 
                        fullWidth 
                    />
                    <br />
                    <br />
                    <Button 
                        variant="contained" 
                        onClick={handleSignin}
                    >
                        Login
                    </Button>
                </Card>
            </div>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                message={success || error}
                severity={severity}
            />
        </div>
    )
}

export default Signin;
