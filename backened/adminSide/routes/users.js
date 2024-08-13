const express = require('express');
const {Admin,User,Course} = require("../database/db");
const jwt = require('jsonwebtoken');
const {authenticateJwt}=require('../middleware/jwtAuth');
const router = express.Router();


router.post('/users/signup', async (req, res) => {
    // logic to sign up user
      const {username,password} = req.body;
      const user = await User.findOne({username});
      if(user){
        res.status(403).json({message: "user already exist!"});
      }else{
        const newUser = new User({username,password});
        await newUser.save();
        const token = jwt.sign({username:username,role:'user'},secret,{expiresIn:'1h'});
        res.status(201).json({message: "User created successfully!",token});
      }
  });
  
  router.post('/users/login', async (req, res) => {
    const { username, password } = req.headers;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: 'user' }, secret, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
  
  router.get('/users/courses',authenticateJwt,async (req, res) => {
    // logic to list all courses
    const courses = await Course.find({published:true});
    res.json({courses})
  });
  
  router.post('/users/courses/:courseId', authenticateJwt,async (req, res) => {
    // logic to purchase a course
    const course =await Course.findById(req.params.courseId);
    console.log(course);
    if(course){
      const user = await User.findOne({username : req.user.username});
        if(user){
          user.purchasedCourses.push(course);
          await user.save();
          res.json({message : 'Course purchased succesfully!'});
        }else{
          res.json({message : 'User Not Found!'});
        }
    }else{
      res.status(404).json({message: "Course not found!"});
    }
  
  });
  

  router.get('/users/purchasedCourses', authenticateJwt,async (req, res) => {
    // logic to view purchased courses
    const user = await User.findOne({username:req.user.username}).populate('purchasedCourses');
    if(user){
      res.json({purchasedCourses:user.purchasedCourses || []});
    }else{
      res.status(403).json({message : 'User not found!'});
    }
  });

  module.exports=router; 