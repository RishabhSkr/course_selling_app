import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';  
import { Card, Typography, Snackbar } from '@mui/material';  
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';
import axios from 'axios';

function Signin() {
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

    const handleSignin = async () => {
        const URL = `https://course-selling-app-a73w.onrender.com`
        try {
            const res = await axios.post(`${URL}/admin/login`, {}, {
                headers: {
                    'username': email,
                    'password': password
                }
            });
            const data = res.data;
            localStorage.setItem('token', data.token);
            setUser({ userEmail: email, isLoading: false });
            setSuccess("Login successful! Redirecting...");
            setSeverity("success");
            setOpen(true);
            setTimeout(() => navigate("/"), 2000); // Redirect after showing success message
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("Invalid username or password!");
                setSeverity("error");
                setOpen(true);
            } else {
                setError("An unexpected error occured! Try again");
                setSeverity("error");
                setOpen(true);
            }
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
