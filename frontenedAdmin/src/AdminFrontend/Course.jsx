import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import {Card,CardContent,Typography,TextField,Button,LinearProgress,Grid} from '@mui/material';  
import axios from 'axios';
import { courseState } from "../store/atoms/course";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import { courseTitle, coursePrice, isCourseLoading, courseImage, courseDescription } from "../store/selectors/course";
import { BASE_URL } from "../utils/config";
import useRoleRedirect from "../Hooks/useRoleRedirect";

function Course() {
  
  // useRoleRedirect();

    let { courseId } = useParams();
    const setCourse = useSetRecoilState(courseState);
    const courseLoading = useRecoilValue(isCourseLoading);
    useEffect(() => {
    // const URL = `https://course-selling-app-a73w.onrender.com`
    axios.get(`${BASE_URL}/admin/course/${courseId}`, {
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("token")
      },
    })
    .then(res => {
      // console.log("API Response courses:", res.data);
      setCourse({isLoading: false, course: res.data.course});
    })
    .catch(error => {
      console.error("API Error:", error);
      setCourse({isLoading: false, course: null});
    
    });
  }, [courseId, setCourse]);

  if(courseLoading){
    return <div>
    Loading...
     <LinearProgress  />
    </div>
  }
  return <div>

      <GrayTopper />
      <Grid container >
        <Grid item lg = {8} md = {12} sm ={12}>
          <UpdateCourse />
        </Grid>
        <Grid item lg = {4} md = {12} sm ={12}>
          <CourseCard />
        </Grid>
      </Grid>
  </div>
  
}

function GrayTopper() {
  const title = useRecoilValue(courseTitle);
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
function UpdateCourse(){
  const {courseId} = useParams();
  const [courseDetails, setCourse] = useRecoilState(courseState);
  const [title, setTitle] = useState(courseDetails.course.title);
  const [description, setDescription] = useState(courseDetails.course.description);
  const [image, setImage] = useState(courseDetails.course.imageLink);
  const [Price, setPrice] = useState(courseDetails.course.price);
  //  const URL = `https://course-selling-app-a73w.onrender.com`
  // // update state initial input field when props.course changes
  // useEffect(()=>{
  //   setTitle(course.title || '');
  //   setdescription(course.description || '');
  //   setImage(course.imageLink || '');
  // },[course])

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
                          setTitle(e.target.value);
                      }
                  }   type="text"
                      label="Course Title" 
                      variant="outlined" 
                      fullWidth = {true}
                      value={title}

                  />
                  <br/><br/>
                  <TextField 
                  onChange={(e)=>{setDescription(e.target.value)}}
                     
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
                        
                        axios.put(`${BASE_URL}/admin/courses/${courseId}`, 
                          {
                            title: title,
                            description: description,
                            price: Price,
                            imageLink: image,
                            published: true
                          },
                          {
                            headers: {
                              'Authorization': 'Bearer ' + localStorage.getItem("token"),
                              'Content-Type': 'application/json' // Specify the content type
                            }
                          }
                        )
                        .then( res => {
                            // Update the courses array
                            let updatedCourse = {
                              id: courseDetails.course.id,
                              title: title,
                              description: description,
                              imageLink: image,
                              price: Price,
                            };
                            // Update the state with the new courses array
                            setCourse({ course: updatedCourse, isLoading: false });
                        })
                        .catch(error => {
                            console.error('Error updating course:', error);
                        });
                      }}
                >Update Course
                </Button>
              </Card>
          </div>
  )
}

function CourseCard(){
  const title = useRecoilValue(courseTitle);
  const imageLink = useRecoilValue(courseImage);
  const Price = useRecoilValue(coursePrice);
  const description = useRecoilValue(courseDescription);
  return <div style={{display:"flex", justifyContent:"center"}}>
       <Card variant="outlined" style={{  margin: 10, width: 300, minHeight: 200 }}>
          <img src={imageLink}style={{width:300, height:200}} />
        <CardContent style={{alignItems:"center"}}>
        <Typography variant="h5"  >
          {title}
        </Typography>
        <Typography>
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Price: Rs.{Price}
        </Typography>
        </CardContent>
      </Card>
    </div>
}


export default Course;