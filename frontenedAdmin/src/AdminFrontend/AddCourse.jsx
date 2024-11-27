import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';  
import { Card, Typography } from '@mui/material';  
import { useState } from 'react';
import { BASE_URL } from '../utils/config.js';
import useRoleRedirect from '../Hooks/useRoleRedirect.js';

function AddCourse() {
    useRoleRedirect();
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    const handleAddCourse = () => {

        // Validate price
        const priceNumber = parseFloat(price);
        if (isNaN(priceNumber)) {
            alert("Please enter a valid number for the price.");
            return;
        }
        const adminId = localStorage.getItem("adminId");
        axios.post(`${BASE_URL}/admin/courses/`, {
            title: title, 
            description: description,
            price: priceNumber, // Use the validated number
            imageLink: image,
            published: true,
            createdBy: adminId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
        .then(response => {
            console.log(response.data);
            alert("Course Added successfully!");
        })
        .catch(error => {
            console.error('There was a problem with the axios operation:', error);
            alert('Failed to add course: ' + error.message);
        });
    };

    return (
        <div>
            <div style={{ paddingTop: 140, marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h6'>
                    Welcome to Coursera. Add Courses!
                </Typography>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Card variant="outlined" style={{ width: 400, padding: 20 }}>
                    <TextField 
                        onChange={(e) => setTitle(e.target.value)}
                        label="Course Title" 
                        variant="outlined" 
                        fullWidth={true}
                    />
                    <br /><br />
                    <TextField 
                        onChange={(e) => setDescription(e.target.value)}
                        label="Course Description" 
                        variant="outlined" 
                        type='text' 
                        fullWidth={true}
                    />
                    <br /><br />
                    <TextField 
                        onChange={(e) => setPrice(e.target.value)}
                        label="Course Price" 
                        variant="outlined"
                        fullWidth={true}
                    />
                    <br /><br />
                    <TextField 
                        onChange={(e) => setImage(e.target.value)}
                        label="ImageLink" 
                        variant="outlined"
                        type="text"
                        fullWidth={true}
                    />
                    <br /><br />
                    <Button variant="contained" onClick={handleAddCourse}>
                        ADD COURSE
                    </Button>
                </Card>
            </div>
        </div>
    );
}

export default AddCourse;