import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import {Card,CardContent,Typography,TextField,Button,LinearProgress,Grid} from '@mui/material';  
import PropTypes from 'prop-types';
import axios from 'axios';
function Course() {
    const {courseId}= useParams();  
    const [courses, setCourses] = useState([]);

    useEffect(()=>{
      axios.get("http://localhost:3000/admin/courses", {
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("token")
      },
    }).then(res=>{
      const data = res.data;
      setCourses(data);
    })

    },[]);

    let course = null;
  
    for(let i = 0; i<courses.length;++i){
      if(courses[i].id === Number(courseId)){
        course = courses[i];
      }
    }

  if(!course){
    return <div>
    Loading...
     <LinearProgress  />
    </div>
  }
  return <div>

      <GrayTopper title={course.title}/>
      <Grid container >
        <Grid item lg = {8} md = {12} sm ={12}>
          <UpdateCourse courses={courses} course = {course} setCourses ={setCourses}/>
        </Grid>
        <Grid item lg = {4} md = {12} sm ={12}>
          <CourseCard course = {course}/>
        </Grid>
    
      </Grid>
  </div>
  
}

function GrayTopper({title}) {
  return  <div style={{ zIndex: 0, top: 0, height: 250, width: "100vw", marginBottom: -250, background: "rgb(24,24,24)" }}>
            <div style={{ height: 250, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div>
                <Typography style={{ color: "white", fontWeight: 600 }} variant="h3" align="center">
                  {title}
                </Typography>
              </div>
            </div>
          </div>
}
function UpdateCourse(props){
  const [title,setTitle] = useState("");
  const [description,setdescription] = useState("");
  const [Price,setPrice] = useState("");
  const [image, setImage] = useState("");
  const course = props.course;
  
  // update state initial input field when props.course changes
  useEffect(()=>{
    setTitle(course.title || '');
    setdescription(course.description || '');
    setImage(course.imageLink || '');
  },[course])

  return(
      <div style={{display : "flex",justifyContent:"center"}}>          
            <Card  variant="outlined" style={{width:600,maxWidth:600,padding:10,marginTop:200}}>
              <Typography variant='h6'>
                  Update Course Details!
              </Typography>
              <br/><br/>
                    
                  <TextField 
                   onChange={
                      
                      (e)=>{
                          console.log(e);
                          setTitle(e.target.value);
                      }
                  }
                      label="Course Title" 
                      variant="outlined" 
                      fullWidth = {true}
                      value={title}
                  />
                  <br/><br/>
                  <TextField 
                  onChange={(e)=>{setdescription(e.target.value)}}
                     
                      label="Course Description" 
                      variant="outlined" 
                      type='text' 
                      fullWidth={true}
                      value={description}
                  />
                  <br/><br/>
                  <TextField 
                  onChange={(e)=>{setPrice(e.target.value)}}
                     
                      label="Course Price" 
                      variant="outlined"
                      type={Number}
                      fullWidth={true}
                      
                  />
                   <br/><br/>
                  <TextField 
                  onChange={(e)=>{setImage(e.target.value)}}
                     
                      label="ImageLink" 
                      variant="outlined"
                      type="text"
                      fullWidth={true}
                      value={image}
                  />
                  <br/><br/>
                  <Button
                      variant="contained"
                      onClick={() => {
                        axios.put(`http://localhost:3000/admin/courses/${course.id}`, {    
                          headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem("token")
                          },
                          body: JSON.stringify({
                            title: title,
                            description: description,
                            Price: Price,
                            imageLink: image,
                            published: true
                          })
                        })
                        .then(res => {
                            const data = res.data;
                            console.log(data);
                            // Update the courses array
                            let updatedCourses = [];
                            for (let i = 0; i < props.courses.length; i++) {
                              if (props.courses[i].id === course.id) {
                                updatedCourses.push({
                                  id: course.id,
                                  title: title,
                                  description: description,
                                  imageLink: image,
                                  Price: Price
                                });
                              } else {
                                updatedCourses.push(props.courses[i]);
                              }
                            }
                            // Update the state with the new courses array
                            props.setCourses(updatedCourses);
                          })
                      }}
                >Update COURSE
                </Button>
              </Card>
              
          </div>
  )
}

function CourseCard(props){
  return <div style={{display:"flex", justifyContent:"center"}}>
       <Card variant="outlined" style={{  margin: 10, width: 300, minHeight: 200 }}>
          <img src={props.course.imageLink}style={{width:300, height:200}} />
        <CardContent style={{alignItems:"center"}}>
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
      </Card>
    </div>
}
CourseCard.propTypes={
  course:PropTypes.object.isRequired,

}

GrayTopper.propTypes={
  title:PropTypes.object.isRequired,

}
UpdateCourse.propTypes={
  course:PropTypes.object.isRequired,
  courses:PropTypes.object.isRequired,
  setCourses:PropTypes.object.isRequired,

}

export default Course;