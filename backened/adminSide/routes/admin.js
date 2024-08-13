const express = require('express');
const {Admin,User,Course} = require("../database/db");
const jwt = require('jsonwebtoken');
const {authenticateJwt,secret}=require('../middleware/jwtAuth');
const router = express.Router();

router.post('/signup',async (req, res) => {
    // logic to sign up admin
    const {username,password} = req.body;
    const admin = await Admin.findOne({username});
    if(admin){
      res.status(403).json({message: "Admin already exist!"});
    }else{
     
      const newAdmin = new Admin({username,password});
      await newAdmin.save()
      const token = jwt.sign({username,role:'admin',},secret,{expiresIn:'1h'});
      res.status(201).json({message: "Admin created successfully!",token});
    }
  });
  
  router.post('/login', async(req, res) => {
    // logic to log in admin
   const {username,password} = req.headers;
   const admin = await Admin.findOne({username,password});
    if(admin){
      const token = jwt.sign({username,role:'admin'},secret,{expiresIn:'1h'});
      res.json({message:"Admin login successfully!",token});
      }else{
        res.status(401).json({message :"Invalid Creadentials!"});
    }
  });
  
  router.post('/courses',authenticateJwt,async (req, res) => {
    // logic to create a course
    const course = new Course(req.body);
    await course.save();
    res.json({message : "Course created successfully!",courseID:course.id});
  
  });
  
  router.put('/courses/:courseId',authenticateJwt, async (req, res) => {
    // logic to edit a course
    const course = await Course.findByIdAndUpdate(req.params.courseId,req.body,{new : true});
    if(course){
       res.json({message : 'Course Updated Successfully!'});
    }else{
      res.status(404).json({message : 'Course Not Found!'});
    }
  
  });
  
  router.get('/courses',authenticateJwt,async (req, res) => {
    // logic to get all courses
    const course = await Course.find({}); // for all course if Published courses see pass published : true;
    res.json({course});
  });
  
  module.exports=router;