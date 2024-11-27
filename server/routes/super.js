import express from 'express';
import { SuperUser, Admin, Course, User } from '../database/db.js'; 
import { authenticateJwt } from '../middleware/jwtAuth.js';
import { JWT_SECRET_SUPER } from '../config.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Superuser info (just a simple "me" endpoint to return superuser details)
router.get('/me', authenticateJwt('superuser'), async (req, res) => {
  try {
    const superuser = await SuperUser.findOne({ username: req.user.username });
    if (!superuser) {
      return res.status(404).json({ message: "Superuser not found" });
    }
    return res.json({
      username: superuser.username,
      id: superuser._id
    });
  } catch (error) {
    console.error('Me endpoint error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// Apply the authentication middleware to the route
router.post('/signup', async (req, res) => {
  try {
    const { username, password, secret } = req.body;
    console.log('Super secret key:', typeof(JWT_SECRET_SUPER), typeof(secret));

    // Validate super secret key
    if (!secret || secret !== JWT_SECRET_SUPER) {
      return res.status(403).json({ message: "Unauthorized: Invalid super secret key!" });
    }

    // Check if the user is already an admin or user
    const isSuperAdmin = await Admin.findOne({ username });
    const isSuperUser = await User.findOne({ username });

    if (isSuperAdmin || isSuperUser) {
      return res.status(403).json({ message: "Unauthorized: Invalid superuser!" });
    }

    // Check if superuser already exists
    const existingSuper = await SuperUser.findOne({ username });
    if (existingSuper) {
      return res.status(403).json({ message: "Superuser already exists!" });
    }

    const newSuper = new SuperUser({ username, password: password });
    await newSuper.save();

    // Generate token
    const token = jwt.sign(
      {
        username,
        role: 'superuser',
        id: newSuper._id,
      },
      JWT_SECRET_SUPER,
      { expiresIn: '1h' } 
    );

    return res.status(201).json({
      message: "Superuser created successfully!",
      token,
      username: newSuper.username
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.post('/login', async (req, res) => {
  // Logic to log in admin
  const { username, password } = req.headers;
  const admin = await SuperUser.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'super' }, JWT_SECRET_SUPER, { expiresIn: '1h' });
    res.json({ message: "Super login successfully!", token });
  } else {
    res.status(401).json({ message: "Invalid credentials!" });
  }
});

// View all admins
router.get('/admins', authenticateJwt('superuser'), async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.json({ admins });
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete an admin (and their courses)
router.delete('/admins/:adminId', authenticateJwt('superuser'), async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Delete all courses created by this admin
    await Course.deleteMany({ createdBy: adminId }); // Assuming 'createdBy' exists on the Course schema

    // Delete the admin
    await Admin.findByIdAndDelete(adminId);
    res.json({ message: "Admin and their courses have been deleted successfully" });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// View all courses
router.get('/courses', authenticateJwt('superuser'), async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// View courses created by a specific admin
router.get('/courses/admin/:adminId', authenticateJwt('superuser'), async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const courses = await Course.find({ createdBy: adminId }); // Assuming 'createdBy' exists on the Course schema
    res.json({ courses });
  } catch (error) {
    console.error('Error fetching admin\'s courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// View number of users enrolled in a specific course created by an admin
router.get('/courses/:courseId/enrolledUsers', authenticateJwt('superuser'), async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found!' });
    }

    // Get users enrolled in the course
    const users = await User.find({ purchasedCourses: courseId });
    res.json({ enrolledUsersCount: users.length });
  } catch (error) {
    console.error('Error fetching enrolled users for course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a user
router.delete('/users/:userId', authenticateJwt('superuser'), async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Optionally, you can delete user's purchased courses or other related data.
      // Delete the user
      await User.findByIdAndDelete(userId);
      res.json({ message: "User has been deleted successfully" });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
export default router;
