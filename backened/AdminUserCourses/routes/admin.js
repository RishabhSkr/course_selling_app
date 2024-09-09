import express from 'express';
import { Admin, Course } from '../database/db.js'; // Adjust the import path as needed
import jwt from 'jsonwebtoken';
import { authenticateJwt, secret } from '../middleware/jwtAuth.js';

const router = express.Router();

router.get('/me', authenticateJwt, async (req, res) => {
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    res.status(403).json({msg: "Admin doesnt exist"})
    return
  }
  res.json({
      username: admin.username
  })
});

router.post('/signup', async (req, res) => {
  // Logic to sign up admin
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(403).json({ message: "Admin already exists!" });
  } else {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = jwt.sign({ username, role: 'admin' }, secret, { expiresIn: '1h' });
    res.status(201).json({ message: "Admin created successfully!", token });
  }
});

router.post('/login', async (req, res) => {
  // Logic to log in admin
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, secret, { expiresIn: '1h' });
    res.json({ message: "Admin login successfully!", token });
  } else {
    res.status(401).json({ message: "Invalid credentials!" });
  }
});

router.post('/courses', authenticateJwt, async (req, res) => {
  // Logic to create a course
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully!", courseID: course.id });
});

router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
  // Logic to edit a course
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
  if (course) {
    res.json({ message: 'Course updated successfully!' });
  } else {
    res.status(404).json({ message: 'Course not found!' });
  }
});

router.get('/courses', authenticateJwt, async (req, res) => {
  // Logic to get all courses
  const courses = await Course.find({});
  res.json({ courses });
});

router.get('/course/:courseId', authenticateJwt, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.json({ course });
});

router.delete('/courses/:courseId', authenticateJwt, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findByIdAndDelete(courseId);
  return res.json({ course });
});

export default router;
