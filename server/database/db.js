import mongoose from 'mongoose';

// Define mongoose schema
const superUserSchema = new  mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String },
  token : {type : String},
  role :{
    type: String,
    default :'superuser'
  }
})
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String },
  role : {  
    type : String,
    default :'admin'
  }
});

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  role : {  
    type : String,
    default :'user'
  },
});

const courseSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  imageLink: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  published: Boolean
});


// Define mongoose models
const SuperUser = mongoose.model('SuperUser',superUserSchema);
const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);
const Admin = mongoose.model('Admin', adminSchema);

export { User, Admin, Course,SuperUser };
