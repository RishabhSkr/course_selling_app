import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';  
import {Card,Typography} from '@mui/material';  
import {useState} from 'react';

function AddCourse(){
    const [title,setTitle] = useState("");
    const [description,setdescription] = useState("");
    const [price,setPrice] = useState(0);
    const [image, setImage] = useState("");

    const URL = `https://course-selling-app-a73w.onrender.com`
    return(
        <div>
            <div style={{paddingTop:140,marginBottom:10,display:'flex',justifyContent:'center'}}>
                <Typography variant='h6'>
                    Welcome to Coursera.Add Courses!
                </Typography>
            </div>

            <div style={{display:'flex',justifyContent:'center'}}>           
                <Card variant="outlined" style={{width:400,padding:20}}>
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
                    />
                    <br/><br/>
                    <TextField 
                    onChange={(e)=>{setdescription(e.target.value)}}
                       
                        label="Course Description" 
                        variant="outlined" 
                        type='text' 
                        fullWidth={true}

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

                    />
                    <br/><br/>
                    <Button variant="contained" onClick={() => {
                        fetch(`${URL}/admin/courses/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer ' + localStorage.getItem("token")
                        },
                            body: JSON.stringify({ 
                                title:title, 
                                description:description,
                                price:price,
                                imageLink:image,
                                published:true
                            })
                        })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            alert("Course Added successfully!");
                        }

                        )}}
                    >ADD COURSE</Button>
                </Card>
            </div>

        </div>
    )
}
  

export default AddCourse;