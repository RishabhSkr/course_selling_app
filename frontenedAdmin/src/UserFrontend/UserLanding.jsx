import { Typography,Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { userEmailState } from '../store/selectors/userEmail';
import { useRecoilValue } from 'recoil';
import { PropTypes } from 'prop-types';
import { USER_IMAGE_URL } from '../utils/config';
// import useRoleRedirect from '../Hooks/useRoleRedirect';

export const LandingUser = () => {
        // useRoleRedirect();
        const userMail = useRecoilValue(userEmailState)
        const navigate = useNavigate();
        return <Grid container style={{padding: "5vw"}}>
        <Grid item xs={12} md={6} lg={6}>
            <div style={{marginTop: 100}}>
                <Typography variant={"h2"}>
                    Koodle User
                </Typography>
                <Typography variant={"h5"}>
                    A place to learn, earn and grow
                </Typography>
                {userMail==null &&  (
                    <div style={{display: "flex", marginTop: 20}}>
                        <div style={{marginRight: 10}}>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/user/signup")
                                }}
                            >Signup</Button>
                        </div>
                            <div>
                                <Button
                                    size={"large"}
                                    variant={"contained"}
                                    onClick={() => {
                                        navigate("/user/signin")
                                    }}
                                >Signin</Button>
                            </div>
                        </div>
                        )}
            </div>
        </Grid>
            <Grid item xs={12} md={6} lg={6}  style={{marginTop: 20}}>
                <img src={USER_IMAGE_URL} width={"100%"} />
            </Grid>
        </Grid> 
    }
LandingUser.propTypes = {
    userEmail : PropTypes.string
}
export default LandingUser;
