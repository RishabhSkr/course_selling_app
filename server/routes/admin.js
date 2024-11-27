import express from 'express';
import { Admin, Course } from '../database/db.js'; // Adjust the import path as needed
import jwt from 'jsonwebtoken';
import {authenticateJwt} from '../middleware/jwtAuth.js';
import {JWT_SECRET_ADMIN} from '../config.js';

const router = express.Router();

router.get('/me', authenticateJwt('admin'), async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.json({
      username: admin.username,
      id: admin._id
    });
  } catch (error) {
    console.error('Me endpoint error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.post('/signup', async (req, res) => {
  try {
    const { username, password, secret } = req.body;
    // check if the current token exists in the headers and belongs to another role

    // Validate admin secret first
    if (!secret || secret !== JWT_SECRET_ADMIN) {
      return res.status(403).json({ message: "Unauthorized: Invalid admin secret key!" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(403).json({ message: "Admin already exists!" });
    }

    // Create new admin
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    
    // Generate token
    const token = jwt.sign(
      { 
        username, 
        role: 'admin',
        id: newAdmin._id 
      }, 
      JWT_SECRET_ADMIN,
      { expiresIn: '1h' }
    );

    return res.status(201).json({
      message: "Admin created successfully!",
      token,
      username: newAdmin.username,
      adminId:newAdmin._id
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.post('/login', async (req, res) => {
  // Logic to log in admin
  const { username, password } = req.headers;
 // check if the current token exists in the headers and belongs to another role
 
  // Check if admin already exists
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET_ADMIN, { expiresIn: '1h' });
    res.json({ message: "Admin login successfully!",username,token,adminId:admin._id });
  } else {
    res.status(401).json({ message: "Invalid credentials!" });
  }
});

router.post('/courses', authenticateJwt('admin'), async (req, res) => {
  // Logic to create a course
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully!", courseID: course.id });
});

router.put('/courses/:courseId', authenticateJwt('admin'), async (req, res) => {
  // Logic to edit a course
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
  if (course) {
    res.json({ message: 'Course updated successfully!' });
  } else {
    res.status(404).json({ message: 'Course not found!' });
  }
});

router.get('/courses', authenticateJwt('admin'), async (req, res) => {
  // Logic to get all courses
  const courses = await Course.find({});
  res.json({ courses });
});

router.get('/course/:courseId', authenticateJwt('admin'), async (req, res) => {
  // get specific course
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.json({ course });
});
// logic to delete a course
router.delete('/courses/:courseId', authenticateJwt('admin'), async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findByIdAndDelete(courseId);
  return res.json({ course });
});

export default router;
