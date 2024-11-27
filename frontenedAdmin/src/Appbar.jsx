import { Typography, Button, Snackbar, Alert } from '@mui/material';
import { Link, useLocation,useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from './store/atoms/user';
import { adminState } from './store/atoms/admin';
import { userEmailState } from './store/selectors/userEmail';
import { adminEmailState } from './store/selectors/adminEmail';
import { useState } from 'react';

function Appbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const adminEmail = useRecoilValue(adminEmailState);
  const setAdmin = useSetRecoilState(adminState);

  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);

  const [open, setOpen] = useState(false); // State to control Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message

  const handleAdminLogout = () => {
    localStorage.removeItem("token");
    setAdmin({
      isLoading: false,
      adminEmail: null,
    });
    setSnackbarMessage("Admin logged out successfully!");
    navigate("/admin/signin");
    setOpen(true);
  };

  const handleUserLogout = () => {
    localStorage.removeItem("token");
    setUser({
      isLoading: false,
      userEmail: null,
    });
    setSnackbarMessage("User logged out successfully!");
    navigate("/user/signin");
    setOpen(true);
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  
  const renderLinks = () => {
    if (adminEmail) {
        // If admin is logged in
        return (
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                <Button variant="text" component={Link} to="/admin/courses">Courses</Button>
                <Button variant="text" component={Link} to="/admin/addcourse">Add Courses</Button>
                <Button variant="contained" onClick={handleAdminLogout}>Logout</Button>
                <Typography variant="body1" style={{ marginLeft: '10px' }}>{adminEmail}</Typography>
                <img src="https://cdn-icons-png.flaticon.com/512/666/666201.png" alt="Admin Icon" style={{ width: '24px', height: '24px', marginRight: '5px' }} />
            </div>
        );
    } else if (userEmail) {
        // If user is logged in
        return (
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                <Button variant="text" component={Link} to="/user/courses">Courses</Button>
                <Button variant="text" component={Link} to="/user/courses/purchased/">My Courses</Button>
                <Button variant="contained" onClick={handleUserLogout}>Logout</Button>
                <div style={{ marginLeft: '10px' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/666/666201.png" alt="User  Icon" style={{ width: '24px', height: '24px', marginRight: '5px' }} />
            <Typography variant="body1">{userEmail}</Typography>
          </div>
            </div>
        );
    } else if (location.pathname.startsWith("/admin")) {
        // Admin login/signup
        return (
            <>  
                <Button variant="text" component={Link} to="/admin/signup">Signup</Button>
                <Button variant="text" component={Link} to="/admin/signin">Signin</Button>
            </>
        );
    } else if (location.pathname.startsWith("/user")) {
        // User login/signup
        return (
            <> 
                <Button variant="text" component={Link} to="/user/signup">Signup</Button>
                <Button variant="text" component={Link} to="/user/signin">Signin</Button>
            </>
        );
    } else {
        // Default (Landing page)
        return (
            <>
                <Button variant="text" component={Link} to="/signup">Signup</Button>
                <Button variant="text" component={Link} to="/signin">Signin</Button>
            </>
        );
    }
};

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <Typography variant="h4" style={{ fontFamily: 'Rancho', color: '#0E5FD4' }}>
        <Link to="/">Koodle</Link>
      </Typography>
      <div>{renderLinks()}</div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Appbar;
