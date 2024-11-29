import { Typography,Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { ADMIN_IMAGE_URL } from '../utils/config';
import { adminEmailState } from '../store/selectors/adminEmail';
import useRoleRedirect from '../Hooks/useRoleRedirect';

export const LandingAdmin = () => {
        // useRoleRedirect();
        
        const adminEmail = useRecoilValue(adminEmailState)
        const navigate = useNavigate();
        return <Grid container style={{padding: "5vw"}}>
        <Grid item xs={12} md={6} lg={6}>
            <div style={{marginTop: 100}}>
                <Typography variant={"h2"}>
                    Koodle Admin
                </Typography>
                <Typography variant={"h5"}>
                    A place to learn, earn and grow
                </Typography>
                {adminEmail==null &&  (
                    <div style={{display: "flex", marginTop: 20}}>
                        <div style={{marginRight: 10}}>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/admin/signup")
                                }}
                            >Signup</Button>
                        </div>
                            <div>
                                <Button
                                    size={"large"}
                                    variant={"contained"}
                                    onClick={() => {
                                        navigate("/admin/signin")
                                    }}
                                >Signin</Button>
                            </div>
                        </div>
                        )}
            </div>
        </Grid>
            <Grid item xs={12} md={6} lg={6}  style={{marginTop: 20}}>
                <img src={ADMIN_IMAGE_URL} width={"100%"} />
            </Grid>
        </Grid> 
    }

export default LandingAdmin;
