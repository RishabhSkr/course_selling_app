import { useEffect, useState } from "react";
import {Button, Card} from '@mui/material';  
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("token")
      },
    }).then((res) => {
      res.json().then(data => {
        setCourses(data.courses);
        console.log(data);
      })
    })
  }, []);

  return (
    
    <div style={{display:"flex", flexWrap : "wrap",justifyContent:"center"}} >
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>

  );
}

function Course(props) {
    return (
      <Card variant="outlined" style={{ margin: 10, width: 300,minHeight:200, display: 'flex', flexDirection: 'column' }}>
        <img src={props.course.imageLink} style={{ width:300}} alt={props.course.title} />
      <CardContent>
        <Typography variant="h5"  >
          {props.course.title}
        </Typography>
        <Typography>
          {props.course.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Price: {props.course.Price}
        </Typography>
      </CardContent>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px', marginTop: 'auto' ,marginBottom:10}}>
        <Button variant="contained"
          component={Link} to={`/course/${props.course.id}`}
        >
          EDIT
        </Button>
        <Button size="small" variant="contained" startIcon={<DeleteIcon />}>
          <Typography fontSize={14} fontWeight={500}>
            Delete
          </Typography>
        </Button>
      </div>
    </Card>
    );
  }
  
  
  Course.propTypes={
    course:PropTypes.object.isRequired,
  }
  
  
export default Courses;
