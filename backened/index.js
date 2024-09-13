import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import adminRouter from './routes/admin.js';
import userRouter from './routes/users.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

app.use('/admin', adminRouter);
app.use('/user', userRouter);


// mongoose connect
mongoose.connect('mongodb+srv://admin-Rishabh:test123@cluster0.jpn1sz9.mongodb.net/courses', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Admin routes
// User routes
app.listen(PORT, () => {
  console.log('Server is listening on port 3000');
});
  


