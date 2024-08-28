import express from 'express';
import { User, Course } from '../database/db.js';
import jwt from 'jsonwebtoken';
import { authenticateJwt } from '../middleware/jwtAuth.js';

const router = express.Router();
const secret = 's3cr3t'; // Make sure this matches the secret defined in jwtAuth.js

router.post('/users/signup', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: 'User already exists!' });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username: username, role: 'user' }, secret, { expiresIn: '1h' });
    res.status(201).json({ message: 'User created successfully!', token });
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

router.get('/users/courses', authenticateJwt, async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
});

router.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: 'Course purchased successfully!' });
    } else {
      res.status(403).json({ message: 'User Not Found!' });
    }
  } else {
    res.status(404).json({ message: 'Course not found!' });
  }
});

router.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: 'User not found!' });
  }
});

export default router;
