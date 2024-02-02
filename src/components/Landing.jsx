import { Typography,Grid } from '@mui/material';
import Button from '@mui/material/Button';
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom'; not working in in V6 react router dom
import { useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';
export const Landing = ({userEmail}) => {
        const navigate = useNavigate()
        return <Grid container style={{padding: "5vw"}}>
        <Grid item xs={12} md={6} lg={6}>
            <div style={{marginTop: 100}}>
                <Typography variant={"h2"}>
                    Coursera Admin
                </Typography>
                <Typography variant={"h5"}>
                    A place to learn, earn and grow
                </Typography>
                {!userEmail && <div style={{display: "flex", marginTop: 20}}>
                    <div style={{marginRight: 10}}>
                        <Button
                            size={"large"}
                            variant={"contained"}
                            onClick={() => {
                                navigate("/signup")
                            }}
                        >Signup</Button>
                    </div>
                        <div>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/signin")
                                }}
                            >Signin</Button>
                        </div>
                    </div>}
                </div>
            <div>
            </div>
        </Grid>
            <Grid item xs={12} md={6} lg={6}  style={{marginTop: 20}}>
                <img src={"https://i.ytimg.com/vi/RtCKI27Uao4/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBNt5G7wIaevPAkAxpv0uFunitTUg  "} width={"100%"} />
            </Grid>
        </Grid> 
    }
Landing.propTypes = {
    userEmail : PropTypes.string
}
export default Landing;
