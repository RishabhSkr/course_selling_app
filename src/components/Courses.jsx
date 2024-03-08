import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Button, Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { coursesState } from '../store/atoms/course';
import PropTypes from 'prop-types';

function Courses() {
  const [courses, setCourses] = useRecoilState(coursesState);

  useEffect(() => {
    fetch('http://localhost:3000/admin/courses', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses);
        console.log(data);
      });
  }, [setCourses]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
}

function Course({ course }) {
  const [, setCourses] = useRecoilState(coursesState);

  const handleDeleteCourse = (courseId) => {
  
    fetch(`http://localhost:3000/admin/courses/${courseId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the local state by removing the deleted course
        setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
        console.log(data);
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  };
  
  return (
    <Card variant="outlined" style={{ margin: 10, width: 300, minHeight: 200, display: 'flex', flexDirection: 'column' }}>
      <img src={course.imageLink} style={{ width: 300 }} alt={course.title} />
      <CardContent>
        <Typography variant="h5">{course.title}</Typography>
        <Typography>{course.description}</Typography>
        <Typography variant="body2" color="textSecondary">
          Price: {course.Price}
        </Typography>
      </CardContent>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px', marginTop: 'auto', marginBottom: 10 }}>
        <Button variant="contained" component={Link} to={`/course/${course.id}`}>
          EDIT
        </Button>
        <Button size="small" variant="contained" startIcon={<DeleteIcon />} 
          onClick={()=>{
            handleDeleteCourse(course.id)
          }}>
          <Typography fontSize={14} fontWeight={500}>
            Delete
          </Typography>
        </Button>
      </div>
    </Card>
  );
}
  
  Course.propTypes = {
    course: PropTypes.object.isRequired,
  };
  
  
export default Courses;
