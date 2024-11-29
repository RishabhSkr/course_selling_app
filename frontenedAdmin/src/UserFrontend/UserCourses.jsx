import useRoleRedirect from "../Hooks/useRoleRedirect"
import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { BASE_URL } from "../utils/config.js";
import axios from "axios";
import PropTypes from 'prop-types';

export function UserCourses() {
  // useRoleRedirect();
    const [courses, setCourses] = useState([]);

    const init = async () => {
        const response = await axios.get(`${BASE_URL}/users/u/courses/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setCourses(response.data.courses)
    }

    useEffect(() => {
        init();
    }, []);

    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {courses.map((course,index) => {
            return <Course key={course.id || index} course={course} />}
        )}
    </div>
}

export function Course({course}) {
    const navigate = useNavigate();

    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        <img src={course.imageLink} style={{width: 300}} ></img>
        <div style={{display: "flex", justifyContent: "space-between", marginTop: 20}}>
            <Button variant="contained" size="large" onClick={() => {
                navigate("/user/billingInfo");
            }}>Buy Now</Button>
            <Typography variant="h5">Rs.{course.price}</Typography>
        </div>
    </Card>

}
Course.propTypes = {
    course: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageLink: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired
    }).isRequired
};

export default UserCourses;