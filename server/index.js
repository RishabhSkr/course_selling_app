import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import adminRouter from './routes/admin.js';
import userRouter from './routes/users.js';
import superuserRouter from './routes/super.js'
import dotenv from 'dotenv';
import { DB_URI } from './config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

app.use('/admin', adminRouter);
app.use('/users/u', userRouter);
app.use('/superuser', superuserRouter);


// mongoose connect
mongoose.connect(DB_URI);

// Admin routes
// User routes
app.listen(PORT, () => {
  console.log('Server is listening on port 3000');
});
  


