import { PropTypes } from 'prop-types';
import { Typography, Button, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';
import { userEmailState } from '../store/selectors/userEmail';
import { isUserLoading } from '../store/selectors/isUserLoading';
import { useState } from 'react';

function Appbar() {
  const navigate = useNavigate();
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);
  const [open, setOpen] = useState(false); // State to control Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({
      isLoading: false,
      userEmail: null
    });
    setSnackbarMessage("Logout successful!");
    setOpen(true);
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  if (userLoading) {
    return <></>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Typography
          className="font-effect-shadow-multiple"
          style={{ fontFamily: 'Rancho', fontWeight: 550, color: '#0E5FD4' }}
          variant="h2"
        >
          <Link to="/">Koodle</Link>
        </Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
        {userEmail ? (
          <>
            <div style={{ marginRight: 10 }}>
              <Button variant="text" component={Link} to="/courses">Courses</Button>
              <Button variant="text" component={Link} to="/addcourse">Add Courses</Button>
              <Button variant="contained" onClick={handleLogout}>Logout</Button>
            </div>
            <div>{userEmail}</div>
          </>
        ) : (
          <>
            <div style={{ marginRight: 10 }}>
              <Button variant="contained" onClick={() => navigate('/signin')}>Sign In</Button>
            </div>
            <div>
              <Button variant="contained" onClick={() => navigate('/signup')}>Sign Up</Button>
            </div>
          </>
        )}
      </div>
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

Appbar.propTypes = {
  userEmail: PropTypes.string,
  setUserEmail: PropTypes.func
};

export default Appbar;
