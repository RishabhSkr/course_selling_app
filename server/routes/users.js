import express from 'express';
import { User, Course } from '../database/db.js';
import jwt from 'jsonwebtoken';
import { authenticateJwt } from '../middleware/jwtAuth.js';
import { JWT_SECRET } from '../config.js';
const router = express.Router();

// user info (just a simple "me" endpoint to return superuser details)
router.get('/me', authenticateJwt('user'), async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: "Superuser not found" });
    }
    return res.json({
      username: user.username,
      id: user._id
    });
  } catch (error) {
    console.error('Me endpoint error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  // Check if the current token exists in the headers and belongs to another role

  const user = await User.findOne({ username });

  if (user) {
    res.status(403).json({ message: 'User already exists!' });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username: username, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User created successfully!', token });
  }
});

router.post('/login',async (req, res) => {
  const { username, password } = req.headers;

   // Check if the current token exists in the headers and belongs to another role
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

router.get('/courses', authenticateJwt('user'), async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
});

router.post('/courses/:courseId', authenticateJwt('user'), async (req, res) => {
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

router.get('/purchasedCourses', authenticateJwt('user'), async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: 'User not found!' });
  }
});

export default router;
