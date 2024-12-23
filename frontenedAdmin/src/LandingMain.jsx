import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import { IMAGE_URL } from "./utils/config";

const LandingMain = () => {
    const navigate = useNavigate()
    return <div>
        <Grid container style={{padding: "5vw"}}>
            <Grid item xs={12} md={6} lg={6}>
                <div style={{marginTop: 100}}>
                    <Typography variant={"h2"}>
                        Koodle
                    </Typography>
                    <Typography variant={"h5"}>
                        Learn & Create without limits. 
                    </Typography>
                    <div style={{display: "flex", marginTop: 20}}>
                        <div style={{marginRight: 10}}>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/admin")
                                }}
                            >Admin</Button>
                        </div>
                        <div>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/user")
                                }}
                            >User</Button>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}  style={{marginTop: 20}}>
                <img src={IMAGE_URL} width={"100%"} />
            </Grid>
        </Grid>
    </div>
}
export default LandingMain ;