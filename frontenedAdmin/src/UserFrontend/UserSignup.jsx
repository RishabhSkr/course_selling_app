import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';  
import { Card, Typography, Snackbar } from '@mui/material';  
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user.js';
import { BASE_URL } from '../utils/config';
import useRoleRedirect from '../Hooks/useRoleRedirect.js';

function UserSignup() {
    useRoleRedirect();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error message
    const [success, setSuccess] = useState(""); // State for success message
    const [open, setOpen] = useState(false); // State to control Snackbar visibility
    const [severity, setSeverity] = useState("success"); // State to control Snackbar severity
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);

    const handleCloseSnackbar = () => {
        setOpen(false);
    };

    const handleSignup = async () => {
        try {
            // const URL = `https://course-selling-app-a73w.onrender.com`
            const res = await axios.post(`${BASE_URL}/users/u/signup`, {
                username: email,
                password: password
            });
            const data = res.data;
            localStorage.setItem('token', data.token);
            setUser({ userEmail: email, isLoading: false });
            setSuccess("Sign up successful! Redirecting...");
            setSeverity("success");
            setOpen(true);
            setTimeout(() => navigate("/user"), 2000); // Redirect after showing success message
        } catch (err) {
            if (err.response && err.response.status === 403) {
                setError("User already exists!");
                setSeverity("error");
                setOpen(true);
            } else {
                setError("An unexpected error occurred!");
                setSeverity("error");
                setOpen(true);
            }
        }
    };

    return (
        <div>
            <div style={{ paddingTop: 140, marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h6'>
                    Welcome to Koodle. Sign Up to continue
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
                    <br/><br/>
                    <TextField 
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password" 
                        variant="outlined" 
                        type='password' 
                        fullWidth 
                    />
                    <br/><br/>
                    <Button 
                        variant="contained" 
                        onClick={handleSignup}
                    >
                        Sign Up
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


export default UserSignup;
