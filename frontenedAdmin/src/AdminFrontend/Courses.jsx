import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button, Card, Checkbox, FormControlLabel } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { coursesState } from '../store/atoms/course';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import { adminEmailState } from '../store/selectors/adminEmail';
import useRoleRedirect from '../Hooks/useRoleRedirect';

function Courses() {
  useRoleRedirect();
  const [courses, setCourses] = useRecoilState(coursesState);
  const [showMyCourses, setShowMyCourses] = useState(false);
  const navigate = useNavigate();
  const isUser = useRecoilValue(adminEmailState);
  const adminId = localStorage.getItem("adminId");

  useEffect(() => {
    if (!isUser) {
      // If the user is not present, navigate to the landing page
      navigate('/');
    }
  }, [isUser, navigate]);

  useEffect(() => {
    //  const URL = `https://course-selling-app-a73w.onrender.com`
    fetch(`${BASE_URL}/admin/courses`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses);
      });
  }, [setCourses]);

  // If user is not present, don't render the component
  if (!isUser) {
    return null;
  }

  // Filter courses based on the checkbox state
  const filteredCourses = showMyCourses
    ? courses.filter((course) => course.createdBy === adminId)
    : courses;

  // If user is present, show the courses
  return (
    <div>
      <FormControlLabel
        style={{
          display: 'flex',
          justifyContent: 'flex-end', // Aligns items to the right
          alignItems: 'center',
          padding: '20px',
          width: '100%' // Ensures it takes the full width of the parent
        }}
        control={
          <Checkbox
            checked={showMyCourses}
            onChange={(e) => setShowMyCourses(e.target.checked)}
            name="showMyCourses"
            color="primary"
          />
        }
        label="Show My Courses"
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredCourses.map((course, index) => (
          <Course key={course._id || index} course={course} />
        ))}
      </div>
    </div>
  );
}

function Course({ course }) {
  const navigate = useNavigate();
  const [, setCourses] = useRecoilState(coursesState);
  console.log(course);

  const handleDeleteCourse = (courseId) => {
    // const URL = `https://course-selling-app-a73w.onrender.com`
    fetch(`${BASE_URL}/admin/courses/${courseId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then(() => {
        // Update the local state by removing the deleted course
        setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  };
  const adminId = localStorage.getItem("adminId");
  return (
    <Card variant="outlined" style={{ margin: 10, width: 300, minHeight: 200, display: 'flex', flexDirection: 'column' }}>
      <img src={course.imageLink} style={{ width: 300 }} alt={course.title} />
      <CardContent>
        <Typography variant="h5">{course.title}</Typography>
        <Typography>{course.description}</Typography>
        <Typography variant="body2" color="textSecondary">
          Price: {course.price}
        </Typography>
      </CardContent>
      {course.createdBy === adminId && (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px', marginTop: 'auto', marginBottom: 10 }}>
          <Button variant="contained" size="large" onClick={() => navigate("/course/" + course._id)}>
            Edit
          </Button>

          <Button size="small" variant="contained" startIcon={<DeleteIcon />} onClick={() => handleDeleteCourse(course._id)}>
            <Typography fontSize={14} fontWeight={500}>
              Delete
            </Typography>
          </Button>
        </div>
      )}
    </Card>
  );
}

Course.propTypes = {
  course: PropTypes.object.isRequired,
};

export default Courses;
